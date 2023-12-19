const sumRecursive = (arr: number[], i: number = 0): number => (
  (i === arr.length) ? 0 : arr[i] + sumRecursive(arr, i + 1)
);

const size = (arr: number[]) => arr.length;

const average = (arr: number[]) => sumRecursive(arr) / size(arr);

describe('sum', () => {
  context('배열이 주어지면', () => {
    it('배열의 합을 리턴해야 한다.', () => {
      expect(sumRecursive([1, 2, 3, 4, 5])).toBe(15);
    });
  });
});

describe('size', () => {
  context('배열이 주어지면', () => {
    it('배열의 길이를 리턴해야 한다.', () => {
      expect(size([1, 2, 3, 4, 5])).toBe(5);
    });
  });
});

describe('average', () => {
  context('배열이 주어지면', () => {
    it('평균 값을 리턴해야 한다.', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });
  });
});
