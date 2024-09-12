/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetStateAction } from 'react';
import React from 'react';

import { _get, _omit, _set } from './util';

type Text = string;
export type ValueType =
  | Text
  | boolean
  | Record<string, any>
  | undefined
  | null
  | ValueType[];

export type ItemPathType = [string, ...Text[]];
export type StoreValueType = {
  value?: ValueType;
  errors?: string[];
  defaultValue?: ValueType;
  setValue?: (value: ValueType) => void;
  setErrors?: (errors: string[]) => void;
  validate?: () => boolean;
  instance?: HTMLElement;
};

export interface FormServiceProps {
  onSubmit?: (values: Record<string, ValueType>) => void;
  initialValue?: Record<string, ValueType>;
}

export class FormService {
  store: Record<string, StoreValueType | Record<string, StoreValueType>>;
  private registeredItemPaths: ItemPathType[];
  private onSubmit: FormServiceProps['onSubmit'];
  private initialValue: FormServiceProps['initialValue'];
  private subscriptions: Record<string, any>;

  constructor({ onSubmit, initialValue = {} }: FormServiceProps) {
    this.store = {};
    this.onSubmit = onSubmit;
    this.registeredItemPaths = []; //사용하는 각 컴포넌트들
    this.subscriptions = {};
    this.initialValue = initialValue || {};
  }
  submit(e?: React.FormEvent) {
    e?.preventDefault();
    const { registeredItemPaths, onSubmit, getItemValue, validateForm } = this;
    this.resetErrors();
    const values = registeredItemPaths.reduce((acc, itemPath) => {
      _set(acc, itemPath.join('.'), getItemValue(itemPath));
      return acc;
    }, {});
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }
    onSubmit?.(values);
  }
  reset(e?: React.FormEvent) {
    e?.preventDefault();
    const { registeredItemPaths, setItemValue, getItemValue } = this;
    registeredItemPaths.forEach((itemPath) => {
      const current = getItemValue(itemPath);
      const initial = this.getItemInitialValue(itemPath);
      if (current !== initial) {
        setItemValue(itemPath, initial);
      }
    });
    this.resetErrors();
  }
  resetErrors = () => {
    const { registeredItemPaths } = this;
    registeredItemPaths.forEach((itemPath) => {
      const current = this.getItemErrors(itemPath);

      if (current.length > 0) {
        this.setItemError(itemPath, []);
      }
    });
  };
  validateForm() {
    const { store, registeredItemPaths } = this;
    let isValid = true;
    registeredItemPaths.forEach((itemPath) => {
      const current = this.getItemValue(itemPath);
      const validateItem = _get(
        store,
        [...itemPath, 'current', 'validate'].join(''),
      );
      const result = validateItem(current);
      if (!result && isValid) {
        isValid = false;
      }
    });
    return isValid;
  }
  getItemValue(itemPath: ItemPathType) {
    const { store } = this;
    return _get(store, [...itemPath, 'current', 'value'].join('.'));
  }
  setItemValue(itemPath: ItemPathType, value: ValueType) {
    const { store } = this;

    const setValue = _get(
      store,
      [...itemPath, 'current', 'setValue'].join('.'),
    );
    setValue(value);
  }
  getItemErrors = (itemPath: ItemPathType) => {
    const { store } = this;

    return _get(store, [...itemPath, 'current', 'errors'].join('.'));
  };

  setItemError = (itemPath: ItemPathType, errors: string[]) => {
    const { store } = this;
    const setErrors = _get(
      store,
      [...itemPath, 'current', 'setErrors'].join('.'),
    );
    setErrors(errors);
  };
  getItemInitialValue = (name: string | ItemPathType) => {
    const { store, initialValue } = this;

    const itemPath = typeof name === 'string' ? [name] : name;
    const defaultValue = _get(
      store,
      [...itemPath, 'current', 'defaultValue'].join('.'),
    );

    return _get(initialValue || {}, itemPath.join('.')) || defaultValue;
  };

  subscribe = (
    name: string | ItemPathType,
    func: SetStateAction<ValueType>,
  ) => {
    const { subscriptions } = this;

    const itemPath = typeof name === 'string' ? [name] : name;

    const current = _get(subscriptions, itemPath.join('.')) || [];
    _set(subscriptions, itemPath.join('.'), [...current, func]);
  };

  observe = (name: string | ItemPathType, value: ValueType) => {
    const itemPath = typeof name === 'string' ? [name] : name;

    const subscriptions = _get(this.subscriptions, itemPath.join('.')) || [];
    subscriptions.forEach((action: SetStateAction<any>) => action(value));
  };

  createOrGetItemRef = (name: string | ItemPathType) => {
    const { store, registeredItemPaths } = this;
    const itemPath = typeof name === 'string' ? [name] : name;

    const savedRef = _get(store, itemPath.join('.'));
    if (savedRef) {
      return savedRef;
    }

    registeredItemPaths.push(typeof name === 'string' ? [name] : name);
    const newRef = React.createRef<StoreValueType>();
    _set(store, itemPath.join('.'), newRef);

    return newRef;
  };

  removeItemRef = (name: string | ItemPathType) => {
    const itemPath = typeof name === 'string' ? [name] : name;

    this.registeredItemPaths = this.registeredItemPaths.filter(
      (itemPath) =>
        itemPath.join() !== (typeof name === 'string' ? name : name.join()),
    );
    _omit(this.store, itemPath);
  };
}
