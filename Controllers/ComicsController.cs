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
        // GET: api/Vendors/withObjects?{query}
        [HttpGet("withObjects")]
        public async Task<ActionResult<IEnumerable<Comic>>> GetComicsWithStates([FromQuery] SearchComics query)
        {
            /*
            // Left outer join Vendors and StateCode
            var vendors = from v in _context.Vendors
                          join sc in _context.StateCode on v.StateCodeId equals sc.StateCodeId into ab
                          from sc in ab.DefaultIfEmpty()
                          select new Vendor() { VendorId = v.VendorId, Name = v.Name, Address = v.Address, Address2 = v.Address2, City = v.City, StateCodeId = v.StateCodeId, ZipCode = v.ZipCode, EmailAddress = v.EmailAddress, PhoneNumber = v.PhoneNumber, WebsiteURL = v.WebsiteURL, StateCode = sc };
            // Apply filters, if any
            if (query != null)
            {
                vendors = from vendor in vendors
                          where
                            (string.IsNullOrEmpty(query.SearchName) || EF.Functions.Like(vendor.Name, "%" + query.SearchName + "%"))
                            && (string.IsNullOrEmpty(query.SearchCity) || EF.Functions.Like(vendor.City, "%" + query.SearchCity + "%"))
                            && (string.IsNullOrEmpty(query.SearchState) || (vendor.StateCode != null && EF.Functions.Like(vendor.StateCode.Name, "%" + query.SearchState + "%")))
                            && (string.IsNullOrEmpty(query.SearchPhone) || EF.Functions.Like(vendor.PhoneNumber, "%" + query.SearchPhone + "%"))
                          select vendor;
            }

            // return result
            var result = vendors.AsNoTracking().ToListAsync();
            return await result;
            */
            return await _context.Comics.ToListAsync();
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
