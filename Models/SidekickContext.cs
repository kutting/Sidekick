using Microsoft.EntityFrameworkCore;

namespace Sidekick.Models
{
    public class SidekickContext : DbContext
    {
        public SidekickContext(DbContextOptions<SidekickContext> options)
            : base(options)
        {
        }

        public DbSet<Comic> Comics { get; set; }
        public DbSet<ConditionCode> ConditionCodes { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<StateCode> StateCode { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comic>().ToTable("Comic");
            modelBuilder.Entity<ConditionCode>().ToTable("ConditionCode");
            modelBuilder.Entity<StateCode>().ToTable("StateCode");
            modelBuilder.Entity<Vendor>().ToTable("Vendor");
        }
    }
}