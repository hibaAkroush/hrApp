myApp.controller("toastCtrl", function($scope, $mdToast, $mdDialog, sharedDataService, httpService) {

    $scope.deleteFieldEmp = function() {
        emp = sharedDataService.employee.selected;
        emp.birthDate = "2010-02-02";
        emp.hireDate = "2010-03-03";
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