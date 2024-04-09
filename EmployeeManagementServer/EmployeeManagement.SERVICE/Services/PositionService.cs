using EmployeeManagement.CORE.Models;
using EmployeeManagement.CORE.RepositoriesInterfaces;
using EmployeeManagement.CORE.ServicesInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.SERVICES.Services
{
    public class PositionService:IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        public PositionService(IPositionRepository positionRepository) 
        { 
            _positionRepository=positionRepository;

        } 
        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _positionRepository.GetPositionsAsync();
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            return await _positionRepository.AddPositionAsync(position);
        }


      
      
    }
}
