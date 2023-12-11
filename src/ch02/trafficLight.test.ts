import { TrafficLight } from './TrafficLight.enum';

class Car {
  stop(): boolean {
    return false;
  }

  drive(): boolean {
    return true;
  }
}

const CYCLE = [TrafficLight.RED, TrafficLight.YELLOW, TrafficLight.GREEN];

const updateCarForLight = (current: TrafficLight) => {
  const car = new Car();

  if (current === TrafficLight.RED) {
    return car.stop();
  }
  return car.drive();
};

describe('trafficLight', () => {
  context('updateCarForLight에 RED가 주어지면', () => {
    it('false를 리턴해야 한다.', () => {
      expect(updateCarForLight(CYCLE[0])).toBe(false);
    });
  });

  context('updateCarForLight에 YELLOW or GREEN가 주어지면', () => {
    it('true를 리턴해야 한다.', () => {
      expect(updateCarForLight(CYCLE[1])).toBe(true);
      expect(updateCarForLight(CYCLE[2])).toBe(true);
    });
  });
});
