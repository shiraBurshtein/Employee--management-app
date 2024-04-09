using AutoMapper;
using EmployeeManagement.CORE.DTOs;
using EmployeeManagement.CORE.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.CORE.Mapping
{
    public class MappingProfile: Profile
    {

        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Position, PositionDTO>().ReverseMap();
            CreateMap<EmployeePosition, EmployeePositionDTO>().ReverseMap();

        }
    }
}
