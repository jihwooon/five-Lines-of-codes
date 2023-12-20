interface TrafficLight {
  isRed(): boolean;
  isGreen(): boolean;
  isYellow(): boolean;
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
}

class Car {
  stop(): boolean {
    return false;
  }

  drive(): boolean {
    return true;
  }
}

const CYCLE = [new Red(), new Yellow(), new Green()];

const updateCarForLight = (trafficLight: TrafficLight) => {
  const car = new Car();

  if (trafficLight.isRed()) {
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
