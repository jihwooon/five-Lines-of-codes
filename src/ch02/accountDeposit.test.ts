import db from '../database';

const context = describe;

const deposit = (to: string, amount: number) => {
  const { id } = db.account.find((v) => v.owner === to);
  const accountId = db.account[id - 1];

  return accountId.amount + amount;
};

const transfer = (from: string, to: string, amount: number) => {
  const fromAccountId = db.account.find((v) => v.owner === from).id;
  const fromAccount = db.account[fromAccountId - 1].amount - amount;

  const toAccountId = db.account.find((v) => v.owner === to).id;
  const toAccount = db.account[toAccountId - 1].amount + amount;

  return `${from}님 잔액은 ${fromAccount}이고 ${to}님 잔액은 ${toAccount} 입니다.`;
};

describe('account', () => {
  context('보내는 사람과 입금 금액을 입력하면', () => {
    it('계좌 총합 금액을 반환해야 한다.', () => {
      expect(deposit('홍길동', 5000)).toBe(20000);
    });
  });

  context('보내는 사람과 받은 사람, 송금 금액을 입력하면', () => {
    it('보낸 사람 잔액과 받은 사람 잔액을 출력해야 한다.', () => {
      expect(transfer('김하준', '홍길동', 5000)).toBe('김하준님 잔액은 5000이고 홍길동님 잔액은 20000 입니다.');
    });
  });
});
