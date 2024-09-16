import { expect, test } from 'vitest';

import { getInteractiveMap } from './getInteractiveMap';

test('oneside map convert to new interactiveMap"', () => {
  expect(
    getInteractiveMap(
      new Map([
        ['1', 'one'],
        ['2', 'two'],
        ['3', 'three'],
      ]),
    ),
  ).toEqual(
    new Map([
      ['1', 'one'],
      ['2', 'two'],
      ['3', 'three'],
      ['one', '1'],
      ['two', '2'],
      ['three', '3'],
    ]),
  );
});
