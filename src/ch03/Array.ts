class ArrayMinimum {
  private processor: MinimumProcessor;

  constructor(accumulator: number) {
    this.processor = new MinimumProcessor(accumulator);
  }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.processor.processElement(arr[i]);
    }
    return this.processor.getAccumulator();
  }
}

class ArraySum {
  private processor: SumProcessor;

  constructor(accumulator: number) {
    this.processor = new SumProcessor(accumulator);
  }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.processor.processElement(i);
    }
    return this.processor.getAccumulator();
  }
}

class MinimumProcessor {
  constructor(private accumulator: number) { }

  getAccumulator() {
    return this.accumulator;
  }

  processElement(e: number) {
    if (this.accumulator > e) {
      this.accumulator = e;
    }
  }
}

class SumProcessor {
  constructor(private accumulator: number) { }

  getAccumulator() {
    return this.accumulator;
  }

  processElement(e: number) {
    this.accumulator += e;
  }
}
