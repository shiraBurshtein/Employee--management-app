using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.CORE.Models;



namespace EmployeeManagement.API.Mapping
{
    public class PostModelsMappingProfile:Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<PositionPostModel, Position>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeePositionPostModel, EmployeePosition>().ReverseMap();

        }

    }
}
