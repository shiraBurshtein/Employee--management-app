using EmployeeManagement.API.Mapping;
using EmployeeManagement.CORE.Mapping;
using EmployeeManagement.CORE.RepositoriesInterfaces;
using EmployeeManagement.CORE.ServicesInterfaces;
using EmployeeManagement.DATA;
using EmployeeManagement.DATA.Repositories;
using EmployeeManagement.SERVICES.Services;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IPositionRepository, PositionRepository>();
builder.Services.AddScoped<IEmployeePositionRepository, EmployeePositionRepository>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IEmployeePositionService, EmployeePositionService>();

builder.Services.AddAutoMapper(typeof(MappingProfile),typeof(PostModelsMappingProfile));
builder.Services.AddDbContext<DataContext>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();


app.MapControllers();

app.Run();
