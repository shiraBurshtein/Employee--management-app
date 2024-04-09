using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.CORE.DTOs;
using EmployeeManagement.CORE.Models;
using EmployeeManagement.CORE.ServicesInterfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {   private readonly IEmployeeService _employeeService;
        private readonly IEmployeePositionService _employeePositionService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IEmployeePositionService EmployeepositionService,IMapper mapper)
        {
            _employeeService = employeeService;
            _employeePositionService = EmployeepositionService;
            _mapper = mapper;

        }
        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllActiveEmployeesAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDTO>>(employees));
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
           var employee=await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            
            var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(employee));
            return Ok(newEmployee);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, _mapper.Map<Employee>(employee));
            return Ok(updatedEmployee);
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public  async Task<ActionResult> Delete(int id)
        {

            var employee = await _employeeService.DeleteEmployeeAsync(id);
            if (employee == false)
            {
                return NotFound();
            }
   
            return NoContent();

        }
        //position
        [HttpGet("{id}/position")]
        public async Task<ActionResult<EmployeePosition>> GetEmployeePositions(int id)
        {
            var positionEmployee = await _employeePositionService.GetEmployeePositionsAsync(id);
            if (positionEmployee == null)
            {
                return NotFound(); 
            }
            return Ok(positionEmployee);
        }

        // POST api/<EmployeesController>
        [HttpPost("{id}/position")]
        
        public async Task<ActionResult<EmployeePosition>> AddPositionToEmployee(int id, [FromBody] EmployeePositionPostModel employeePosition)
        {
            var newEmployeePosition = await _employeePositionService.AddPositionToEmployeeAsync(id, _mapper.Map<EmployeePosition>(employeePosition));
            if (newEmployeePosition == null)
            {
                return NotFound();
            }
            return Ok(newEmployeePosition);
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}/positions/{positionId}")]
        public async Task<ActionResult> UpdatePositionToEmployee(int employeeId,int positionId, [FromBody] EmployeePositionPostModel PositionEmployee)
        {
            var updateEmployeePosition = await _employeePositionService.UpdatePositionToEmployeeAsync(employeeId, positionId, _mapper.Map<EmployeePosition>(PositionEmployee));
            if (updateEmployeePosition == null)
            {
                return NotFound();
            }
            return Ok(updateEmployeePosition);
        }

        [HttpDelete("{id}/position/{positionId}")]

        public async Task<ActionResult> DeletePositionOfEmployee(int employeeId, int positionId)
        {
            var result = await _employeePositionService.DeletePositionOfEmployeeAsync(employeeId, positionId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
