/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { createPortal } from 'react-dom';

type ModalInfo = {
  key: string;
  component: React.ComponentType<any>;
  props: Record<string, unknown>;
  resolve: (value: unknown) => void;
  reject: (reason: Error | string) => void;
};

export class ModalController {
  private modalInfos: Array<ModalInfo>;
  flush: React.Dispatch<React.SetStateAction<number>>;
  constructor(setFlag: React.Dispatch<React.SetStateAction<number>>) {
    this.modalInfos = [];
    this.flush = setFlag;
  }
  get top() {
    return this.modalInfos?.at(-1);
  }
  async push(
    key: string,
    component: React.ComponentType<any>,
    props: Record<string, unknown>,
  ) {
    return await new Promise((resolve, reject) => {
      this.modalInfos.push({
        key,
        component,
        props,
        resolve: (value) => this.handlePromise(key, resolve, value),
        reject: (reason) => this.handlePromise(key, reject, reason),
      });
      this.flush((prev) => prev + 1);
    });
  }
  handlePromise(
    key: string,
    resolver: (value: unknown) => void,
    value: unknown,
  ) {
    resolver(value); // resolve, reject 실행
    this.modalInfos = this.modalInfos.filter(({ key: _key }) => key !== _key); // view에서 모달 제거
    this.flush((prev) => prev + 1);
  }
  pop() {
    this.top?.reject('close');
    this.modalInfos.pop();
    this.flush((prev) => prev + 1);
  }
  clear() {
    while (this.top) {
      this.pop();
    }
  }
}

const Modal_ID = 'modal-dom';

export const ModalContainer = () => {
  const modal = useModal();
  const TopComponent = modal.top;

  React.useEffect(() => {
    if (document.getElementById(Modal_ID)) {
      return;
    }
    const modal = document.createElement('div');
    modal.id = Modal_ID;
    document.body.appendChild(modal);
  }, []);

  if (!TopComponent?.component) {
    return null;
  }

  return createPortal(
    <div>
      <TopComponent.component
        resolve={TopComponent.resolve}
        reject={TopComponent.reject}
        {...(TopComponent.props || {})}
      ></TopComponent.component>
    </div>,
    document.getElementById(Modal_ID)!,
  );
};

export const ModalContext = React.createContext<ModalController | null>(null);

export const ModalProvider = ({ children }: React.PropsWithChildren) => {
  const [, setFlag] = React.useState(1);
  const [modalController] = React.useState(() => new ModalController(setFlag));

  return (
    <ModalContext.Provider value={modalController}>
      {children}
      <ModalContainer></ModalContainer>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
