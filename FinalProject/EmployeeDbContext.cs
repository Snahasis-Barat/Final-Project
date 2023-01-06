using FinalProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalProject
{
    public class EmployeeDbContext:DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {


        }
        public DbSet<Employee> Employees { get; set; }
    }
}
