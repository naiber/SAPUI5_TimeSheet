sap.ui.controller("sap.ui.myPlan.views.Login", {
	
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	submitPressed : function(oEvent){
		var user = this.getView().byId("userF").getValue();
		var password = this.getView().byId("passF").getValue();
		console.log("user-->",user,"\tpassword-->",password);
		
		if(user == "admin" && password == "admin"){
			this.getRouter().navTo("plan")
			console.log("ok!")
			
		}else{
			console.log("wrong user and password")
			return
		}
		
		
	}

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zui_plancal.Login
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zui_plancal.Login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zui_plancal.Login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zui_plancal.Login
*/
//	onExit: function() {
//
//	}

});