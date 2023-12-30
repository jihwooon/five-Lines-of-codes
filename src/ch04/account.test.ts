import db from '../database';

class Account {
  private deposit(to: string, amount: number) {
    const { id } = db.account.find((v) => v.owner === to);
    const accountId = db.account[id - 1];

    return accountId.amount + amount;
  }

  transfer(from: string, to: string, amount: number) {
    const fromAccount = this.deposit(from, -amount);
    const toAccount = this.deposit(to, amount);

    return `${from}님 잔액은 ${fromAccount}이고 ${to}님 잔액은 ${toAccount} 입니다.`;
  }
}

describe('account', () => {
  context('보내는 사람과 받은 사람, 송금 금액을 입력하면', () => {
    it('보낸 사람 잔액과 받은 사람 잔액을 출력해야 한다.', () => {
      const account = new Account();

      expect(account.transfer('김하준', '홍길동', 5000)).toBe('김하준님 잔액은 5000이고 홍길동님 잔액은 20000 입니다.');
    });
  });
});
