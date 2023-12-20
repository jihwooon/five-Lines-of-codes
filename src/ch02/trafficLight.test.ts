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
  isRed(): boolean;
  isGreen(): boolean;
  isYellow(): boolean;
  updateCar(): boolean;
}

class Red implements TrafficLight {
  isRed(): boolean {
    return true;
  }

  isGreen(): boolean {
    return false;
  }

  isYellow(): boolean {
    return false;
  }

  updateCar(): boolean {
    return car.stop();
  }
}

class Green implements TrafficLight {
  isRed(): boolean {
    return false;
  }

  isGreen(): boolean {
    return true;
  }

  isYellow(): boolean {
    return false;
  }

  updateCar(): boolean {
    return car.drive();
  }
}

class Yellow implements TrafficLight {
  isRed(): boolean {
    return false;
  }

  isGreen(): boolean {
    return false;
  }

  isYellow(): boolean {
    return true;
  }

  updateCar(): boolean {
    return car.drive();
  }
}

const CYCLE = [new Red(), new Yellow(), new Green()];

const updateCar = (current: TrafficLight) => current.updateCar();

describe('trafficLight', () => {
  context('updateCarForLight에 RED가 주어지면', () => {
    it('false를 리턴해야 한다.', () => {
      expect(updateCar(CYCLE[0])).toBe(false);
    });
  });

  context('updateCarForLight에 YELLOW or GREEN가 주어지면', () => {
    it('true를 리턴해야 한다.', () => {
      expect(updateCar(CYCLE[1])).toBe(true);
      expect(updateCar(CYCLE[2])).toBe(true);
    });
  });
});
