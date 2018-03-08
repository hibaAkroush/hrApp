/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "employee")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Employee implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;

	@Column(name = "birth_date")
	@Temporal(TemporalType.DATE)
	private Date birthDate;

	@Column(name = "hire_date")
	@Temporal(TemporalType.DATE)
	private Date hireDate;

	@Column(name = "sal")
	private Integer sal;

	@Basic(optional = false)
	@Column(name = "name")
	private String name;

	@OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Department> departmentList;

	@OneToMany(mappedBy = "manager", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Employee> employeeList;

	@JoinColumn(name = "manager_id")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "manager" })
	private Employee manager;

	@JoinColumn(name = "dept_id")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "manager", "employeeList" })
	private Department department;

	public Employee() {
	}

	public Employee(Long id) {
		this.Id = id;
	}

	public Employee(Long id, String name) {
		this.Id = id;
		this.name = name;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		this.Id = id;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Integer getSal() {
		return sal;
	}

	public void setSal(Integer sal) {
		this.sal = sal;
	}

	public Date getHireDate() {
		return hireDate;
	}

	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Department> getDepartmentList() {
		return departmentList;
	}

	public void setDepartmentList(List<Department> departmentList) {
		this.departmentList = departmentList;
	}

	public List<Employee> getEmployeeList() {
		return employeeList;
	}

	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}

	public Employee getManager() {
		return manager;
	}

	public void setManager(Employee manager) {
		this.manager = manager;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (Id != null ? Id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof Employee)) {
			return false;
		}
		Employee other = (Employee) object;
		if ((this.Id == null && other.Id != null) || (this.Id != null && !this.Id.equals(other.Id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "netgloo.models.Employee[ id=" + Id + " ]";
	}

}