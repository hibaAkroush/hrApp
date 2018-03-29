myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog, sharedDataService, httpService) {
    managers = [{
        mgrName: "husam",
        mgrID: 1
    }, {
        mgrName: "badr",
        mgrID: 2
    }, {
        mgrName: "salam",
        mgrID: 3
    }, {
        mgrName: "osama",
        mgrID: 4
    }];

    departments = [{
        depName: "sales",
        depID: 1
    }, {
        depName: "accounting",
        depID: 2
    }, {
        depName: "research",
        depID: 3
    }, {
        depName: "CEO",
        depID: 4
    }];

    $scope.deleteFieldEmp = function() {
        emp = sharedDataService.employee.selected;
        emp.birthDate = "2010-02-02";
        emp.hireDate = "2010-03-03";
        console.log(emp)
        managers.forEach(function(managerElement){
            if (managerElement.mgrName === emp.manager) {
                emp.manager = managerElement.mgrID;
            }
        })

        departments.forEach(function(departmentElement){
            if (departmentElement.depName === emp.department) {
                emp.department = departmentElement.depID;
            }
        })
        console.log(emp)
        httpService.deleteEmployee(emp);
        sharedDataService.employee.selected = false;
        $mdToast.hide();
    };

    $scope.closeToastEmp = function() {
        sharedDataService.employee.selected = false;
        $mdToast.hide();
    };

    $scope.deleteFieldMan = function() {
        department = sharedDataService.managment.selectedMan;
        department.manager = department.manager.id;
        httpService.deleteDepartment(department);
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide();
    };

    $scope.closeToast = function() {
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide();
    };
});

