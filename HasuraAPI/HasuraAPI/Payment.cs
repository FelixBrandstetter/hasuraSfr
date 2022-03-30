namespace HasuraAPI
{
    public class Payment
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public int Sender_Id { get; set; }
        public int Recipient_Id { get; set; }
        public string Status { get; set; }
    }
}
