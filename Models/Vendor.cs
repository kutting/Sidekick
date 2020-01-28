namespace Sidekick.Models
{
    public class Vendor
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string WebsiteURL { get; set; }
        public string Address { get; set; }     // Nulls are permitted for address fields
        public string Address2 { get; set; }
        public string City { get; set; }
        public long StateId { get; set; }
        public string ZipCode { get; set; }
    }
}
