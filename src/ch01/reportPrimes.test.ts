const isPrime = (num: number) => {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const reportPrimes = (n: number) => {
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) reportIfPrime(i);
  }
};

const reportIfPrime = (i: number) => console.log(`${i} is prime`);

console.log(reportPrimes(5)); // 결과값 : 2,3
