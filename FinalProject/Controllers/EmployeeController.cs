using FinalProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [ApiController]
    [Route("api/Employee")]
    public class EmployeeController:Controller
    {
        private readonly EmployeeDbContext _db;
        public EmployeeController(EmployeeDbContext db)
        {
            _db = db;
        }
        [HttpPost]
        public ActionResult <Employee> CreateEmployee([FromBody] Employee emp)
        {
            if(emp.empId==null || emp.Name==null ||emp.Responsibilities==null || emp.Designation==null|| emp.Role==null || emp.Band==null)
            {
                return BadRequest("Employee details required");
            }
            if(!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            foreach(Employee em in _db.Employees)
            {
                if(em.empId==emp.empId)
                {
                    return BadRequest("Can't enter duplicate data");
                }
            }
            _db.Employees.Add(emp);
            _db.SaveChanges();
            return Ok(emp);
        }

        
        [HttpGet]
        public List<Employee> GetAllEmployees()
        {
            return _db.Employees.ToList();
        }

        
        [HttpGet("GetEmployeesByDesignation/{designation}")]
        
        public List<Employee> GetEmployeesByDesignation(String designation) { 
        
            List<Employee> employees = new List<Employee>();
        foreach(var emp in _db.Employees)
            {
                if(emp.Designation==designation)
                {
                    employees.Add(emp);
                }
            }
        return employees;
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployeeById(int id) {

            var emp = _db.Employees.FirstOrDefault(x => x.empId == id);
            if(emp==null)
            {
                return BadRequest("No employee with this id exists");
            }
            return Ok(emp);
        }

        [HttpDelete("{id}")]
        public ActionResult<Employee> DeleteEmployee(int id)
        {
            var emp = _db.Employees.FirstOrDefault(x => x.empId == id);
            if(emp==null)
            {
                return BadRequest("No employee with this id exists");
            }
            _db.Employees.Remove(emp);
            _db.SaveChanges();
            return Ok(emp);
        }
        [HttpPut("{id}")]
        public ActionResult<Employee> UpdateEmployee(int id,[FromBody] Employee emp)
        {
            var em = _db.Employees.FirstOrDefault(x => x.empId == id);
            if(emp==null)
            {
                return BadRequest("No employee with this id exists");
            }
            em.Name=emp.Name;
            em.Role=emp.Role;
            em.Responsibilities=emp.Responsibilities;
            em.Band=emp.Band;
            em.Designation=emp.Designation;
            _db.SaveChanges();
            return Ok(em);
        }
    }
}
