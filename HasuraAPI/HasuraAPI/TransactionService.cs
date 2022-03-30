using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.SystemTextJson;

namespace HasuraAPI
{
    public class TransactionService : ITransactionService
    {
        private GraphQLHttpClient graphQlClient;
        private string paymentsSubscriptionQuery;
        private string updatePaymentStatusQuery;
        private string createTransactionQuery;

        public TransactionService()
        {
            graphQlClient = new GraphQLHttpClient(config =>
            {
                config.EndPoint = new Uri("https://sfrhasura.hasura.app/v1/graphql");
                config.WebSocketEndPoint = new Uri("wss://sfrhasura.hasura.app/v1/graphql");
                config.ConfigureWebsocketOptions = (x =>
                {
                    x.SetRequestHeader("x-hasura-admin-secret", "m46Gp8uPOJTGIEhtPGO0wipDaz12IJOMCLamPI3LXo95xZSvxUqEwRhHhIxbUM9T");
                });

            }, new SystemTextJsonSerializer());

            graphQlClient.HttpClient.DefaultRequestHeaders.Add("x-hasura-admin-secret", "m46Gp8uPOJTGIEhtPGO0wipDaz12IJOMCLamPI3LXo95xZSvxUqEwRhHhIxbUM9T");

            paymentsSubscriptionQuery = File.ReadAllText(@"Queries/PaymentSubscription.graphql");
            updatePaymentStatusQuery = File.ReadAllText(@"Queries/UpdatePaymentStatusMutation.graphql");
            createTransactionQuery = File.ReadAllText(@"Queries/CreateTransactionMutation.graphql");
        }

        public void SubscribeForPayments()
        {
            GraphQLRequest subscriptionRequest = new(this.paymentsSubscriptionQuery);
            var paymentSubscription = this.graphQlClient.CreateSubscriptionStream<PaymentsResult>(subscriptionRequest);
            paymentSubscription.Subscribe(async x => await this.OnNewPayment(x.Data.Payments));
        }

        private async Task OnNewPayment(List<Payment> payments)
        {
            var latestPayment = payments.FirstOrDefault();

            if (latestPayment == null || latestPayment.Status == "Done")
            {
                return;
            }

            GraphQLRequest updatePaymentRequest = new(this.updatePaymentStatusQuery);
            updatePaymentRequest.Variables = new { 
                paymentId = latestPayment.Id, 
                status = "Done" 
            };

            GraphQLRequest createTransactionRequest = new(this.createTransactionQuery);
            createTransactionRequest.Variables = new
            {
                amount = latestPayment.Amount,
                description = latestPayment.Description,
                sender_id = latestPayment.Sender_Id,
                recipient_id = latestPayment.Recipient_Id
            };

            await this.graphQlClient.SendMutationAsync<Payment>(updatePaymentRequest);
            await this.graphQlClient.SendMutationAsync<Transaction>(createTransactionRequest);
        }
    }
}
