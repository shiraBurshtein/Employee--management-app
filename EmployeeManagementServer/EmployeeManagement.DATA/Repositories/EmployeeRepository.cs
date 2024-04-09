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
    public class EmployeeRepository:IEmployeeRepository
    {

        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.Employees.Include(p => p.Positions).ToListAsync();
        }
        public async Task<IEnumerable<Employee>> GetAllActiveEmployeesAsync()
        {
            return await _context.Employees.Where(e => e.IsActive == true).Include(p => p.Positions).ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            var employee = await _context.Employees.Include(p=>p.Positions).FirstOrDefaultAsync(emp => emp.EmployeeId == employeeId);
            return employee;
        }
        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(int employeeId, Employee updatedEmployee)
        {

            var employee = await _context.Employees.Include(p => p.Positions).FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
            if (employee == null)
            {
                return null;
            }
            employee.FirstName = updatedEmployee.FirstName;
            employee.LastName = updatedEmployee.LastName;
            employee.Identity = updatedEmployee.Identity;
            employee.Gender = updatedEmployee.Gender;
            employee.BirthDate = updatedEmployee.BirthDate;
            employee.EntryDate = updatedEmployee.EntryDate;
            employee.Positions = updatedEmployee.Positions;
           


            await _context.SaveChangesAsync();

            return employee;
        }
        public async Task<bool> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            if (employee != null)
            {
                employee.IsActive = false;
                await _context.SaveChangesAsync();
                return true; 
            }

            return false; 
        }
      
     
      
    }
}
