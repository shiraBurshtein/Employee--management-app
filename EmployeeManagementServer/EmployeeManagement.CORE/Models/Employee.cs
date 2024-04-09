using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.Models
{
    public enum Gender
    {
        Male,
        Female
    }
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<EmployeePosition> Positions { get; set; }

        public Employee()
        {
            IsActive = true;
        }

    }
}
