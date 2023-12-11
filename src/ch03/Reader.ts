class Reader {
  private data: string[];

  private current: number;

  readLine() {
    this.current++;
    return this.data[this.current] || null;
  }
}

const run = () => {
  const br = new Reader();
  let line: string | null;

  while ((line = br.readLine()) !== null) {
    return line;
  }
};
