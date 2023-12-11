class ArrayMinimum {
  constructor(private accumulator: number) { }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      if (this.accumulator > arr[i]) {
        this.accumulator = arr[i];
      }
      return this.accumulator;
    }
  }
}

class ArraySum {
  constructor(private accumulator: number) { }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.accumulator += arr[i];
    }
    return this.accumulator;
  }
}
