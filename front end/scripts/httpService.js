myApp.service('httpService', function ($http) {
    this.getEmployees = function (e) {
        return $http({
            method: "GET",
            url: "http://localhost:8050/findAllEmployees",
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].birthDate = "2010-02-02";
                response.data[i].hireDate = "2010-02-02";
                if(response.data[i].department !== null){
                    response.data[i].dep_id = response.data[i].department.id
                }
                if(response.data[i].manager !== null){
                    response.data[i].mgr_id = response.data[i].manager.id
                }
            }
            e.success(response.data);
        });
        
    };

    this.getDepartments = function (e) {
        return $http({
            method: "GET",
            url: "http://localhost:8050/findAllDepartments",
        }).then(function successCallback(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].head = response.data[i].manager.id
            }
            e.success(response.data);
        });
        
    };
    this.createEmployee = function (e) {
        console.log("create  employee service   ", e, JSON.stringify(e))
        return $http({
            method: "POST",
            url: "http://localhost:8050/addEmployee",
            data: JSON.stringify(e)
        }).then(function(response) {
            console.log(response)
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
    };

    this.createDepartment =  function (e) {
        console.log("create  employee service   ", e, JSON.stringify(e))
        return $http({
            method: "POST",
            url: "http://localhost:8050/addDepartment",
            data: JSON.stringify(e)
        }).then(function(response) {
            console.log(response)
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
    };

    this.updateEmployee = function (e) {
        console.log(JSON.stringify(e));
        return $http({
            method: "POST",
            url: "http://localhost:8050/updateEmployee",
            data: JSON.stringify(e)
        }).then(function successCallback(response) {
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
    };
    this.updateDepartment = function (e) {
        console.log("http service",JSON.stringify(e));
        return $http({
            method: "POST",
            url: "http://localhost:8050/updateDepartment",
            data: JSON.stringify(e)
        }).then(function successCallback(response) {
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
    }; 
    this.deleteEmployee = function (e) {
        console.log("http service",JSON.stringify(e));
        return $http({
            method: "POST",
            url: "http://localhost:8050/deleteEmployee",
            data: JSON.stringify(e)
        }).then(function successCallback(response) {
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
        
    };
    this.deleteDepartment = function (e) {
        console.log("http service",JSON.stringify(e));
        return $http({
            method: "POST",
            url: "http://localhost:8050/deleteDepartment",
            data: JSON.stringify(e)
        }).then(function successCallback(response) {
            return response;
        }).catch(function(error){
            console.log("error creating emo : ", error)
        });
        
    };    
});

