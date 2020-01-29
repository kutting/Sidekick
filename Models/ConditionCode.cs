using System.Collections.Generic;

namespace Sidekick.Models
{
    public class ConditionCode
    {
        public long ConditionCodeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        // Foreign Key from Comic
        public ICollection<Comic> Comics { get; set; }
    }
}
