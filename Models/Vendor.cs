using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sidekick.Models
{
    public class Vendor
    {
        public long VendorId { get; set; }
        [Required]
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
        public long? StateCodeId { get; set; }
        [MaxLength(25)]
        public string ZipCode { get; set; }
        [MaxLength(250)]
        public string EmailAddress { get; set; }
        public bool IsDeleted { get; set; } = false;    // By default, new records are marked Not Deleted

        // Foreign Key to StateCode
        public StateCode StateCode { get; set; }


        // Foreign Key from Comic
        public ICollection<Comic> Comics { get; set; }
    }
}
