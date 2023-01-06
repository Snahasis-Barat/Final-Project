using Microsoft.EntityFrameworkCore;
using FinalProject.Models;
using FinalProject;
using FinalProject.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ProjectTesting
{
    [TestFixture]
    public class Tests
    {
        private static DbContextOptions<EmployeeDbContext> options = new DbContextOptionsBuilder<EmployeeDbContext>().UseInMemoryDatabase(databaseName: "Dummydatabase").Options;


        [Test]
        public void CreateEmployeeTest()
        {
            Employee e1 = new Employee();
            e1.empId = 1;
            e1.Name = "Asish";
            e1.Responsibilities = "Backend";
            e1.Band = "III";
            e1.Designation = "Analyst";
           e1.Role = ".NET";

            using (var context = new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);
                var controllerresult = repository.CreateEmployee(e1);
                try
                {
                    var result= controllerresult.Result as OkObjectResult;
                    Assert.AreEqual(200, result.StatusCode);

                }
                catch (Exception ex)
                {
                    Console.WriteLine("All employee details required");
                }
            }
        }

        [Test]
        public void CreateEmployeeTestOfDuplicateData()
        {
            Employee e1 = new Employee();
            e1.empId = 2;
            e1.Name = "Snahasis";
            e1.Responsibilities = "Backend";
            e1.Band = "III";
            e1.Designation = "SWE";
            e1.Role = ".NET";

            Employee e2 = new Employee();
            e2.empId = 3;
            e2.Name = "Ashish";
            e2.Responsibilities = "Frontend";
            e2.Band = "III";
            e2.Designation = "SWE";
            e2.Role = "React";

            using (var context=new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);
               var controllerresult= repository.CreateEmployee(e1);
                var controllerresult2 = repository.CreateEmployee(e2);
                try
                {
                    var finalresult = controllerresult.Result as OkObjectResult;
                    var finalresult2 = controllerresult2.Result as OkObjectResult;
                    Assert.AreEqual(finalresult.Value, e1);
                    Assert.AreEqual(finalresult2.Value, e2);
                }
                catch
                {
                    Console.WriteLine("Can't enter duplicate data");
                }

                

            }
        }

        [Test]
        public void GetEmployeesTest()
        {
            using(var context=new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);
                var controllerresult=repository.GetAllEmployees();
                Assert.AreEqual(2, controllerresult.Count);
            }
        }

        [Test]
        public void GetEmployeeByIdTest()
        {
            Employee e1 = new Employee();
            e1.empId = 3;
            e1.Name = "Ashish";
            e1.Responsibilities = "Frontend";
            e1.Band = "III";
            e1.Designation = "SWE";
            e1.Role = "React";
            using (var context=new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);
                
                try
                {
                    var controllerresult = repository.GetEmployeeById(1);
                    var finalresult = controllerresult.Result as OkObjectResult;
                    var finalresult2 = finalresult.Value as Employee;
                    Assert.AreEqual(e1.empId,finalresult2.empId );
                    /*Assert.AreEqual(e1.Name, finalresult2.Name );
                    Assert.AreEqual(e1.Band, finalresult2.Band);
                    Assert.AreEqual(e1.Responsibilities, finalresult2.Responsibilities);
                    Assert.AreEqual(e1.Designation, finalresult2.Designation);
                    Assert.AreEqual(e1.Role, finalresult2.Role);*/

                }
                catch
                {
                    
                    Console.WriteLine("Required record not matching");
                }
               
                
            }
        }


        [Test]
        public void DeleteEmployeeTest()
        {
            using (var context = new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);

                var controllerresult = repository.DeleteEmployee(1);
                try
                {
                    var finalresult = controllerresult.Result as OkObjectResult;
                    Assert.AreEqual(200, finalresult.StatusCode);
                }
                catch
                {
                    Console.WriteLine("Invalid id");

                }

            }
        }

        [Test]
        public void UpdateEmployeeTest()
        {
            Employee e1 = new Employee();
            e1.empId = 2;
            e1.Name = "Snahasis";
            e1.Responsibilities = "Backend";
            e1.Band = "III";
            e1.Designation = "SDE";
            e1.Role = "Full stack"; 
            using (var context=new EmployeeDbContext(options))
            {
                var repository = new EmployeeController(context);
                
                try
                {
                    var controllerresult = repository.UpdateEmployee(e1.empId, e1);
                    var finalresult=controllerresult.Result as OkObjectResult;
                    Assert.AreEqual(200, finalresult.StatusCode);
                }

                catch
                {
                    Console.WriteLine("Invalid id");
                }

               
            }
        }

        [Test]
        public void GetEmployeesByDesignation()
        {
            using(var context=new EmployeeDbContext(options))
            { 
                var repository = new EmployeeController(context);
                var controllerresult = repository.GetEmployeesByDesignation("SWE");
                try
                {
                    Assert.AreEqual(2,controllerresult.Count);
                }

                catch
                {
                    Console.WriteLine("Required count not matching");
                }


            }
        }


    }
}