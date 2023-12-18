const min = (result: number, arr: number[][], x: number, y: number) => {
  let answer = result;
  if (answer > arr[x][y]) {
    answer = arr[x][y];
  }

  return answer;
};

const secondLoop = (arr: number[][], x: number, result: number) => {
  let answer = result;
  for (let y = 0; y < arr[x].length; y++) {
    answer = min(answer, arr, x, y);
  }

  return answer;
};

const firstLoop = (arr: number[][]) => {
  let result = Number.POSITIVE_INFINITY;
  for (let x = 0; x < arr.length; x++) {
    result = secondLoop(arr, x, result);
  }

  return result;
};

const minimum = (arr: number[][]) => firstLoop(arr);

describe('minimum', () => {
  context('2차원 배열이 주어지면', () => {
    it('최소 항목 값을 리턴해야 한다.', () => {
      expect(minimum([[1, 2, 4], [1, 2, 3]])).toBe(1);
      expect(minimum([[10, 5, 3], [2, 3, 2]])).toBe(2);
      expect(minimum([[20, 3, 7], [50, 9, 5]])).toBe(3);
    });
  });
});
