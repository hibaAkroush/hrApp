myApp.service('departmentService', function($http) {

    this.getDepartments = function(e) {
        return $http({
            method: "GET",
            url: "http://localhost:8050/findAllDepartments",
            data: JSON.stringify(e.data)
        })
    };

    this.createDepartment = function(e) {
        department = e.data.models[0]
        delete department.id;
        department.manager = department.head;
        console.log(department)
        return $http({
            method: "POST",
            url: "http://localhost:8050/addDepartment",
            data: JSON.stringify(department)
        })
    };

    this.updateDepartment = function(e) {
        console.log(e)
        updatedDepartment = e.data.models[0]
        updatedDepartment.manager = updatedDepartment.head
        delete updatedDepartment.head;
        console.log(updatedDepartment)
        return $http({
            method: "POST",
            url: "http://localhost:8050/updateDepartment",
            data: JSON.stringify(updatedDepartment)
        })
    };

    this.deleteDepartment = function(e) {
       department = e.data.models[0]
       department.manager = department.head
       delete department.head
        return $http({
            method: "POST",
            url: "http://localhost:8050/deleteDepartment",
            data: JSON.stringify(department)
        });
    };
});