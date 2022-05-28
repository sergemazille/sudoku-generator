import { describe, expect, it } from 'vitest';

import { GridViewFactory } from './GridViewFactory';

describe('GridViewFactory', () => {
  it('creates a well formed GridViewFactory', () => {
    const dataGrid = [
      [
        [
          [1, 2],
          [3, 4],
        ],
        [
          [3, 4],
          [1, 2],
        ],
      ],
      [
        [
          [2, 1],
          [4, 3],
        ],
        [
          [4, 3],
          [2, 1],
        ],
      ],
    ];

    const factory = new GridViewFactory();
    const actual = factory.create(dataGrid);
    const expected = [
      [
        [
          [
            {
              correctValue: 1,
              isHidden: false,
              color: 'black',
              referenceValue: 1,
            },
            {
              correctValue: 2,
              isHidden: false,
              color: 'black',
              referenceValue: 2,
            },
          ],
          [
            {
              correctValue: 3,
              isHidden: false,
              color: 'black',
              referenceValue: 3,
            },
            {
              correctValue: 4,
              isHidden: false,
              color: 'black',
              referenceValue: 4,
            },
          ],
        ],
        [
          [
            {
              correctValue: 3,
              isHidden: false,
              color: 'black',
              referenceValue: 3,
            },
            {
              correctValue: 4,
              isHidden: false,
              color: 'black',
              referenceValue: 4,
            },
          ],
          [
            {
              correctValue: 1,
              isHidden: false,
              color: 'black',
              referenceValue: 1,
            },
            {
              correctValue: 2,
              isHidden: false,
              color: 'black',
              referenceValue: 2,
            },
          ],
        ],
      ],
      [
        [
          [
            {
              correctValue: 2,
              isHidden: false,
              color: 'black',
              referenceValue: 2,
            },
            {
              correctValue: 1,
              isHidden: false,
              color: 'black',
              referenceValue: 1,
            },
          ],
          [
            {
              correctValue: 4,
              isHidden: false,
              color: 'black',
              referenceValue: 4,
            },
            {
              correctValue: 3,
              isHidden: false,
              color: 'black',
              referenceValue: 3,
            },
          ],
        ],
        [
          [
            {
              correctValue: 4,
              isHidden: false,
              color: 'black',
              referenceValue: 4,
            },
            {
              correctValue: 3,
              isHidden: false,
              color: 'black',
              referenceValue: 3,
            },
          ],
          [
            {
              correctValue: 2,
              isHidden: false,
              color: 'black',
              referenceValue: 2,
            },
            {
              correctValue: 1,
              isHidden: false,
              color: 'black',
              referenceValue: 1,
            },
          ],
        ],
      ],
    ];
    expect(actual).toEqual(expected);
  });
});
