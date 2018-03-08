myApp.controller('myCtrl',function ($scope, $http, $mdDialog, $mdToast, sharedDataService, httpService) {
	$scope.click = { 
		newUpdateEmp : "",
		newUpdateMan : ""
	};
	
	$scope.showDeleteToast = function() {
		if($scope.employee.selected){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toast.html',
			  controller  : 'toastCtrl',
			  toastClass : "normal"
			});
		}else{
			$scope.errorToast("Please Select An Employee!")

	    }
	};

	$scope.errorToast = function(message){
		$mdToast.show($mdToast.simple({
			hideDelay: 500,
			position: 'top right',
			content: message,
			toastClass: 'error'
		  }))
	};
	$scope.updateToast = function(){
		console.log("inside update", $scope.employee.selected)
		if(!$scope.employee.selected){
			$scope.errorToast("Please Select An Employee!");
			$scope.click.newUpdateEmp = false;
			console.log("inside update", $scope.employee.selected);
		}
	};
	$scope.updatToastMan = function(){
		if(!$scope.managment.selectedMan){
			$scope.errorToast("Please Select A Department!");
			$scope.click.newUpdateMan = false;
		}
	}
	$scope.showDeleteToastMan = function() {
		if($scope.managment.selectedMan){
			$mdToast.show({
			  hideDelay   : false,
			  position : "top right",
			  templateUrl : './toastMan.html',
			  controller  : 'toastCtrl',
			  toastClass : "normal"
			});
		}else{
			$scope.errorToast("Please Select A Department!")

	  }
	};

    $scope.onChange = function(data){
		console.log(data)
		$scope.employee.selected = data;
		sharedDataService.employee = $scope.employee;
		$scope.emp = data;
		console.log("change works and selected is",$scope.employee.selected )
	};


	$scope.empl = {id: 1,
		name: "change", dep_id: 2,
		sal: 1, birthDate: "1/2/2018",
		hireDate:"1/2/2018",
		mgr_id : 2
	};

	$scope.addedEmployee = {id: 1,
		name: "change", dep_id: 2,
		sal: 1, birthDate: "2018-04-04",
		hireDate:"2018-04-04",
		mgr_id : 2
	};   
	
	$scope.emplo = {
		name: "change", 
		dep_id: 1,
		id : 14,
		sal: 1,
		birthDate: "1/2/2018",
		hireDate:"1/2/2018",
		mgr_id : 2
	}

	$scope.workers = new kendo.data.DataSource({
		autoSync: true,
		batch : true,
		pageSize: 5,
		transport : {
			read : function (e) {
				httpService.getEmployees(e)
			}
		},
		schema : {
			data : function (response) {
				return response
			},
			errors : "error",
			model : {
				id : "id",
				fields : {
					id : {
						type : "number",
						validation : {required : true, min : 0}
					},
					name : {
						validation : {required : true}
					},
					dep_id : {
						type : "number",
						validation : {required : true, min : 0}
					},
					sal : {
						type : "number",
						validation : {required : true, min : 0}
					},
					birthDate : {
						type : "Date",
						validation : {required : true}
					},
					hireDate : {
						type : "Date",
						validation : {required : true}
					},
					mgr_id : {
						type : "number",
						validation : {required : true, min : 0}
					}
				}
			}
		},
		error : function (e) {
			console.log(e.errors);
		}
	});
	  
	$scope.onChangeMan = function(data){
		console.log(data);
		$scope.managment.selectedMan = data;
		sharedDataService.managment = $scope.managment;
		$scope.dep = data;
		console.log(sharedDataService.managment) 
	};

	$scope.update = function(emplo){
		console.log("inside update employeee",emplo)
		if(emplo === undefined || emplo.id === undefined || emplo.name === undefined || emplo.dep_id=== undefined || emplo.sal=== undefined || emplo.birthDate === undefined || emplo.hireDate === undefined || emplo.mgr_id=== undefined){
			console.log("one of these values is null :  ",emplo)
			$scope.errorToast("Please Enter All Fields!")
			$scope.employee.selected = false;
			return;
		}else{
			emplo.birthDate = "2010-02-02";
			emplo.hireDate = "2010-03-03"
			httpService.updateEmployee(emplo)
			$scope.employee.selected = false;
			$scope.successToast("Employee Updated!")
		}
	};

	$scope.updateMan = function(depa){
		console.log(depa)
		if(depa.id === undefined){
			console.log("inside if")
			$scope.errorToast("Please Enter Id!")
			$scope.managment.selectedMan = false;
		}else{
			console.log("-----------",depa)
			depa.manager = depa.head
			console.log("-----------",depa)
			delete depa.head;
			httpService.updateDepartment(depa);
			$scope.managment.selectedMan = false;
			$scope.successToast("Department Updated!");
		}
	};

	$scope.depatments = new kendo.data.DataSource({
		autoSync: true,
		batch : true,
		pageSize: 5,
		transport : {
			read : function (e) {
				httpService.getDepartments(e)
			}
		},
		schema : {
			data : function (response) {
				return response
			},
			errors : "error",
			model : {
				id : "id",
				fields : {
					name : {
						validation : {required : true}
					},
					head : {
						validation : {required : true}
					}
				}
			}
		}	
	});

	sharedDataService.depatments = $scope.depatments
	$scope.workers.fetch(function() {
		var view = $scope.workers.view();
	});

	sharedDataService.workers  = $scope.workers;
	$scope.dropDataSourceDep = {
		data : [{depName : "Department one",
				 depID : 1},
				 {
				 depName : "Department two",
				 depID : 2
				 },{				 
				 depName : "Department three",
				 depID : 3},{
				 depName : "Department four",
				 depID : 4
				 }]
	};

	$scope.dropDataSourceMgr = {
		data : [{mgrName : "husam",
				 mgrID : 1},
				 {
				 mgrName : "badr",
				 mgrID : 2
				 },{				 
				 mgrName : "salam",
				 mgrID : 3},{
				 mgrName : "osama",
				 mgrID : 4
				 }]
	};

	$scope.employee = {
        id: null,
        newUpdate : false
     };
     $scope.managment = {
        id: null,
        newUpdate : false
	 };
	$scope.depFilter = function(element) {
		element.kendoDropDownList({
			dataSource : $scope.dropDataSourceDep.data.map(function(item,index){
				return item.depID;
			})
          });
	};
	$scope.mgrFilter = function(element) {
		element.kendoDropDownList({
			dataSource : $scope.dropDataSourceMgr.data.map(function(item,index){
				return item.mgrID;
			})
          });
	};
	$scope.gridOptionsEmp = {
      sortable: true,
      selectable: true,
	  editable: "inline",
	  pageable: true,
	  filterable : true,
	  dataSource : $scope.workers,
      columns: [{
	        field: "id",
	        title: "id",
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		  	},
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>'
	        },{
			field: "name",
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
			title: "Name",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
	        width: "120px"
	        },{
			field: "dep_id",
			valuePrimitive: true,
			headerTemplate: 'Department ID <span class="k-icon k-i-kpi"></span>',
	        title: "Department Id",
			width: "120px",
			filterable: {
				extra : false,
				ui : $scope.depFilter
			}
	        },{
			field: "sal",
			headerTemplate: 'Salary <span class="k-icon k-i-kpi"></span>',
			title: "Salary",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
	        width: "120px"
	    	},{
			field: "birthDate",
			headerTemplate: 'Birth Date <span class="k-icon k-i-kpi"></span>',
	        title: "Birth Date",
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			format: "{yyyy//MM/dd}"
	        },{
	        field: "hireDate",
			title: "Hire Date",
			headerTemplate: 'Hire Date <span class="k-icon k-i-kpi"></span>',
			width: "120px",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			format: "{yyyy//MM/dd}"
	    	},{
	        field: "mgr_id",
			title: "Manager ID",
			headerTemplate: 'Manager ID <span class="k-icon k-i-kpi"></span>',
			width: "120px",
			filterable: {
				extra : false,
				ui : $scope.mgrFilter
			}
	    }],
    };

 	$scope.gridOptionsMan = {
      sortable: true,
	  selectable : true,
	  editable: "inline",
	  pageable: true,
	  filterable: true,
      dataSource : $scope.depatments,
      columns:  [{
	        field: "id",
			title: "id",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'ID <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "name",
			title: "Name",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'Name <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	        },{
	        field: "head",
			title: "Head",
			filterable: {mode : "row",
			extra : false,
			operators: {
				string: {
				  startswith: "Starts with",
				  eq: "Is equal to",
				  neq: "Is not equal to"
				}
			}
		    },
			headerTemplate: 'Head <span class="k-icon k-i-kpi"></span>',
	        width: "120px"
	    }]	
	};
	$scope.checkIfUpdate = function(){
		if($scope.click.newUpdateEmp){
			$scope.click.newUpdateEmp = false;
		}
	}
	$scope.checkIfAdd  =  function(){
		console.log($scope.click.newEntity)
		if($scope.click.newEntity){
			$scope.click.newEntity = false;
		}
	}
	
	$scope.addEmp = function (addedEmployee) {
		
		if( addedEmployee.name === undefined || addedEmployee.dep_id=== undefined || addedEmployee.sal=== undefined || addedEmployee.birthDate=== undefined || addedEmployee.hireDate=== undefined || addedEmployee.mgr_id=== undefined){
		$scope.errorToast("Please Fill All Fields!")
		}else{
			console.log(addedEmployee)
			addedEmployee.dep_id = addedEmployee.dep_id.depID;
			addedEmployee.mgr_id = addedEmployee.mgr_id.mgrID;
			console.log(addedEmployee)
			delete addedEmployee.id;
			httpService.createEmployee(addedEmployee);
			$scope.successToast("Successfully Added An Employee!");
		}
	};
	$scope.addDep = function (departmentAdd) {
		console.log("add departmentAddartment wworks", departmentAdd, departmentAdd.name === undefined, $scope.depatments.data())
		if(departmentAdd.name === undefined || departmentAdd.head === undefined){
		console.log("detected")
		$scope.errorToast("Please Enter All Fields!")
		}else{
			delete departmentAdd.id;
			httpService.createDepartment(departmentAdd);
			$scope.successToast("Successfully Added A Department!")
		}

	};
	$scope.successToast = function(message){
		$mdToast.show($mdToast.simple({
			hideDelay: 500,
			position: 'top right',
			content: message,
			toastClass: 'success'			
		}))
	};
	$scope.updateEmp = function (data) {
		console.log(data)
		$scope.selected = data;
	};

})





