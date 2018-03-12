/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package domain;

import java.io.Serializable;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * @author HAkroush
 */
@Entity
// @MappedSuperclass
@Table(name = "department")
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Basic(optional = false)
	@Column(name = "name")
	private String name;

	@JoinColumn(name = "manager")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "departmentList", "employeeList", "manager", "department" })
	private Employee manager;

	@OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Employee> employeeList;

	public Department() {
	}

	public Department(Long id) {
		this.id = id;
	}

	public Department(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Employee getManager() {
		return manager;
	}

	public void setManager(Employee manager) {
		this.manager = manager;
	}

	public List<Employee> getEmployeeList() {
		return employeeList;
	}

	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Department)) {
			return false;
		}
		Department other = (Department) object;
		if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "netgloo.models.Department[ id=" + id + " ]";
	}
}

// @JoinColumn(name = "manager")
// @ManyToOne(optional = false, fetch = FetchType.LAZY)
//// @JsonManagedReference
// @JsonIgnoreProperties({ "departmentList", "employeeList", "manager",
// "department" })
// private Employee manager;
//
//// @JsonIgnoreProperties({ "department" })
// @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
// @JsonIgnoreProperties({ "departmentList", "employeeList", "manager",
// "department" })
// private List<Employee> employeeList;