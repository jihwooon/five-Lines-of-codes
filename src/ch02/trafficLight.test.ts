class Car {
  stop(): boolean {
    return false;
  }

  drive(): boolean {
    return true;
  }
}

const car = new Car();
interface TrafficLight {
  updateCar(): boolean;
}

class Red {
  updateCar(): boolean {
    return car.stop();
  }
}

class Green {
  updateCar(): boolean {
    return car.drive();
  }
}

class Yellow {
  updateCar(): boolean {
    return car.drive();
  }
}

const updateCar = (current: TrafficLight) => current.updateCar();

describe('trafficLight', () => {
  context('updateCarForLight에 RED가 주어지면', () => {
    it('false를 리턴해야 한다.', () => {
      expect(updateCar(new Red())).toBe(false);
    });
  });

  context('updateCarForLight에 YELLOW or GREEN가 주어지면', () => {
    it('true를 리턴해야 한다.', () => {
      expect(updateCar(new Yellow())).toBe(true);
      expect(updateCar(new Green())).toBe(true);
    });
  });
});
