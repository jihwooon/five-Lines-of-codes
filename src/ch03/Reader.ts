class Cacher<T> {
  private data: T;

  constructor(private mutator: () => T) {
    this.data = this.mutator();
  }

  get() {
    return this.data;
  }

  next() {
    this.data = this.mutator();
  }
}

class Reader {
  private data: string[];

  private current: number;

  nextLine() {
    this.current++;
  }

  readLine() {
    return this.data[this.current] || null;
  }
}

const run = () => {
  const tmpBr = new Reader();
  const br = new Cacher(() => tmpBr.readLine());
  for (;br.get() !== null; br.next()) {
    const line = br.get();
    console.log(line);
  }
};

run();
