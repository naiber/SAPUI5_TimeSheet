sap.ui.controller("sap.ui.myPlan.views.Plan", {
	getRouter : function () {
		return sap.ui.core.UIComponent.getRouterFor(this);	
	},
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf view.Plan
	 */

//	onInit: function() {
////	console.log("dentro Plan.controller")
////	console.log("model dentro Plan.controller-->",this.getModel("local"))
//	this.getData()
//	},

//	getData : function(){
//	var oModel = new sap.ui.model.json.JSONModel("model/localData.json");
////	var oTime = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "MM-dd-yyyy"}); 
////	oTime.format(new sap.ui.model.type.Date("09-26-2017"))
////	console.log("oTime",oTime)
//	var myDate = new Date();
//	myDate.setHours(myDate.getHours()+2)
//	console.log("myDate",myDate)
//	oModel.attachRequestCompleted(function(){
//	oModel.getData().startDate = myDate
//	console.log("oModel->",oModel.getData().startDate)
//	$.each(oModel.getData().people, function( index, value ) {
//	console.log("index->",index,"\tvalue->",value)
//	});
//	})
//	},
	onInit: function () {
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
			startDate: this.getMonday(new Date()),
			sortingIds: [{
							id : "P",
							title : "Prove"
						},
						{
							id : "G",
							title : "Gruppi"
						}],
			users : [{
				name : "Mike",
				img : "sap-icon://employee",
				appointments : []
			}
			],
			commit: [ 
					{
						id : "P1",
						title: "Prova 1",
						tentative: false
					},
					{
						id : "P2",
						title: "Prova 2",
						tentative: false
					},
					{
						id : "G1",
						title : "Gruppo 1",
						tentative : false
					},
					{
						id : "G2",
						title : "Gruppo 2",
						tentative : false
					}
					],
			savedCommit : ""
					
				});
		
		this.getView().setModel(oModel);
	},
	
	onAfterRendering : function(){
		
		console.log("dentro onAfterRendering")
	},
	
	startDateChanged : function(){
		console.log("dentro startDateChanged")
	},
	
	viewTimeChange : function(context){
		console.log("dentro viewTimeChange")
		that = this;
		console.log("context",context)
		oSource = context.getSource();
		console.log("oSouce",oSource)
		if(oSource.getProperty("viewKey")=="view30days"){
			console.log("1 mese")
			this.getView().getModel().oData.startDate.setDate(1);
			console.log("Model1M",this.getView().getModel().oData);
		}else if(oSource.getProperty("viewKey")=="view7days"){
			console.log("1 settimana")
			this.getView().getModel().oData.startDate = this.getMonday(new Date());
			console.log("Model1L",this.getView().getModel().oData);
		}else{
			return
		}
		
		this.getView().getModel().refresh(true);
		console.log("fine viewTimeChange")
	},
	
	getMonday : function(d){
		  d = new Date(d);
		  console.log("date today",d)
		  var day = d.getDay();
		  console.log("day",day)
		  var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
		  return new Date(d.setDate(diff));
	},
	
	startTimeWork : function(day){
		var start = new Date(day);
		start.setHours(9);
		start.setMinutes(0);
		start.setSeconds(0);
		return start;
	},
	
	endTimeWork : function(day){
		var end = new Date(day)
		end.setHours(18);
		end.setMinutes(0);
		end.setSeconds(0);
		return end;
	},

	handleAppointmentSelect: function (oEvent) {
		console.log("dentro handleAppointmentSelect")
		console.log("oEvent",oEvent)
		var oAppointment = oEvent.getParameter("appointment");
		console.log("oAppointment from handleAppointmentSelect",oAppointment)

		if (oAppointment) {
			this._handleSingleAppointment(oAppointment);
		} else {
			this._handleGroupAppointments(oEvent);
		}
	},
	
	selectDateView : function(oEvent){
		console.log("dentro selectDateView")
		console.log("oEvent for selectDateView-->",oEvent.oSource);
	},

	handleOkButton: function (oEvent) {
		console.log("dentro handleOkButton")
		console.log("myPopoverFrag",sap.ui.core.Fragment.byId("myPopoverFrag", "startDate"))
		var oFrag =  sap.ui.core.Fragment,
		oStartValue = sap.ui.core.Fragment.byId("myPopoverFrag", "startDate").getDateValue(),
		oEndValue = sap.ui.core.Fragment.byId("myPopoverFrag", "endDate").getDateValue(),
		sInfoValue = sap.ui.core.Fragment.byId("myPopoverFrag", "moreInfo").getValue(),
		sAppointmentPath = this._oDetailsPopover.getBindingContext().sPath;

		this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/start", oStartValue);
		this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/end", oEndValue);
		this._oDetailsPopover.getModel().setProperty(sAppointmentPath + "/info", sInfoValue);
		this._oDetailsPopover.close();
	},

	handleCancelButton: function (oEvent) {
		console.log("dentro handleCancelButton")
		var sAppointmentPath = this._oDetailsPopover.getBindingContext().sPath;
		console.log("sAppointmentPath",sAppointmentPath)
		var temp= this._oDetailsPopover.getModel().getProperty("/users/0/appointments/")
		console.log("temp",temp)
		var index = sAppointmentPath.substring(sAppointmentPath.length-1,sAppointmentPath.length)
		console.log("sAppointmentPath selected index",index)
		temp.splice(index,1)
		console.log("dopo del delete",temp)
		this.getView().getModel().setData("/users/0/appointments/",temp)
		if(this._oDetailsPopover.getModel().getProperty(sAppointmentPath) == "" || this._oDetailsPopover.getModel().getProperty(sAppointmentPath) == null){
			console.log("elemento cancellato")
		}else{
			console.log("elemento non cancellato")
		}
		this.getView().getModel().refresh(true)
//		this.getView().getModel().refresh(true)
//		console.log(this._oDetailsPopover.getModel().getProperty(sAppointmentPath))
		this._oDetailsPopover.close();
	},

	handleAppointmentCreate: function (oEvent) {
		console.log("dentro handleAppointmentCreate")
		var oFrag =  sap.ui.core.Fragment,
		oDateTimePickerStart,
		oDateTimePickerEnd,
		oBeginButton;

		this._createDialog();

		sap.ui.core.Fragment.byId("myFrag", "selectPerson").setSelectedItem(sap.ui.core.Fragment.byId("myFrag", "selectPerson").getItems()[0]);

		oDateTimePickerStart = sap.ui.core.Fragment.byId("myFrag", "startDate");
		oDateTimePickerEnd =  sap.ui.core.Fragment.byId("myFrag", "endDate");
		oBeginButton = this.oNewAppointmentDialog.getBeginButton();

		oDateTimePickerStart.setValue("");
		oDateTimePickerEnd.setValue("");
		oDateTimePickerStart.setValueState("None");
		oDateTimePickerEnd.setValueState("None");

		this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
		this.oNewAppointmentDialog.open();
	},

	handleAppointmentAddWithContext: function (oEvent) {
		console.log("dentro handleAppointmentAddWithContext")
		var oFrag =  sap.ui.core.Fragment,
		currentRow,
		sPersonName,
		oSelect,
		oSelectedItem,
		oSelectedIntervalStart,
		oStartDate,
		oSelectedIntervalEnd,
		oEndDate,
		oDateTimePickerStart,
		oDateTimePickerEnd,
		oBeginButton;

		this._createDialog();

		currentRow = oEvent.getParameter("row");
		if(!currentRow){
			console.log("currentRow is empty")
			return
		}
		
		console.log("items-->",sap.ui.core.Fragment.byId("myFrag","selectPerson"))
		sPersonName = currentRow.getTitle();
		oSelect = this.oNewAppointmentDialog.getContent()[0].getContent()[1];
		console.log("oSelect.getItems()-->",oSelect.getItems())
		oSelectedItem = oSelect.getItems().filter(function(oItem) { return oItem.getText() === sPersonName; })[0];
		console.log("oSelectedItem",oSelectedItem)
		oSelect.setSelectedItem(oSelectedItem);
		

//		oSelectedIntervalStart = oEvent.getParameter("startDate");
		oSelectedIntervalStart = this.startTimeWork(oEvent.getParameter("startDate"));
//		console.log('oFrag-->',oFrag);
//		console.log("sap.ui.getCore().byId('myFrag')-->",sap.ui.getCore().byId('sap.ui.myPlan.views.CreateFrag'))

		oStartDate = sap.ui.core.Fragment.byId("myFrag", "startDate");
		oStartDate.setDateValue(oSelectedIntervalStart);

//		oSelectedIntervalEnd = oEvent.getParameter("endDate");
		oSelectedIntervalEnd = this.endTimeWork(oEvent.getParameter("endDate"));
		oEndDate = sap.ui.core.Fragment.byId("myFrag", "endDate");
		oEndDate.setDateValue(oSelectedIntervalEnd);

		oDateTimePickerStart = sap.ui.core.Fragment.byId("myFrag", "startDate");
		oDateTimePickerEnd =  sap.ui.core.Fragment.byId("myFrag", "endDate");
		oBeginButton = this.oNewAppointmentDialog.getBeginButton();

		oDateTimePickerStart.setValueState("None");
		oDateTimePickerEnd.setValueState("None");

		this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
		this.oNewAppointmentDialog.open();
	},

	_validateDateTimePicker: function (sValue, oDateTimePicker) {
		console.log("dentro _validateDateTimePicker")
		if (sValue === "") {
			oDateTimePicker.setValueState("Error");
		} else {
			oDateTimePicker.setValueState("None");
		}
	},
	
	_validateTitle : function (sValue, oTitle) {
		console.log("dentro _validateTitle")
		if (sValue === "") {
			oTitle.setValueState("Error");
		} else {
			oTitle.setValueState("None");
		}
	},
	
	_validateInfo : function (sValue, oInfo) {
		console.log("dentro _validateInfo")
		if (sValue === "") {
			oInfo.setValueState("Error");
		} else {
			oInfo.setValueState("None");
		}
	},

	updateButtonEnabledState: function (oDateTimePickerStart, oDateTimePickerEnd, oButton) {
		console.log("dentro updateButtonEnabledState")
		var bEnabled = oDateTimePickerStart.getValueState() !== "Error"
						&& oDateTimePickerStart.getValue() !== ""
							&& oDateTimePickerEnd.getValue() !== ""
								&& oDateTimePickerEnd.getValueState() !== "Error";

		oButton.setEnabled(bEnabled );
	},
	
	updateButtonEnabledStateForText: function (oText, oButton) {
		console.log("dentro updateButtonEnabledStateForTitle")
		var bEnabled = oText.getValue() !== "";

		oButton.setEnabled(bEnabled );
	},

	handleDetailsChange: function (oEvent) {
		console.log("dentro handleDetailsChange")
		var oFrag =  sap.ui.core.Fragment,
		oDTPStart = sap.ui.core.Fragment.byId("myPopoverFrag", "startDate"),
		oDTPEnd = sap.ui.core.Fragment.byId("myPopoverFrag", "endDate"),
		oOKButton = sap.ui.core.Fragment.byId("myPopoverFrag", "OKButton");

		this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.oSource);
		this.updateButtonEnabledState(oDTPStart, oDTPEnd, oOKButton);
	},
	
	handleCreateChangeForTitle : function(oEvent){
		console.log("dentro handleCreateChangeForTitle")
		var oFrag =  sap.ui.core.Fragment,
		oTitle = sap.ui.core.Fragment.byId("myFrag","inputTitle"),
		oBeginButton = this.oNewAppointmentDialog.getBeginButton();
		
		this._validateTitle(oEvent.getParameter("value"),oEvent.oSource);
		this.updateButtonEnabledStateForText(oTitle,oBeginButton);
	},
	
	handleCreateChangeForInfo : function(oEvent){
		console.log("dentro handleCreateChangeForInfo")
		var oFrag =  sap.ui.core.Fragment,
		oInfo = sap.ui.core.Fragment.byId("myFrag","moreInfo"),
		oBeginButton = this.oNewAppointmentDialog.getBeginButton();
		
		this._validateInfo(oEvent.getParameter("value"),oEvent.oSource);
		this.updateButtonEnabledStateForText(oInfo,oBeginButton);
	},
	
	handleCreateChange: function (oEvent) {
		console.log("dentro handleCreateChange")
		console.log("oEvent",oEvent.getParameters())
		var oFrag =  sap.ui.core.Fragment,
		oDateTimePickerStart = sap.ui.core.Fragment.byId("myFrag", "startDate"),
		oDateTimePickerEnd = sap.ui.core.Fragment.byId("myFrag", "endDate"),
		oBeginButton = this.oNewAppointmentDialog.getBeginButton();
	
		this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.oSource);
		this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
	},

	_createDialog: function () {
		console.log("dentro _createDialog")
		var fragmentId = this.getView().createId("myFrag");
		
		var oFrag = sap.ui.core.Fragment,
		that = this,
		oSelect,
		oStartDate,
		oEndDate,
		sTitle,
		sInfoResponse,
		oNewAppointment,
		oModel,
		sPath,
		oPersonAppointments;
		

		if (!that.oNewAppointmentDialog) {

			that.oNewAppointmentDialog = new sap.m.Dialog({
				title: 'Inserisci commessa',
				content: [
					sap.ui.xmlfragment("myFrag", "sap.ui.myPlan.views.Create", this)
					],
					beginButton: new sap.m.Button({
						text: 'OK',
						enabled: false,
						press: function () {
							console.log("dentro Create function in beginButton")
							
							oSelect = sap.ui.core.Fragment.byId("myFrag","selectPerson").getSelectedItem();
							console.log("oSelect",oSelect)
							oStartDate = sap.ui.core.Fragment.byId("myFrag", "startDate").getDateValue();
							oEndDate = sap.ui.core.Fragment.byId("myFrag", "endDate").getDateValue();
							sTitle = sap.ui.core.Fragment.byId("myFrag", "inputTitle").getValue();
							sInfoResponse = sap.ui.core.Fragment.byId("myFrag", "moreInfo").getValue();

							if (sap.ui.core.Fragment.byId("myFrag", "startDate").getValueState() !== "Error"
								&& sap.ui.core.Fragment.byId("myFrag", "endDate").getValueState() !== "Error"
									&& sTitle !== "" && sInfoResponse !== "") {

								oNewAppointment = {
										commit : oSelect.getText(),
										start: oStartDate,
										end: oEndDate,
										title: sTitle,
										info: sInfoResponse
								};
								
								oModel = that.getView().getModel();
								sPath = "/users/0/appointments";
								oPersonAppointments = oModel.getProperty(sPath);

								oPersonAppointments.push(oNewAppointment);

								oModel.setProperty(sPath, oPersonAppointments);
								oModel.setProperty("/savedCommit",oSelect.getKey());
								that.oNewAppointmentDialog.close();
							}else{
								console.log("inserisci tutti i campi")
								return
							}
						}
					}),
					endButton: new sap.m.Button({
						text: 'Annulla',
						press: function () {
							that.oNewAppointmentDialog.close();
						}
					})
			});

			that.oNewAppointmentDialog.addStyleClass("sapUiContentPadding");
			this.getView().addDependent(that.oNewAppointmentDialog);

		}
	},

	_handleSingleAppointment: function (oAppointment) {
		console.log("dentro _handleSingleAppointement")
		console.log("model",this.getView().getModel().oData)
		var oFrag =  sap.ui.core.Fragment,
		that = this,
		oAppBC,
		oSelect,
		oSelectedItem,
		oDateTimePickerStart,
		oDateTimePickerEnd,
		oInfoInput,
		oOKButton;

		if (!this._oDetailsPopover) {

			this._oDetailsPopover = sap.ui.xmlfragment("myPopoverFrag", "sap.ui.myPlan.views.Details", this);
			this.getView().addDependent(this._oDetailsPopover);
		}

		// the binding context is needed, because later when the OK button is clicked, the information must be updated
		oAppBC = oAppointment.getBindingContext();
		console.log("oAppBC",oAppBC)

		console.log("oAppointemnt",oAppointment)
		
		this._oDetailsPopover.setBindingContext(oAppBC);
		
		console.log("_oDetailsPopover",this._oDetailsPopover)
		oModel = that.getView().getModel();
		oSelect = sap.ui.core.Fragment.byId("myPopoverFrag","selectCommit").setSelectedKey(oModel.getProperty("/savedCommit"));
		console.log("oSelect",oSelect)
		oDateTimePickerStart = sap.ui.core.Fragment.byId("myPopoverFrag", "startDate");
		oDateTimePickerEnd = sap.ui.core.Fragment.byId("myPopoverFrag", "endDate");
		oInfoInput = sap.ui.core.Fragment.byId("myPopoverFrag", "moreInfo");
		oOKButton = sap.ui.core.Fragment.byId("myPopoverFrag", "OKButton");

		oDateTimePickerStart.setDateValue(oAppointment.getStartDate());
		oDateTimePickerEnd.setDateValue(oAppointment.getEndDate());
		oInfoInput.setValue(oAppointment.getText());

		oDateTimePickerStart.setValueState("None");
		oDateTimePickerEnd.setValueState("None");

		this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oOKButton);
		this._oDetailsPopover.openBy(oAppointment);
	},

	_handleGroupAppointments: function (oEvent) {
		console.log("dentro _handleGroupAppintemts")
		var aAppointments,
		sGroupAppointmentType,
		sGroupPopoverValue,
		sGroupAppDomRefId,
		bTypeDiffer;

		aAppointments = oEvent.getParameter("appointments");
		sGroupAppointmentType = aAppointments[0].getType();
		sGroupAppDomRefId = oEvent.getParameter("domRefId");
		bTypeDiffer = aAppointments.some(function (oAppointment) {
			return sGroupAppointmentType !== oAppointment.getType();
		});

		if (bTypeDiffer) {
			sGroupPopoverValue = aAppointments.length + " Appointments of different types selected";
		} else {
			sGroupPopoverValue = aAppointments.length + " Appointments of the same " + sGroupAppointmentType + " selected";
		}

		if (!this._oGroupPopover) {
			this._oGroupPopover = new Popover({
				title: "Group Appointments",
				content: new Label({
					text: sGroupPopoverValue
				})
			});
		} else {
			this._oGroupPopover.getContent()[0].setText(sGroupPopoverValue);
		}
		this._oGroupPopover.addStyleClass("sapUiPopupWithPadding");
		this._oGroupPopover.openBy(document.getElementById(sGroupAppDomRefId));
	}
});

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
 * (NOT before the first rendering! onInit() is used for that one!).
 * @memberOf view.Plan
 */
//onBeforeRendering: function() {

//},

/**
 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
 * This hook is the same one that SAPUI5 controls get after being rendered.
 * @memberOf view.Plan
 */
//onAfterRendering: function() {

//},

/**
 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
 * @memberOf view.Plan
 */
//onExit: function() {

//}

//});