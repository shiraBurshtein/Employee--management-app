using EmployeeManagement.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.RepositoriesInterfaces
{
    public interface IEmployeePositionRepository
    { 
        Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync();
        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId);
        
        Task<EmployeePosition> AddPositionToEmployeeAsync( EmployeePosition employeePosition);
        Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId,int positionId, EmployeePosition employeePosition);
        Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId);
       

    }
}
