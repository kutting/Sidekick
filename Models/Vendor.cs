using System.ComponentModel.DataAnnotations;

namespace Sidekick.Models
{
    public class Vendor
    {
        public long Id { get; set; }
        [MaxLength(500)]
        public string Name { get; set; }
        [MaxLength(50)]
        public string PhoneNumber { get; set; }
        [MaxLength(5000)]
        public string WebsiteURL { get; set; }
        [MaxLength(250)]
        public string Address { get; set; }     // Nulls are permitted for address fields
        [MaxLength(250)]
        public string Address2 { get; set; }
        [MaxLength(250)]
        public string City { get; set; }
        public long StateId { get; set; }
        [MaxLength(25)]
        public string ZipCode { get; set; }
        [MaxLength(250)]
        public string EmailAddress { get; set; }
    }
}
