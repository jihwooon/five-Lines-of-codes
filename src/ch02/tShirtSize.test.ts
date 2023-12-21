enum TShirtSizes {
  SMALL = 33, MEDIUM = 37, LARGE = 42,
}

const handleSelect = (tShirtSizes: TShirtSizes) => {
  if (tShirtSizes === TShirtSizes.SMALL) {
    return 33;
  } if (tShirtSizes === TShirtSizes.MEDIUM) {
    return 37;
  } if (tShirtSizes === TShirtSizes.LARGE) {
    return 42;
  }
};

describe('shirtSize', () => {
  context('셔츠 사이즈가 LARGE가 주어지면', () => {
    it('42 Size를 반환해야 한다.', () => {
      expect(handleSelect(TShirtSizes.LARGE)).toBe(42);
    });
  });

  context('셔츠 사이즈가 MEDIUM가 주어지면', () => {
    it('37 Size를 반환해야 한다.', () => {
      expect(handleSelect(TShirtSizes.MEDIUM)).toBe(37);
    });
  });

  context('셔츠 사이즈가 SMALL가 주어지면', () => {
    it('33 Size를 반환해야 한다.', () => {
      expect(handleSelect(TShirtSizes.SMALL)).toBe(33);
    });
  });
});
