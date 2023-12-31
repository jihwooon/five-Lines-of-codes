interface TShirtSizes {
  handleSelect(): number;
}

class Small {
  handleSelect() {
    return 33;
  }
}

class Medium {
  handleSelect() {
    return 37;
  }
}

class Large {
  handleSelect() {
    return 42;
  }
}

const handleSelect = (tShirtSizes: TShirtSizes) => tShirtSizes.handleSelect();

describe('shirtSize', () => {
  context('셔츠 사이즈가 LARGE가 주어지면', () => {
    it('42 Size를 반환해야 한다.', () => {
      expect(handleSelect(new Large())).toBe(42);
    });
  });

  context('셔츠 사이즈가 MEDIUM가 주어지면', () => {
    it('37 Size를 반환해야 한다.', () => {
      expect(handleSelect(new Medium())).toBe(37);
    });
  });

  context('셔츠 사이즈가 SMALL가 주어지면', () => {
    it('33 Size를 반환해야 한다.', () => {
      expect(handleSelect(new Small())).toBe(33);
    });
  });
});
