// interface A {
// m1(): void;
// m2(): void;
// }

class B {
  m1() {
    return console.log('m1');
  }

  m2() {
    return this.m3();
  }

  m3() {
    return console.log('m3');
  }
}

const a = new B();
console.log(a.m1());
