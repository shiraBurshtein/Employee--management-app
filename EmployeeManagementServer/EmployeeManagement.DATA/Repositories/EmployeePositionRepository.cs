using EmployeeManagement.CORE.Models;
using EmployeeManagement.CORE.RepositoriesInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.DATA.Repositories
{
    public class EmployeePositionRepository:IEmployeePositionRepository
    {
        private readonly DataContext _context;
        public EmployeePositionRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync()
        {
            return await _context.EmployeePositions.ToListAsync();
        }
        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _context.EmployeePositions.Where(e => e.EmployeeId == employeeId && e.IsActive).ToListAsync();
        }

        public async Task<EmployeePosition> AddPositionToEmployeeAsync(EmployeePosition employeePosition)
        {
            await _context.EmployeePositions.AddAsync(employeePosition);
            _context.SaveChanges();
            return employeePosition;
        }
        public async Task<EmployeePosition> UpdatePositionToEmployeeAsync(int empoyeeId, int positionId, EmployeePosition employeePosition)
        {
            var position = await _context.EmployeePositions.FirstOrDefaultAsync(e => e.PositionId == positionId && e.EmployeeId == empoyeeId);
            if (position == null)
            {
                return null;
            }
            position.IsManagement = employeePosition.IsManagement;
            position.EntryDate = employeePosition.EntryDate;
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
            var employeePosition = await _context.EmployeePositions.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.PositionId == positionId);

            if (employeePosition != null)
            {
                employeePosition.IsActive = false;
                await _context.SaveChangesAsync();
                return true;
            }

            return false; 
        }
      

    }
}
