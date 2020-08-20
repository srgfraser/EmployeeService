using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeService.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

#nullable enable
        public string? Address { get; set; }
        public string? Role { get; set; }        // to simplify using string. Probably better if Id to a Role Table
        public string? Department { get; set; }  // to simplify using string. Probably better if Id to a Department Table
        public string? SkillSets { get; set; }   // to simplify using string. Probably better if Id to a many-to-many intersection table to SkillSet Table
        public DateTime? DateOfBirth { get; set; }
#nullable disable

        [Required]
        public DateTime DateOfJoining { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}