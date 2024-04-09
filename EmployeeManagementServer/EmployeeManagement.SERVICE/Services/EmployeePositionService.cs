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
    public class EmployeePositionService : IEmployeePositionService
    {
        private readonly IEmployeePositionRepository _positionEmployeeRepository;
        public EmployeePositionService(IEmployeePositionRepository employeePositionRepository)
        {
            _positionEmployeeRepository = employeePositionRepository;
        }
        //החזרת כל התפקידים של כל העובדים
        public async Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync()
        {
            return await _positionEmployeeRepository.GetAllEmployeePositionsAsync();
        }
        //החזרת כל התפקידים של עובד מסוים
        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _positionEmployeeRepository.GetEmployeePositionsAsync(employeeId);
        }
       
        public async Task<EmployeePosition> AddPositionToEmployeeAsync(int EmployeeId, EmployeePosition employeePosition)
        {
            employeePosition.EmployeeId = EmployeeId;
            return await _positionEmployeeRepository.AddPositionToEmployeeAsync(employeePosition);
        }
       
       
        public async Task<EmployeePosition> UpdatePositionToEmployeeAsync(int employeeId, int positionId, EmployeePosition employeePosition)
        {
         return await  _positionEmployeeRepository.UpdatePositionToEmployeeAsync(employeeId, positionId, employeePosition);
        } 

        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
            return await _positionEmployeeRepository.DeletePositionOfEmployeeAsync(employeeId, positionId);
        }
    }
}
