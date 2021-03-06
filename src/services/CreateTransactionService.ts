import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request extends Pick<Transaction, 'type'> {
  title: string;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (request.type === 'outcome' && request.value > balance.total) {
      throw new Error('You do not have enough balance to perform this action');
    }

    const transaction = this.transactionsRepository.create(request);

    return transaction;
  }
}

export default CreateTransactionService;
