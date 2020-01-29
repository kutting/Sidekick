using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Sidekick.Models;
using Sidekick.Queries;

namespace Sidekick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly SidekickContext _context;

        public VendorsController(SidekickContext context)
        {
            _context = context;
        }

        // Get all vendors, without state code sub-objects
        // GET: api/Vendors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendors()
        {
            var result = await _context.Vendors.ToListAsync();
            return result;
        }

        // Search vendors
        // This method includes the vendor's statecode object in the delivered data
        // GET: api/Vendors/withStates?{query}
        [HttpGet("withStates")]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendorsWithStates([FromQuery] SearchVendors query)
        {
            var vendors = from vendor in _context.Vendors select vendor;
            if (query != null)
            {
                vendors = from vendor in vendors
                          where
                            string.IsNullOrEmpty(query.SearchName) || EF.Functions.Like(vendor.Name, "%" + query.SearchName + "%") //vendor.Name == query.SearchName //vendor.Name.Contains(query.SearchName, StringComparison.OrdinalIgnoreCase)
                          select vendor;
            }
            var result = vendors.AsNoTracking().Include(sc => sc.StateCode).ToListAsync();
            return await result;
        }

        // GET: api/Vendors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vendor>> GetVendor(long id)
        {
            var vendor = await _context.Vendors.FindAsync(id);

            if (vendor == null)
            {
                return NotFound();
            }

            return vendor;
        }

        // PUT: api/Vendors/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor(long id, Vendor vendor)
        {
            if (id != vendor.VendorId)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
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

        // POST: api/Vendors
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Vendor>> PostVendor(Vendor vendor)
        {
            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendor", new { id = vendor.VendorId }, vendor);
        }

        // DELETE: api/Vendors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vendor>> DeleteVendor(long id)
        {
            var vendor = await _context.Vendors.FindAsync(id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return vendor;
        }

        private bool VendorExists(long id)
        {
            return _context.Vendors.Any(e => e.VendorId == id);
        }
    }
}
