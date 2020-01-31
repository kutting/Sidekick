using System;
using System.ComponentModel.DataAnnotations;

namespace Sidekick.Models
{
	public class Comic
	{
        public long ComicId { get; set; }
        [Required]
        [MaxLength(500)]
        public string Title { get; set; }
        [MaxLength(50)]
        public string IssueNumber { get; set; }
        public string Description { get; set; }
        public DateTime? PurchaseDate { get; set; }     // Nulls are permitted for address fields
        public long? VendorId { get; set; }
        public long? MarvelId { get; set; }
        public DateTime? MarvelLastViewed { get; set; }
        public long? ComicVineId { get; set; }
        public DateTime? ComicVineLastViewed { get; set; }
        public decimal? EstimatedValue { get; set; }
        public long? ConditionCodeId { get; set; }

        // Foreign Keys to Vendor, ConditionCode
        public Vendor? Vendor { get; set; }
        public ConditionCode? ConditionCode { get; set; }
    }
}
