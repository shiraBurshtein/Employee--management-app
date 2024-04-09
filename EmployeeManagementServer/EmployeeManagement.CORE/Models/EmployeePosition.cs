using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.Models
{
    public class EmployeePosition
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
        public bool IsActive { get; set; }
        public EmployeePosition()
        {
           IsActive = true;
        }

    }
}
