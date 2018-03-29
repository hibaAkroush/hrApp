myApp.service('employeeService', function($http) {

    this.getEmployees = function(e) {
        return $http({
            method: "GET",
            url: "http://localhost:8050/findAllEmployees",
            data: JSON.stringify(e.data)
        })
    };

    this.createEmployee = function(e) { 
        console.log(JSON.stringify(e.data))
        delete e.data.id;
        tempDep = e.data.dep_id
        tempMgr = e.data.mgr_id        
        e.data.department = tempDep
        e.data.manager =  tempMgr
        delete e.data.mgr_id;
        delete e.data.dep_id;
        return $http({
            method: "POST",
            url: "http://localhost:8050/addEmployee",
            data: JSON.stringify(e.data)
        })
    };

    this.updateEmployee = function(e) {
        if(e.manager){
        e.manager = e.manager.id
        e.department = e.department.id 
        }
        return $http({
            method: "POST",
            url: "http://localhost:8050/updateEmployee",
            data: JSON.stringify(e.data)
        })
    };

    this.deleteEmployee = function(e) {
        return $http({
            method: "POST",
            url: "http://localhost:8050/deleteEmployee",
            data: JSON.stringify(e.data)
        });
    };

});