export class ArrayHelper {
  static pickRandomIndex<T>(array: T[]) {
    return Math.floor(Math.random() * array.length);
  }

  static mergeArrays<T extends []>(arrays: T[]) {
    return arrays.reduce((acc, current) => {
      return [...acc, ...current];
    }, [] as T[]);
  }

  static shuffleArray<T>(array: T[]) {
    const { length } = array;
    const availableItems = [...array];
    const randomizedArrayItems: T[] = [];

    for (let i = 0; i < length; i++) {
      const index = ArrayHelper.pickRandomIndex(availableItems);
      const pickedItem = availableItems.splice(index, 1)[0];

      randomizedArrayItems.push(pickedItem);
    }

    return randomizedArrayItems;
  }

  static invertLinesAndCols<T extends U[], U>(arrays: T[]) {
    const { length } = arrays;

    arrays.forEach((subArray) => {
      if (subArray.length !== length) {
        throw new Error("sub-arrays' lengths must be the same as array's length");
      }
    });

    const result: Partial<U[]>[] = [];

    arrays.forEach((subArray: T) => {
      subArray.forEach((item: U, index: number) => {
        if (!Array.isArray(result[index])) {
          result[index] = [item];
        } else {
          result[index].push(item);
        }
      });
    });

    return result;
  }

  // ex. return [1, 2, 3] when length is 3
  static createDigitsArray(length: number) {
    return Array.from({ length }).map((_item, index) => {
      return index + 1;
    })
  }

  static formatToBlock<T>(array: T[]) {
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
