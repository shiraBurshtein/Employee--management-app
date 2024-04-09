using EmployeeManagement.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.RepositoriesInterfaces
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> GetPositionsAsync();
        Task<Position> AddPositionAsync(Position position);
        Task<Position> UpdatePositionAsync(int PositionId, Position UpdetedPosition);


    }
}
