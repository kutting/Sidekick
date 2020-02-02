namespace Sidekick.Queries
{
	public class SearchComics
	{
		public string SearchTitle { get; set; }
		public string SearchIssue { get; set; }
		public string SearchConditionCode { get; set; }
		public string SearchVendor { get; set; }
		public decimal? SearchEstimatedValueMin { get; set; }
		public decimal? SearchEstimatedValueMax { get; set; }
	}
}
