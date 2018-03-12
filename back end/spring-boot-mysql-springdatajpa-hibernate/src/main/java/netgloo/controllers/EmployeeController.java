package netgloo.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import domain.Employee;
import netgloo.models.EmployeeDao;

@RestController
public class EmployeeController {

	@CrossOrigin
	@RequestMapping(value = "/findAllEmployees", method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Employee>> findAllEmployees() throws IOException {
		List<Employee> employees = employeeDao.findEmployeeFetchDept();
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

	@RequestMapping("/findEmployeeById")
	@ResponseBody
	public String findEmployeeById(Long Id) throws JsonGenerationException, JsonMappingException, IOException {
		String jsonInString = null;
		Employee employee = employeeDao.findOne(Id);
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(new File("d:\\file.json"), employee);
			System.out.println("employee name = " + employee.getDepartment().getId());
			jsonInString = mapper.writeValueAsString(employee);
			System.out.println("employee string = " + jsonInString);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonInString;

	}

	@RequestMapping("/addEmployee")
	@ResponseBody
	public Employee create(@RequestBody Employee employee) throws Exception {
		try {
			employee = employeeDao.save(employee);
		} catch (Exception ex) {
			throw new Exception(ex);
		}
		return employee;
	}
	@RequestMapping(value = "/deleteEmployee", method = RequestMethod.POST)
	@ResponseBody
	public String delete(@RequestBody Employee employee) {
		try {			
			employeeDao.delete(employee);
		} catch (Exception ex) {
			return "Error deleting the user:" + ex.toString();
		}
		return "User succesfully deleted!";
	}

	@RequestMapping(value = "/updateEmployee", method = RequestMethod.POST)
	@ResponseBody
	public String updateEmployee(@RequestBody Employee employee) {
		try {
			System.out.println(employee.getDepartment());
			employeeDao.save(employee);
			// employeeDao.updateEmployee();
		} catch (Exception ex) {
			return "Error updating the user: " + ex.toString();
		}
		return "User succesfully updated!";
	}

	// Private fields

	@Autowired
	private EmployeeDao employeeDao;

}
