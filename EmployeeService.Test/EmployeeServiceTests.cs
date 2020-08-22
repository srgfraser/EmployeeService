using System;
using AutoFixture;
using EmployeeService.Controllers;
using EmployeeService.Data;
using EmployeeService.Models;
using Moq;
using Moq.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeService.Test
{
    [TestFixture]
    public class EmployeeServiceTests
    {
        private static readonly Fixture Fixture = new Fixture();

        [Test]
        public async Task GetEmployeeWithNoArguments_WhenCalled_EmptyDB_ReturnNoRecords()
        {
            //Arrange
            var employees = new List<Employee>().AsQueryable();
            var employeeContextMock = new Mock<EmployeesContext>();
            employeeContextMock.Setup(x => x.Employees).ReturnsDbSet(employees);
            var employeeController = new EmployeeController(employeeContextMock.Object);

            //Act
            var result = await employeeController.GetEmployee();

            //Assert
            Assert.AreEqual(result.Value.Count(), 0);
        }

        [Test]
        public async Task GetEmployeeWithNoArguments_WhenCalled_ReturnAllRecords()
        {
            //Arrange
            var employees = GenerateEmployees();
            var employeeContextMock = new Mock<EmployeesContext>();
            employeeContextMock.Setup(x => x.Employees).ReturnsDbSet(employees);
            var employeeController = new EmployeeController(employeeContextMock.Object);

            //Act
            var result = await employeeController.GetEmployee();

            //Assert
            Assert.AreEqual(result.Value.Count(), 2);
        }

        [Test]
        [TestCase(2, 2)]
        public async Task GetEmployeeWithArgument_WhenCalled_ReturnRequestedRecord(int id, int expectedResult)
        {
            //Arrange
            var employees = GenerateEmployees();
            var employeeContextMock = new Mock<EmployeesContext>();
            employeeContextMock.Setup(x => x.Employees).ReturnsDbSet(employees);
            employeeContextMock.Setup(x => x.Employees.FindAsync(It.IsAny<int>()))
                               .Returns(new ValueTask<Employee>(Task.FromResult(employees.FirstOrDefault(x => x.Id == id))));
            var employeeController = new EmployeeController(employeeContextMock.Object);

            //Act
            var result = await employeeController.GetEmployee(id);

            //Assert
            Assert.IsNull(result.Result);
            Assert.AreEqual(result.Value.Id, expectedResult);
        }

        [Test]
        [TestCase(3)]
        public async Task GetEmployeeWithArgument_WhenCalled_NoMatch_Return404(int id)
        {
            //Arrange
            var employees = GenerateEmployees();
            var employeeContextMock = new Mock<EmployeesContext>();
            employeeContextMock.Setup(x => x.Employees).ReturnsDbSet(employees);
            employeeContextMock.Setup(x => x.Employees.FindAsync(It.IsAny<int>()))
                               .Returns(new ValueTask<Employee>(Task.FromResult(employees.FirstOrDefault(x => x.Id == id))));
            var employeeController = new EmployeeController(employeeContextMock.Object);

            //Act
            var result = await employeeController.GetEmployee(id);

            //Assert
            Assert.IsNull(result.Value);
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        #region Helper Methods

        private IQueryable<Employee> GenerateEmployees()
        {
            IList<Employee> users = new List<Employee>
            {
                Fixture.Build<Employee>()
                    .With(u => u.Id, 1)
                    .With(u => u.Name, "John Doe")
                    .With(u => u.DateOfJoining, new DateTime(2018, 4, 23))
                    .With(u => u.IsActive, true)
                    .Create(),

                Fixture.Build<Employee>()
                    .With(u => u.Id, 2)
                    .With(u => u.Name, "Jane Smith")
                    .With(u => u.DateOfJoining, new DateTime(2014, 1, 15))
                    .With(u => u.IsActive, false)
                    .Create()
            };

            return users.AsQueryable();
        }

        #endregion
    }
}