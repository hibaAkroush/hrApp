myApp.controller('employeeCtrl', function($scope, $state, $http, $mdDialog, $mdToast, sharedDataService, employeeService) {

	//#region employee
	$scope.noChangesMade = true;	
	$scope.madeChangesToBeUpdated = false;
	$scope.selectedEmployee = null;

	$scope.cancelEmployee = function(){
		var grid = $("#grid").data("kendoGrid");
		grid.cancelChanges();
		$scope.noChangesMade = true;
		$scope.selectedEmployee = null;
	};

	$scope.addEmployee = function (){
		var grid = $("#grid").data("kendoGrid");
		grid.addRow();
		$scope.noChangesMade = false;
		$scope.madeChangesToBeUpdated = true;
	};

	$scope.saveEmployee = function (){
		var entityGrid = $("#grid").data("kendoGrid");
		entityGrid.saveChanges();
		$scope.selectedEmployee = null;
		$scope.madeChangesToBeUpdated = false;
	};

	$scope.updateEmployee = function() {
		var grid = $("#grid").data("kendoGrid");
		grid.editRow(grid.select()[0]);
		$scope.noChangesMade = false;
		$scope.madeChangesToBeUpdated = true;
	};

	$scope.deleteEmployee = function(e) {
		var grid = $("#grid").data("kendoGrid");
		grid.removeRow(grid.select()[0]);
		$scope.selectedEmployee = null;
		$scope.noChangesMade = false;
	};

	var employeeDataSource = new kendo.data.DataSource({
		pageSize: 16,
		transport: {
			read: function(e){ 
			  employeeService.getEmployees(e)
			    .then(function successCallback(response) {
		            for (var i = 0; i < response.data.length; i++) {
		                if (response.data[i].department !== null) {
		                    response.data[i].dep_id = response.data[i].department.id;
		                }
		                if (response.data[i].manager !== null) {
		                    response.data[i].mgr_id = response.data[i].manager.id;
		                }
		            }
		            e.success(response.data);
		        });   
			},
			update: function(e){ 
				console.log("updated edmp: ", e);
			    employeeService.updateEmployee(e).then(function(response) {
		            console.log("responce from server: ", response.data);
		            e.sucees(response.data);
		        }).catch(function(error) {
		            e.error(error);
		            console.log("error creating emo : ", error);
		        }).then(function(){
			    	employeeDataSource.read();	
			    });
			},
			destroy: function (e) {
			    employeeService.deleteEmployee(e).then(function successCallback(response) {
		            e.sucsess(response.data);
		        }).catch(function(error) {
		            e.error(error);
		        });
			},
			create : function(e){
				employeeService.createEmployee(e).then(function(response) {
		            e.sucees(response.data);
		        }).catch(function(error) {
		            e.error(error);
		            console.log("error creating emo : ", error);
		        }).then(function(){	
					employeeDataSource.read();
				});
			}
		},
		schema: {
			model: {
				id: "id",
				fields: {
					name: {},
					dep_id: { type: "number" },
					sal: { type: "number" },
					birthDate: { type: "date" },
					hireDate: { type: "date" },
					mgr_id: { type: "number" }
				}
			}
		}
	});

	$scope.gridOptionsEmp = {
		sortable: true,
		pageable: true,
		editable: "inline",
		selectable: true,
		filterable: true,
		dataSource: employeeDataSource,
		change: function(e) {
			var grid = e.sender;
		    var selectedRows = grid.select();
		    console.log($scope.selectedRows)
		    if(selectedRows.length > 0){
			    $scope.selectedEmployee = grid.dataItem(selectedRows[0]);
			    console.log($scope.selectedEmployee)			    
			} else {
		    	$scope.selectedEmployee = null;
		    }
		    $scope.$digest();
		},
		columns: [{ field: "name", title: "Name", width: "120px"}, 
			{ field: "dep_id", valuePrimitive: true, title: "Department Id", width: "120px" }, 
			{ field: "sal", title: "Salary", width: "120px"}, 
			{ field: "birthDate", title: "Birth Date", width: "120px", format: "{0:MM/dd/yyyy}" }, 
			{ field: "hireDate", title: "Hire Date", width: "120px", format: "{0:MM/dd/yyyy}" }, 
			{ field: "mgr_id", title: "Manager ID", width: "120px"}]
	};
});
	//#endregion