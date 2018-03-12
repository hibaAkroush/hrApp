package netgloo.models;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import domain.Department;

public interface DepartmentDao extends CrudRepository<Department, Long> {
	@Query("Select e from Department e LEFT JOIN FETCH e.manager")
	List<Department> findDepatmentFetchEmployee();
	
	// @Modifying
	// @Query("UPDATE department  set name = :name manager = :manager where Id=:id")
	// void updateDepartment(@Param("name") String name, @Param("manager") Long id);
//
//	 @Modifying
//	 @Query("insert into  Department set name = :name manager =:manager")
//	 void addDepartment(@Param("name") String name, @Param("manager") Long id);

}
