jQuery.sap.declare("sap.ui.myPlan.Component");

sap.ui.core.UIComponent.extend("sap.ui.myPlan.Component", {
	metadata : {
		
		"rootView": 
        {
          "viewName": "sap.ui.myPlan.views.Login",
          "type": "XML",
          "id": "Login"
        },
		
		"routing" : {
			"config" : {
				"routerClass": "sap.m.routing.Router",
				"viewType" : "XML",
				"viewPath" : "sap.ui.myPlan.views",
				"controlId" : "App",
				"controlAggregation": "pages"
			},
			"routes" : [
				{
					"pattern" : "Planning", 
					"name" : "plan",
					"view" : "Plan",
					"target" : "plan"
				},
				{
					"pattern" : "",
					"name" : "login",
					"view" : "Login",
					"target" : "login"
				}
			],
			"targets" : {
				"plan" : {
					"viewName" : "Plan"
				},
				"login": {
					"viewName" : "Login"
				}
			}
		}
	},
	
	init : function(){
		// call the init function of the parent
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);	// calling parent UIComponents

        // create the views based on the url/hash
        this.getRouter().initialize();						// initializing router
	},
//	init : function () {
//		// 1. some very generic requires
//		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
//		jQuery.sap.require("sap.ui.demo.myFiori.MyRouter");
//		// 2. call overridden init (calls createContent)
//		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
//		// 3a. monkey patch the router
//		var router = this.getRouter();
//		router.myNavBack = sap.ui.demo.myFiori.MyRouter.myNavBack;
//		// 4. initialize the router
//		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
//		router.initialize();
//	},
	createContent : function() {
		// create root view (Contenitore di tutte le views)
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.myPlan.views.App",
			type : "JS",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);
		
		//set i18n model (proprietà delle view come testo degli header , bottoni ....)
		var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel,"i18n");
		
		// Using a local model for offline development(modello locale di dati in formato json)
//		var oModel = new sap.ui.model.json.JSONModel("model/localData.json");
//		oView.setModel(oModel,"local");
		
		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? sap.m.ListMode.None : sap.m.ListMode.SingleSelectMaster,
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel,"device");

		// done (ritorna l'intero contenitore oView con tutte le proprietà settate appena sopra)
		return oView;
	}
});