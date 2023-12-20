import { TrafficLight, Red, Yellow, Green } from './TrafficLight.enum';

const CYCLE = [new Red(), new Green(), new Yellow()];
const updateCarForLight = (current: TrafficLight) => {
  return current.updateCar();
}

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
