using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.CORE.DTOs;
using EmployeeManagement.CORE.Models;
using EmployeeManagement.CORE.ServicesInterfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionsController(IPositionService positionService,IMapper mapper)
        {
            _positionService=positionService;
            _mapper=mapper;
        }
        // GET: api/<PositionsController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var positions=await  _positionService.GetPositionsAsync();
          return Ok(_mapper.Map<IEnumerable<PositionDTO>>(positions));
        }

        //GET api/<PositionsController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //POST api/<PositionsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel position)
        {
            var newPosition = await _positionService.AddPositionAsync(_mapper.Map<Position>(position));
            return Ok(newPosition);
        }

        // PUT api/<PositionsController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<PositionsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
