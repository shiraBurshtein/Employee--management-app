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
    public class PositionRepository:IPositionRepository
    {

        private readonly DataContext _context;
        public PositionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            await _context.Positions.AddAsync(position);
            await _context.SaveChangesAsync();
            return position;
        }

        //public async Task<bool> DeletePositionAsync(int PositionId)
        //{
        //    var position = await _context.Positions.FirstOrDefaultAsync(p => p.PositionId == PositionId);


        //    var employees = _context.Employees.FirstOrDefaultAsync(p => p.EmployeeId == PositionId);
        //    await _context.RemoveRange(employees).SaveChangesAsync();

        //    if (position != null)
        //    {
        //        await _context.Remove(p => p.PositionId == PositionId).SaveChangesAsync();
        //        return true;
        //    }
        //    return false;
        //}
        public async Task<Position> UpdatePositionAsync(int PositionId, Position UpdetedPosition)
        {
            var position = await _context.Positions.FirstOrDefaultAsync(p => p.PositionId == PositionId);

            if (position == null)
            {
                return null;
            }
            position.PositionId = UpdetedPosition.PositionId;
            position.PositionName = UpdetedPosition.PositionName;

            await _context.SaveChangesAsync();

            return position;
        }



    }
}
