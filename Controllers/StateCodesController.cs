using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sidekick.Models;

namespace Sidekick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateCodesController : ControllerBase
    {
        private readonly SidekickContext _context;

        public StateCodesController(SidekickContext context)
        {
            _context = context;
        }

        // GET: api/StateCodes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StateCode>>> GetStateCode()
        {
            return await _context.StateCode.ToListAsync();
        }
    }
}
