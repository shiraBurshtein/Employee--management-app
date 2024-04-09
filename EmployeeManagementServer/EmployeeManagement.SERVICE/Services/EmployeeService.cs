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
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _employeeRepository.GetEmployeesAsync();
        }
        public async Task<IEnumerable<Employee>> GetAllActiveEmployeesAsync()
        {
            return await _employeeRepository.GetAllActiveEmployeesAsync();
        }
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }


        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            var existingEmployees = await _employeeRepository.GetEmployeesAsync();
            if (existingEmployees.Any(e => e.Identity == employee.Identity))
            {
                return null;
            }

            return await _employeeRepository.AddEmployeeAsync(employee);
        }
        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await _employeeRepository.DeleteEmployeeAsync(id);
        }



        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        }
    }
}
