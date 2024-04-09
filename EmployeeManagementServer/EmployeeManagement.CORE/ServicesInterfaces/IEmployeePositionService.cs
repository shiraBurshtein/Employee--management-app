using EmployeeManagement.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.ServicesInterfaces
{
    public interface IEmployeePositionService
    { 
        Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync();
        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId);

        Task<EmployeePosition> AddPositionToEmployeeAsync(int EmployeeId, EmployeePosition positionEmployee);
        Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId,int positionId, EmployeePosition positionEmployee);

        Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId);
      
    }
}
