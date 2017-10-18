jQuery.sap.declare("sap.ui.myPlan.Component");

sap.ui.core.UIComponent.extend("sap.ui.myPlan.Component", {
	metadata : {
		
		rootView: 
        {
          viewName: "sap.ui.myPlan.views.Plan",
          type: "XML",
          id: "plan"
        },
		
		routing : {
			config : {
				routerClass: "sap.m.routing.Router",
				viewType : "XML",
				viewPath : "sap.ui.myPlan.views",
				controlId : "App",
				controlAggregation: "App",
				clearTarget : false,
			},
			routes : [
//				{
//					pattern : "", // which appears in URL, while you navigate
//					name : "master",     // Name that is used in navTo method
//					view : "Master",   // this is the target view that you are navigating to
//					viewPath : "views",
//					// path of the target view
//						
//				},
				{
					pattern : "Planning", // which appears in URL, while you navigate
					name : "plan",     // Name that is used in navTo method
					view : "Plan",   // this is the target view that you are navigating to
					viewPath : "views"
					// path of the target view
				},
				{
					pattern : "Login",
					name : "login",
					view : "Login",
					viewPath : "views"
				}
//				{
//					pattern : "master", // which appears in URL, while you navigate
//					name : "master",     // Name that is used in navTo method
//					view : "MasterPage",   // this is the target view that you are navigating to
//					viewPath : "view", // path of the target view
//					targetAggregation : "pages" // this defines whether the target view is a [pages/content/masterpages/detailpages]
//				},
//				{
//					pattern : "detail", // which appears in URL, while you navigate
//					name : "detail",     // Name that is used in navTo method
//					view : "DetailPage",   // this is the target view that you are navigating to
//					viewPath : "view", // path of the target view
//					targetAggregation : "pages" // this defines whether the target view is a [pages/content/masterpages/detailpages]
//				}
			]
		},
		resources : {
			css : [
				{
					uri : "css/myStle.css"
				}
			]
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