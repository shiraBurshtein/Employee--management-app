using EmployeeManagement.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.ServicesInterfaces
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetPositionsAsync();
        Task<Position> AddPositionAsync(Position position);

        //Task<bool> DeletePositionAsync(int id);
    }
}
