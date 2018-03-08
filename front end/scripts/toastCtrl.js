myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog, sharedDataService, httpService){
    
    $scope.deleteFieldEmp = function (){
        emp = sharedDataService.employee.selected;
        console.log(emp);
        emp.birthDate = "2010-02-02";
        emp.hireDate = "2010-03-03"
        console.log(emp)
        httpService.deleteEmployee(emp)
        sharedDataService.employee.selected = false;
        $mdToast.hide()
    };

    $scope.closeToastEmp  = function(){
        sharedDataService.employee.selected = false;
        $mdToast.hide()
    };

    $scope.deleteFieldMan = function (){
        console.log("in tost controllr", sharedDataService)
        department = sharedDataService.managment.selectedMan;
        department.manager = department.manager.id;
        httpService.deleteDepartment(department);
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    };

    $scope.closeToast  = function(){
        sharedDataService.managment.selectedMan = false;
        $mdToast.hide()
    };
})