export enum RawTrafficLight {
  RED,
  YELLOW,
  GREEN
}

class Car {
  stop(): boolean {
    return false;
  }

  drive(): boolean {
    return true;
  }
}

interface TrafficLight {
  isRed(): boolean;
  isYellow(): boolean;
  isGreen(): boolean;
  updateCar(): boolean;
}

class Red implements TrafficLight {
  isRed() { return true; }
  isYellow() { return false; }
  isGreen() { return false; }
  updateCar() { return car.stop(); }
}

class Yellow implements TrafficLight {
  isRed() { return false; }
  isYellow() { return true; }
  isGreen() { return false; }
  updateCar() { return car.drive(); }
}

class Green implements TrafficLight {
  isRed() { return false; }
  isYellow() { return false; }
  isGreen() { return true; }
  updateCar() { return car.drive(); }
}

const car = new Car();
const CYCLE = [new Red(), new Green(), new Yellow()];
const updateCar = (car: TrafficLight) => car.updateCar();

describe('trafficLight', () => {
  context('updateCar() 에 Red 가 주어지면', () => {
    it('false를 리턴해야 한다.', () => {
      expect(updateCar(new Red())).toBe(false);
    });
  });

  context('updateCar() 에 Yellow or Green 이 주어지면', () => {
    it('true를 리턴해야 한다.', () => {
      expect(updateCar(new Green())).toBe(true);
      expect(updateCar(new Yellow())).toBe(true);
    });
  });
});
