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
  constructor(private col: string) { }

  color(): string {
    return this.col;
  }

  check(car: Car1): boolean {
    if (this.color() === 'red') {
      return car.stop();
    } if (this.color() === 'yellow') {
      return car.stop();
    } if (this.color() === 'green') {
      return car.drive();
    }
  }
}

const nextColor = (t: TrafficColor) => {
  if (t.color() === 'red') {
    return new Red1('green');
  }

  if (t.color() === 'yellow') {
    return new Red1('red');
  }

  if (t.color() === 'green') {
    return new Red1('yellow');
  }
};

describe('nextColor', () => {
  context('nextColor에 red가 주어지면', () => {
    it('Red1 객체의 green를 리턴해야 한다.', () => {
      expect(nextColor(new Red1('red'))).toEqual(new Red1('green'));
    });
  });

  context('nextColor에 yellow가 주어지면', () => {
    it('Red1 객체의 red를 리턴해야 한다.', () => {
      expect(nextColor(new Red1('yellow'))).toEqual(new Red1('red'));
    });
  });

  context('nextColor에 green가 주어지면', () => {
    it('Red1 객체의 yellow를 리턴해야 한다.', () => {
      expect(nextColor(new Red1('green'))).toEqual(new Red1('yellow'));
    });
  });
});
