export type ElementType<Type extends readonly unknown[]> = Type[number];
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ObjectKeys<T extends Record<PropertyKey, unknown>> =
  `${Exclude<keyof T, symbol>}`;

export function objectKeys<Type extends Record<PropertyKey, unknown>>(
  obj: Type,
): Array<ObjectKeys<Type>> {
  return Object.keys(obj) as Array<ObjectKeys<Type>>;
}

export const _get = <T = any>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T,
): T => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc),
        obj,
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return (result === undefined || result === obj ? defaultValue : result) as T;
};

export const _set = (obj: Record<string, any>, path: string, value: any) => {
  const pathArray = path.match(/([^[.\]])+/g);

  pathArray?.reduce((acc, key, i) => {
    if (acc[key] == null) {
      acc[key] = {};
    }
    if (i === pathArray.length - 1) {
      acc[key] = value;
    }
    return acc[key];
  }, obj);

  return obj;
};

/** @tossdocs-ignore */

export function _omit<
  ObjectType extends Record<PropertyKey, any>,
  KeyTypes extends Array<ObjectKeys<ObjectType>>,
>(obj: ObjectType, keys: KeyTypes) {
  return objectKeys(obj)
    .filter(
      (k): k is Exclude<ObjectKeys<ObjectType>, ElementType<KeyTypes>> =>
        !keys.includes(k),
    )
    .reduce(
      (acc, key) => ((acc[key] = obj[key]), acc),
      {} as Omit<ObjectType, ElementType<KeyTypes>>,
    );
}
