class BatchProcessor {
  constructor(private processor: ElementProcessor) { }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.processor.processElement(arr[i]);
    }
    return this.processor.getAccumulator();
  }
}

interface ElementProcessor {
  processElement(e: number): void
  getAccumulator(): number;
}

class ArraySum {
  private processor: ElementProcessor;

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

class MinimumProcessor implements ElementProcessor {
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

class SumProcessor implements ElementProcessor {
  constructor(private accumulator: number) { }

  getAccumulator() {
    return this.accumulator;
  }

  processElement(e: number) {
    this.accumulator += e;
  }
}
