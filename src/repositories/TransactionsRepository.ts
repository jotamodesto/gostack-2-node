import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

type TransactionDTO = Omit<Transaction, 'id'>;

function sumValue(accumulator: number, transaction: Transaction): number {
  return accumulator + transaction.value;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(sumValue, 0);
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(sumValue, 0);

    return { income, outcome, total: income - outcome };
  }

  public create(transactionData: TransactionDTO): Transaction {
    const transaction = new Transaction(transactionData);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
