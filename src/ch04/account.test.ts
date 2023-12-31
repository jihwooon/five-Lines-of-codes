import db from '../database';

class Transfer {
  constructor(from: string, private amount: number) {
    this.depositHelper(from, -this.amount);
  }

  private depositHelper(to: string, amount: number) {
    const { id } = db.account.find((v) => v.owner === to);
    const accountId = db.account[id - 1];

    return accountId.amount + amount;
  }

  deposit(to: string) {
    return this.depositHelper(to, this.amount);
  }
}

describe('account', () => {
  context('보내는 사람과 받은 사람, 송금 금액을 입력하면', () => {
    it('보낸 사람 잔액과 받은 사람 잔액을 출력해야 한다.', () => {
      const account = new Transfer('김하준', 5000);

      expect(account.deposit('홍길동')).toBe(20000);
    });
  });
});
