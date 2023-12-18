const sum = (arr: number[]) => {
  let answer = 0;

  for (let i = 0; i < arr.length; i++) {
    answer += arr[i];
  }
  return answer;
};

const size = (arr: number[]) => arr.length;

const average = (arr: number[]) => sum(arr) / size(arr);

describe('sum', () => {
  context('배열이 주어지면', () => {
    it('배열의 합을 리턴해야 한다.', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
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
  context('배열의 합과 인덱스 길이를 나누면', () => {
    it('평균 값을 리턴해야 한다.', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });
  });
});
