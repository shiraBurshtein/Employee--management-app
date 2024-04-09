namespace EmployeeManagement.API.Models
{
    public class EmployeePositionPostModel
    {
        
        public int PositionId { get; set; }
        public string PositionName { get; set; }

        public DateTime EntryDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
