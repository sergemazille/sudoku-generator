export class ArrayHelper {
  static getValuesFromIndices<T>(indices: number[], array: T[]) {
    return array.filter((_, index) => {
      return indices.includes(index);
    });
  }

  static pickRandomIndex<T>(array: T[]) {
    return Math.floor(Math.random() * array.length);
  }

  static pickMultipleRandomValues<T>(numberOfValuesToPick: number, array: T[]) {
    const valuesToKeep: T[] = [];
    const pickArray = [...array];

    for (let i = 0; i < numberOfValuesToPick; i++) {
      const index = this.pickRandomIndex(pickArray);
      const valueToPick = pickArray.splice(index, 1)[0];
      valuesToKeep.push(valueToPick);
    }

    return valuesToKeep as T[];
  }

  static mergeArrays<T extends unknown[]>(arrays: T[]) {
    const startingValue: unknown[] = [];

    return arrays.reduce((acc, current) => {
      return [...acc, ...current];
    }, startingValue);
  }

  static shuffleArray<T>(array: T[]) {
    const { length } = array;
    const availableItems = [...array];
    const shuffled: T[] = [];

    for (let i = 0; i < length; i++) {
      const index = ArrayHelper.pickRandomIndex(availableItems);
      const pickedItem = availableItems.splice(index, 1)[0];

      shuffled.push(pickedItem);
    }

    return shuffled;
  }

  static createArrayOfIndices(length: number) {
    return Array.from({ length }).map((_, index) => {
      return index;
    });
  }

  // ex. return [1, 2, 3] when length is 3
  static createDigitsArray(length: number) {
    return ArrayHelper.createArrayOfIndices(length).map((index) => index + 1);
  }
}
