const isPrime = (num: number) => {
  if (num === 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const reportIfPrimes = (i: number) => (isPrime(i) ? undefined : `${i + 1} is prime`);

const reportPrimes = (n: number, i: number = 2, result: string = undefined): string => (
  i >= n ? result : reportPrimes(n, i + 1, reportIfPrimes(i))
);

describe('reportPrimes', () => {
  context('주어진 수가 소수이면', () => {
    it('소수인 수를 리턴 해야 한다.', () => {
      expect(reportPrimes(1)).toBe(undefined);
      expect(reportPrimes(2)).toBe(undefined);
      expect(reportPrimes(3)).toBe(undefined);
      expect(reportPrimes(4)).toBe(undefined);
      expect(reportPrimes(5)).toBe('5 is prime');
      expect(reportPrimes(6)).toBe(undefined);
      expect(reportPrimes(7)).toBe('7 is prime');
      expect(reportPrimes(8)).toBe(undefined);
      expect(reportPrimes(9)).toBe('9 is prime');
      expect(reportPrimes(11)).toBe('11 is prime');
      expect(reportPrimes(10)).toBe('10 is prime');
      expect(reportPrimes(12)).toBe(undefined);
      expect(reportPrimes(13)).toBe('13 is prime');
      expect(reportPrimes(14)).toBe(undefined);
    });
  });
});
