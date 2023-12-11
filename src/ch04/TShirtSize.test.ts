enum TShirtSize {
  SMALL,
  MEDIUM,
  LARGE,
}

const sizeToString = (s: TShirtSize) => {
  if (s === TShirtSize.SMALL) {
    return 'S';
  } if (s === TShirtSize.MEDIUM) {
    return 'M';
  }
  return 'L';
};

describe('TShirtSize', () => {
  context('TShirt가 SMALL 사이즈이면', () => {
    it('S를 리턴해야 한다.', () => {
      expect(sizeToString(TShirtSize.SMALL)).toBe('S');
    });
  });

  context('TShirt가 MEDIUM 사이즈이면', () => {
    it('M를 리턴해야 한다.', () => {
      expect(sizeToString(TShirtSize.MEDIUM)).toBe('M');
    });
  });

  context('TShirt가 LARGE 사이즈이면', () => {
    it('L를 리턴해야 한다.', () => {
      expect(sizeToString(TShirtSize.LARGE)).toBe('L');
    });
  });
});
