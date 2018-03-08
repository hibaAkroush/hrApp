package netgloo.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import domain.Department;
import netgloo.models.DepartmentDao;

@RestController
public class DepartmentController {
	@Autowired
	private DepartmentDao departmentDao;

	@CrossOrigin
	@RequestMapping("/findAllDepartments")
	@ResponseBody
	public ResponseEntity<List<Department>> findAllDepartments() throws IOException {
		List<Department> departments = departmentDao.findDepatmentFetchEmployee();
		return new ResponseEntity<List<Department>>(departments, HttpStatus.OK);
	}

	@RequestMapping("/addDepartment")
	@ResponseBody
	public String create(@RequestBody Department department) {
		try {
//			departmentDao.addDepartment(department.getName(), department.getManager().getId());
			 departmentDao.save(department);
		} catch (Exception ex) {
			return "Error creating the Department: " + ex.toString();
		}
		return "Deparment succesfully created with id = ";
	}

	@RequestMapping("/deleteDepartment")
	@ResponseBody
	public String delete(@RequestBody Department department) {
		try {
			departmentDao.delete(department);
		} catch (Exception ex) {
			return "Error deleting the Department, " + ex.toString();
		}
		return "Department succesfully deleted!";
	}

	@RequestMapping(value = "/updateDepartment", method = RequestMethod.POST)
	@ResponseBody
	public String update(@RequestBody Department department) {
		try {
			//departmentDao.updateDepartment(department.getName(), department.getManager().getId());
			departmentDao.save(department);
		} catch (Exception ex) {
			return "Error updating the Department: " + ex.toString();
		}
		return "Department succesfully updated!";
	}
}
