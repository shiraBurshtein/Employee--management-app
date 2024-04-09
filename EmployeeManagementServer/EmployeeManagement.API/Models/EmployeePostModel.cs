﻿using EmployeeManagement.CORE.Models;

namespace EmployeeManagement.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public DateTime EntryDate { get; set; }
        public IEnumerable<EmployeePositionPostModel> Positions { get; set; }
    }
}
