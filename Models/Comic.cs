using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sidekick.Models
{
	public class Comic
	{
        public long ComicId { get; set; }
        public string Title { get; set; }
        public string IssueNumber { get; set; }
        public string Description { get; set; }
        public DateTime PurchaseDate { get; set; }     // Nulls are permitted for address fields
        public long VendorId { get; set; }
        public long MarvelId { get; set; }
        public DateTime MarvelLastViewed { get; set; }
        public long ComicVineId { get; set; }
        public DateTime ComicVineLastViewed { get; set; }
        public decimal EstimatedValue { get; set; }
        public long ConditionCodeId { get; set; }

        // Foreign Keys to Vendor, ConditionCode
        public Vendor Vendor { get; set; }
        public ConditionCode ConditionCode { get; set; }
    }
}
