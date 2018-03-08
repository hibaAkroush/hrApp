package netgloo.models;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import domain.Employee;

@Transactional
public interface EmployeeDao extends CrudRepository<Employee, Long> {

	@Query("Select e from Employee e LEFT JOIN FETCH e.department")
	List<Employee> findEmployeeFetchDept();

//	@Modifying
//	@Query("update e from Employee set e.name = :name, e.hireDate = :hireDate, e.bithDate = :bithDate, e.sal = :sal, e.manager = :manager, e.department = :department where e.Id=:id")
//
//	void updateDepartment(@Param("name") String name, @Param("hireDate") Date hireDate,
//	@Param("bithDate") Date bithDate, @Param("sal") Integer sal, @Param("manager") Long manager, @Param("department") Long department);
//
//	@Modifying
//	@Query
//	("insert e into Employee set e.name = :name, e.hireDate =:hireDate,e.bithDate=:bithDate,e.sal=:sal,e.manager=:manager,e.department=:department")
//	void addDepartment(@Param("name") String name, @Param("hireDate") Date hireDate, @Param("bithDate") Date bithDate, @Param("sal") Integer sal, @Param("manager") Long manager, @Param("department") Long department);

}
