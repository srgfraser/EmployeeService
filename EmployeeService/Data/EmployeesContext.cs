using EmployeeService.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeService.Data
{
    public class EmployeesContext : DbContext
    {
        public EmployeesContext() { }  // For Moq
        public EmployeesContext(DbContextOptions<EmployeesContext> options) : base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }
    }
}