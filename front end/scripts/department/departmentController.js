myApp.controller('departmentCtrl', function($scope, $http, $mdDialog, $mdToast, sharedDataService, departmentService) {

	$scope.noChangesMade = true;	
	$scope.madeChangesToBeUpdated = false;
	$scope.selectedDepartment = null;

	$scope.cancelDepartment = function(){
		var entityGrid = $("#dep-grid").data("kendoGrid");
		entityGrid.cancelChanges();
		$scope.noChangesMade = true;
		$scope.selectedDepartment = null;		
	};	
	
	$scope.addDepartment = function (){
		var entityGrid = $("#dep-grid").data("kendoGrid");
		entityGrid.addRow();
		$scope.noChangesMade = false;
		$scope.madeChangesToBeUpdated = true;		
	};

	$scope.saveDepartment = function (){
		var entityGrid = $("#dep-grid").data("kendoGrid");	
		entityGrid.saveChanges();
		$scope.selectedDepartment = null;
		$scope.madeChangesToBeUpdated = false;	
	};	

	$scope.updateDepartment = function() {
		var entityGrid = $("#dep-grid").data("kendoGrid");
		entityGrid.editRow(entityGrid.select()[0]);
		$scope.noChangesMade = false;
		$scope.madeChangesToBeUpdated = true;		
	};

	$scope.deleteDepartment = function(){
		var entityGrid = $("#dep-grid").data("kendoGrid");		
		entityGrid.removeRow(entityGrid.select()[0]);
		$scope.selectedDepartment = null;
		$scope.noChangesMade = false;		
	};

	var depatmentsDataSource = new kendo.data.DataSource({
		batch: true,
		pageSize: 15,
		transport: {
			read: function(e){
				departmentService.getDepartments(e)
					.then(function successCallback(response) {
			            console.log(response.data)
			            for (var i = 0; i < response.data.length; i++) {
			                if (response.data[i].manager != null) {
			                    response.data[i].head = response.data[i].manager.id;
			                }
			            }
			            e.success(response.data);
			        });
			},
			update: function(e){    
			    departmentService.updateDepartment(e).then(function(response) {
		            e.sucees(response.data);
		        }).catch(function(error) {
		            e.error(error);
		            console.log("error creating emo : ", error);
		        }).then(function(){
			    depatmentsDataSource.read();
			    });
			},
			destroy: function (e) {
			    departmentService.deleteDepartment(e).then(function successCallback(response) {
		            e.sucsess(response.data);
		        }).catch(function(error) {
		            e.error(error);
		        });
			},
			create : function(e){
				departmentService.createDepartment(e).then(function(response) {
		            e.sucees(response.data);
		        }).catch(function(error) {
		            e.error(error);
		            console.log("error creating emo : ", error);
		        }).then(function(){
					depatmentsDataSource.read()
				});
			}
		},
		schema: {
			model: {
				id: "id",
				fields: {					
					id: { editable: false, type: "number" },
					name: {nullable: true},
					head: { type: "number" }
				}
			}
		}
	});

	$scope.gridOptionsMan = {
		editable: "inline",
		saveChanges: function(e) {
    		e.sender.dataSource.read();
  		},	
		selectable: true,
		sortable: true,
		pageable: true,
		filterable: true,
		dataSource: depatmentsDataSource,
		change: function(e) {
		    selectedRows = e.sender.select()
		    if(selectedRows.length > 0){
		    	$scope.selectedDepartment = selectedRows;
		    }else{
		    	$scope.selectedDepartment = null;
		    }
		    $scope.$digest();
		},		
		columns: [
			{ field: "name", title: "Name", width: "120px" }, 
			{ field: "head", title: "Head", width: "120px"}
		]
	};
});