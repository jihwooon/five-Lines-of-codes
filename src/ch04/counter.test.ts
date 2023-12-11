let counter = 0;

const incrementCounter = () => {
  counter++;
};

const main = () => {
  for (let i = 0; i < 20; i++) {
    incrementCounter();

    return counter;
  }
};

describe('main 함수가 실행되면', () => {
  it('counter 변수는 증가한다.', () => {
    expect(main()).toBe(1);
  });
});
