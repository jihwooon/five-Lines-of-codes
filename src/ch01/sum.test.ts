const calculate = (a: number, b: number) => {
  return a + b;
}

describe('sum', () => {
  context("두 수가 주어지면", () => {
    it('합한 값을 리턴해야 한다.', () => {
      expect(calculate(1, 2)).toBe(3);
      expect(calculate(-3, 5)).toBe(2);
    });
  });
});
