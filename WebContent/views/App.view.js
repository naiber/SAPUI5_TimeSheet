sap.ui.jsview("sap.ui.myPlan.views.App", {

	getControllerName: function () {
		return "sap.ui.myPlan.views.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App("App");
		this.app.setHeight("")
		// load the master page
		var plan = sap.ui.xmlview("Login", "sap.ui.myPlan.views.Login");
		plan.getController().nav = this.getController();
		this.app.addPage(plan, true);
		
		// done
		return this.app;
	}
});
//# sourceURL=http://localhost:8080/ZUI_PlanCal/views/App.view.js