using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sidekick.Models;
using Sidekick.Queries;

namespace Sidekick.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ComicsController : ControllerBase
	{
		private readonly SidekickContext _context;

		public ComicsController(SidekickContext context)
		{
			_context = context;
		}

		// GET: api/Comics
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Comic>>> GetComics()
		{
			return await _context.Comics.ToListAsync();
		}

		// Search vendors
		// This method includes the vendor's statecode object in the delivered data
		// See: https://stackoverflow.com/questions/3404975/left-outer-join-in-linq for more readable approach to doing outer joins
		// GET: api/Vendors/withObjects?{query}
		[HttpGet("withObjects")]
		public async Task<ActionResult<IEnumerable<Comic>>> GetComicsWithObjects([FromQuery] SearchComics query)
		{
			// Left outer join Comics and StateCode
			// Left outer join Comics to Vendor and ConditionCode
			var comics = from c in _context.Comics
						 from v in _context.Vendors.Where(vendor => c.VendorId == vendor.VendorId).DefaultIfEmpty()
						 from conditionCode in _context.ConditionCodes.Where(cc => c.ConditionCodeId == cc.ConditionCodeId).DefaultIfEmpty()
						 select new Comic() { ComicId = c.ComicId, Title = c.Title, IssueNumber = c.IssueNumber, Description = c.Description, PurchaseDate = c.PurchaseDate, VendorId = c.VendorId, MarvelId = c.MarvelId, MarvelLastViewed = c.MarvelLastViewed, ComicVineId = c.ComicVineId, ComicVineLastViewed = c.ComicVineLastViewed, EstimatedValue = c.EstimatedValue, ConditionCodeId = c.ConditionCodeId, Vendor = v, ConditionCode = conditionCode }
						;

			// Apply filters, if any
			if (query != null)
			{
				// TODO: figure out better way of pulling back values from dropdown set to "None"
				if (query.SearchConditionCode == "null")
					query.SearchConditionCode = null;

				comics = from comic in comics
						 where
							(string.IsNullOrEmpty(query.SearchTitle) || EF.Functions.Like(comic.Title, "%" + query.SearchTitle + "%"))
							&& (string.IsNullOrEmpty(query.SearchIssue) || EF.Functions.Like(comic.IssueNumber, "%" + query.SearchIssue + "%"))
							&& (string.IsNullOrEmpty(query.SearchConditionCode) || (comic.ConditionCode != null && EF.Functions.Like(comic.ConditionCode.Name, "%" + query.SearchConditionCode + "%")))
							&& (string.IsNullOrEmpty(query.SearchVendor) || (comic.Vendor != null && EF.Functions.Like(comic.Vendor.Name, "%" + query.SearchVendor + "%")))
							&& (!query.SearchEstimatedValueMin.HasValue || (comic.EstimatedValue.HasValue && comic.EstimatedValue >= query.SearchEstimatedValueMin))
							&& (!query.SearchEstimatedValueMax.HasValue || (comic.EstimatedValue.HasValue && comic.EstimatedValue <= query.SearchEstimatedValueMax))
						 select comic;
			}

			// return result
			var result = comics.AsNoTracking().ToListAsync();
			return await result;
		}

		// GET: api/Comics/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Comic>> GetComic(long id)
		{
			var comic = await _context.Comics.FindAsync(id);

			if (comic == null)
			{
				return NotFound();
			}

			return comic;
		}

		// PUT: api/Comics/5
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPut("{id}")]
		public async Task<IActionResult> PutComic(long id, Comic comic)
		{
			if (id != comic.ComicId)
			{
				return BadRequest();
			}

			_context.Entry(comic).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ComicExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Comics
		// To protect from overposting attacks, please enable the specific properties you want to bind to, for
		// more details see https://aka.ms/RazorPagesCRUD.
		[HttpPost]
		public async Task<ActionResult<Comic>> PostComic(Comic comic)
		{
			_context.Comics.Add(comic);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetComic", new { id = comic.ComicId }, comic);
		}

		// DELETE: api/Comics/5
		[HttpDelete("{id}")]
		public async Task<ActionResult<Comic>> DeleteComic(long id)
		{
			var comic = await _context.Comics.FindAsync(id);
			if (comic == null)
			{
				return NotFound();
			}

			_context.Comics.Remove(comic);
			await _context.SaveChangesAsync();

			return comic;
		}

		private bool ComicExists(long id)
		{
			return _context.Comics.Any(e => e.ComicId == id);
		}
	}
}
