class Car1 {
  stop(): boolean {
    return false;
  }

  drive(): boolean {
    return true;
  }
}

interface TrafficColor {
  color(): string;
  check(car: Car1): boolean;
}

class Red1 implements TrafficColor {
  color(): string {
    return 'red';
  }

  check(car: Car1): boolean {
    return car.stop();
  }
}

class Yellow1 implements TrafficColor {
  color(): string {
    return 'yellow';
  }

  check(car: Car1): boolean {
    return car.stop();
  }
}

class Green1 implements TrafficColor {
  color(): string {
    return 'green';
  }

  check(car: Car1): boolean {
    return car.drive();
  }
}

const nextColor = (t: TrafficColor) => {
  if (t.color() === 'red') {
    return new Green1();
  }

  if (t.color() === 'yellow') {
    return new Red1();
  }

  if (t.color() === 'green') {
    return new Yellow1();
  }
};

describe('nextColor', () => {
  context('nextColor에 red가 주어지면', () => {
    it('Green1 객체를 리턴해야 한다.', () => {
      expect(nextColor(new Red1())).toEqual(new Green1());
    });
  });

  context('nextColor에 yellow가 주어지면', () => {
    it('Red1 객체를 리턴해야 한다.', () => {
      expect(nextColor(new Yellow1())).toEqual(new Red1());
    });
  });

  context('nextColor에 green가 주어지면', () => {
    it('Yellow1 객체를 리턴해야 한다.', () => {
      expect(nextColor(new Green1())).toEqual(new Yellow1());
    });
  });
});
