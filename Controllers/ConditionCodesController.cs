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
    public class ConditionCodesController : ControllerBase
    {
        private readonly SidekickContext _context;

        public ConditionCodesController(SidekickContext context)
        {
            _context = context;
        }

        // GET: api/ConditionCodes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConditionCode>>> GetConditionCodes()
        {
            return await _context.ConditionCodes.ToListAsync();
        }
    }
}
