import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface AccountSummary {
  transactions: Transaction[];
  balance: { income: number; outcome: number; total: number };
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): AccountSummary {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    if (balance.outcome > balance.total) {
      throw new Error('You do not have enough balance to perform this action');
    }

    return { transactions, balance };
  }
}

export default ListTransactionsService;
