class Counter {
  private counter: number = 0;

  getCount() {
    return this.counter;
  }

  setCount(counter: number) {
    this.counter = counter;
  }
}

const counter = new Counter();

const incrementCounter = (counter: Counter) => {
  counter.setCount(counter.getCount() + 1);
};

const main = () => {
  for (let i = 0; i < 20; i++) {
    incrementCounter(counter);

    return counter.getCount();
  }
};

describe('main 함수가 실행되면', () => {
  it('counter 변수는 증가한다.', () => {
    expect(main()).toBe(1);
  });
});
