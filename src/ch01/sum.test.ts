const total = (num: number, num1: number) => num + num1;

describe('total', () => {
  it('두 수의 합의 전체 수를 리턴해야 한다.', () => {
    expect(total(1, 2)).toBe(3);
    expect(total(2, 1)).toBe(3);
    expect(total(3, 0)).toBe(3);
    expect(total(4, -1)).toBe(3);
  });
});
