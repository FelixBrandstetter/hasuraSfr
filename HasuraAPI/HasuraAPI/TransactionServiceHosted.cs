namespace HasuraAPI
{
    public class TransactionServiceHosted : IHostedService
    {
        private readonly ITransactionService _transactionService;

        public TransactionServiceHosted(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _transactionService.SubscribeForPayments();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
