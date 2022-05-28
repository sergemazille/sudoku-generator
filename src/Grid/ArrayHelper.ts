import { AnyArray } from './constants';

export class ArrayHelper {
  static pickRandomIndex = (array: AnyArray) => {
    return Math.floor(Math.random() * array.length);
  };

  static mergeArrays(arrays: AnyArray[]) {
    return arrays.reduce((acc, current) => {
      return [...acc, ...current];
    }, []);
  }

  static shuffleArray(array: AnyArray) {
    const { length } = array;
    const availableItems = [...array];
    const randomizedArrayItems: AnyArray = [];

    for (let i = 0; i < length; i++) {
      const index = ArrayHelper.pickRandomIndex(availableItems);
      const pickedItem = availableItems.splice(index, 1)[0];

      randomizedArrayItems.push(pickedItem);
    }

    return randomizedArrayItems;
  }

  static invertLinesAndCols(array: AnyArray) {
    array.forEach(subArray => {
      if (subArray.length !== array.length) {
        throw new Error("sub-arrays' lengths must be the same as array's length");
      }
    });

    const result: AnyArray = [];

    array.forEach((section: AnyArray) => {
      section.forEach((item: unknown, index: number) => {
        if (!Array.isArray(result[index])) {
          result[index] = [];
        }

        result[index].push(item);
      });
    });

    return result;
  }

  // ex. return [1, 2, 3] when length is 3
  static createDigitsArray(length: number) {
    return new Array(length).fill('').map((_item, index) => {
      return index + 1;
    });
  }

  static formatToBlock(array: AnyArray) {
    const { length } = array;
    const setCount = Math.sqrt(length);
    const block = [];

    for (let i = 0; i < setCount; i++) {
      const startIndex = i * setCount;
      const endIndexExcluded = startIndex + setCount;

      block.push(array.slice(startIndex, endIndexExcluded));
    }

    return block;
  }
}
