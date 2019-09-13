using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AngularEmployeeContext _context;

        public EmployeeController(AngularEmployeeContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public IEnumerable<EmployeeDetails> GetEmployeeDetails()
        {
            return _context.EmployeeDetails;
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeDetails([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeDetails = await _context.EmployeeDetails.FindAsync(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            return Ok(employeeDetails);
        }

        // PUT: api/Employee/5
        //[HttpPut("{id}")]
        [HttpPut]
        public async Task<IActionResult> PutEmployeeDetails([FromBody]EmployeeDetails employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }         
            try
            {
                EmployeeDetails objEmp = new EmployeeDetails();
                objEmp = _context.EmployeeDetails.Find(employee.EmpId);
                if (objEmp != null)
                {
                    objEmp.EmpName = employee.EmpName;
                    objEmp.Address = employee.Address;
                    objEmp.EmailId = employee.EmailId;
                    objEmp.DateOfBirth = employee.DateOfBirth;
                    objEmp.Gender = employee.Gender;
                    objEmp.PinCode = employee.PinCode;
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDetailsExists(employee.EmpId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee);
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> PostEmployeeDetails([FromBody] EmployeeDetails employeeDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.EmployeeDetails.Add(employeeDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeDetails", new { id = employeeDetails.EmpId }, employeeDetails);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDetails(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeDetails = await _context.EmployeeDetails.FindAsync(id);
            if (employeeDetails == null)
            {
                return NotFound();
            }

            _context.EmployeeDetails.Remove(employeeDetails);
            await _context.SaveChangesAsync();

            return Ok(employeeDetails);
        }

        private bool EmployeeDetailsExists(int id)
        {
            return _context.EmployeeDetails.Any(e => e.EmpId == id);
        }
    }
}