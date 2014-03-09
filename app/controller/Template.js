Ext.define('signME.controller.Template', {
    extend: 'Ext.app.Controller',

    stores: [
        'Template',
    ],
    views: [
        'Template',
    ],
    init: function() {
        this.control({
			"actioncolumn[id=previewTemplate]": {
                click: this.onAction
            },
			
			"button[id=createRequestButton]": {
                click: this.onCreateRequestClick
            },
			
			"button[id=saveRequestButton]": {
                click: this.onSaveRequestClick
            },
			
			"button[id=closeButton]": {
                click: this.onCloseClick
            },
			
			"panel[id=templateView]": {
                select: this.onSelect
            },
        });
    },


	onAction: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		Ext.Msg.alert('', 'Forma template-ului este urmatoarea:\n\n' + record.get('bodyHTML'));
	},
	
	onCreateRequestClick: function() {
		var templatesView = Ext.getCmp('templateView');
		var recordTask = templatesView.getSelectionModel().getSelection();	
		if (recordTask.length == 1) {
			var bodyHTML = recordTask[0].data.bodyHTML;
			//bodyHTML = bodyHTML.substr(0, bodyHTML.indexOf('Semnatura'));
			
			var tinyCfg1 = {
				// General options
				theme : "advanced",
				
				skin: "extjs",
				inlinepopups_skin: "extjs",
				
				// Original value is 23, hard coded.
				// with 23 the editor calculates the height wrong.
				// With these settings, you can do the fine tuning of the height
				// by the initialization.
				theme_advanced_row_height: 27,
				delta_height: 1,
				
				schema: "html5",
				
				// Example content CSS (should be your site CSS)
				content_css : "resources/css/contents.css"
			};
			
			Ext.create('Ext.window.Window', {
				id: 'newRequestWindow',
				height:600,
				width:810,
				modal:true,
				title:'Introdu detalii document',
				layout:'fit',
				requires:['Ext.form.Panel', 'Ext.form.field.Text'],
				autoShow:true,
				resizable:true,
				draggable:true,
				bodyStyle: 'background-color: white',
				
				items: [
					{
						xtype: 'form',
						flex:1,
						border:false,
						layout:{
							columns:1,
							type:'table'
						},
						items: [
						{
							xtype:'container',
							padding:'5',
							layout:'anchor',
							items:[
								{
									xtype:'textareafield',
									height: 30,
									name:'docName',
									grow: true,
									fieldLabel:'Denumire document:',
									allowBlank:false
								}
							]
						},
						{
							height: 300,
							width: 800,
							xtype: 'tinymce_textarea',
							fieldStyle: 'font-family: Courier New; font-size: 12px;',
							
							noWysiwyg: false,
							tinyMCEConfig: tinyCfg1,
							value: bodyHTML,
							name: 'requestContent',
						},
						{
							xtype:'container',
							padding: '5',
							items:[
								{
									xtype:'datefield',
									format: 'Y-m-d',
									name:'estimatedFinishDate',
									fieldLabel:'Data estimata de finalizare:',
									allowBlank:false
								}
							]
						},
						{
							xtype: 'fileuploadfield',
							id: 'filedata',
							padding: '5',
							emptyText: 'Select a document to upload...',
							fieldLabel: 'File',
							buttonText: 'Browse',
						},
						{
							id: 'managersDropdown',
							xtype: 'container',
							padding: '5',
						},
						],
					}
				],
				dockedItems: [
					{
						xtype:'toolbar',
						dock:'bottom',
						id:'buttons',
						ui:'footer',
						items:['->', 
						{
							id: 'saveRequestButton',
							iconCls:'icon-save',
							itemId:'save',
							scale:'medium',
							text:'Initiaza',
							action:'save',
						}, 
						{
							id: 'closeButton',
							iconCls:'icon-reset',
							text:'Cancel',
							scale:'medium',
							scope:this,
						}]
					}
				]
			}).show();
			
			var flowStore = Ext.create('signME.store.Flow');
			flowStore.load(function(records, operation, success) {
				//var flow = this.findRecord("previousState", recordTask[0].data.templateKey);
				var flow = this.findRecord("flowKey", recordTask[0].data.flow);
				var node;
				for (var i=0; i<flow.data.nodes.length; i++){
					if (flow.data.nodes[i].previousState == recordTask[0].data.templateKey){
						node = flow.data.nodes[i];
						break;
					}
				}
				
				//ca sa il verifica ca nu mi-a sters
				//nrPlaceholdere = flow.data.nodes.length + 1
                            var lastIndex = 0; 
                            nrPlaceholdere = 0;
                            while(lastIndex != -1){
			         lastIndex = bodyHTML.indexOf("{semnatura_",lastIndex);
			         if ( lastIndex != -1){ 
					nrPlaceholdere = nrPlaceholdere + 1; 
					lastIndex += "{semnatura_".length;
			         }
		              }
				
				if (node.assignee == 'departament')
				{
					//Daca am in flux, definit un departament, altfel, caut dupa departamentul user-ului
					var dpt;
					if (typeof node.assigneeKey !== "undefined") { dpt = node.assigneeKey; }
					else { dpt = user.data.departament; }
					Ext.Ajax.request({
						url: 'http://localhost/couch/signme/_design/users/_view/manager?key="' + dpt + '"',
						async: false,
						success: function(response) {
							var json = JSON.parse(response.responseText);
							if (json.rows.length > 1)
							{
								// daca sunt mai multi sefi pe departament afisez un dropdown cu toti sefii
								var managers = [];
								for (var i=0; i<json.rows.length; i++)
									managers.push({'username': json.rows[i].value.username, 'name': json.rows[i].value.nume + ' ' + json.rows[i].value.prenume});

								var managersStore = Ext.create('Ext.data.Store', {
									fields: ['username', 'name'],
									data : managers
								});
								
								var dropdown = Ext.getCmp('managersDropdown');
								dropdown.add(Ext.create('Ext.form.ComboBox', {
									id: 'managersComboBox',
									labelWidth: 220,
									fieldLabel: 'S-au gasit mai multi sefi in departamentul tinta. Alegeti unul',
									queryMode: 'local',
									displayField: 'name',
									valueField: 'username',
									store: managersStore,
									value: managersStore.data.items[0],
								}));
							}
						}
					});
				}
			});
			
		} else {
			Ext.Msg.alert('Eroare initiere document', 'Selectati cel putin un element');
		};
	},

	onSaveRequestClick: function() {
		//Disable pe butonul initiere
		Ext.getCmp('saveRequestButton').disable();
		
		var newRecord = Ext.create('signME.model.Document');
		var d1=new Date();
		var templatesView = Ext.getCmp('templateView');
		var request = Ext.getCmp('newRequestWindow');

		//template
		var template = templatesView.getSelectionModel().getSelection()[0];
		
		//flow
		var flowStore = Ext.create('signME.store.Flow');
			
		//campuri din formular default
		var currentBody = request.down('form').getForm().findField('requestContent').getValue();
		var lastIndex = 0, count =0;
		while(lastIndex != -1){
			   lastIndex = currentBody.indexOf("{semnatura_",lastIndex);
			   if ( lastIndex != -1){ 
					count ++; 
					lastIndex += "{semnatura_".length;
			   }
		}
		if (count < nrPlaceholdere) {
			Ext.getCmp('saveRequestButton').enable();
			Ext.Msg.alert('Eroare salvare', 'Ati sters un placeholder de forma {semnatura_...}');
		} else {
			currentBody = currentBody.replace('{semnatura_solicitant}','<img src=\"../'+user.data.semnatura+'\"/ width="100" height="70">');
			
			newRecord.data.estimatedFinishDate = request.down('form').getForm().findField('estimatedFinishDate').getValue();
			newRecord.data.docName = request.down('form').getForm().findField('docName').getValue();
			newRecord.data.docName = newRecord.data.docName.trim().replace(/\s/g, "_");
			//Adaug un timestamp in denumire,pentru unicitate
			newRecord.data.docName = newRecord.data.docName.concat("_"+Ext.Date.format(d1, 'YmdHis'));
			
			//campuri default din structura obiectului
			newRecord.data.startDate = Ext.Date.format(d1, 'Y-m-d');
			newRecord.data.storage_type = "docStore";
			newRecord.data.docStatus = "in_progress";
			newRecord.data.isPrelucrat = false;
			newRecord.data.template = template.data;
			newRecord.data.authorName = user.data.nume + " " + user.data.prenume;
			newRecord.data.authorKey = user.data.username;
			
			//bodyHTML														
			newRecord.data.bodyHTML = currentBody;// + semnatura;
			
			//campuri din flux
			flowStore.load(function(records, operation, success) {
				//var flow = this.findRecord("previousState", template.data.templateKey);
				var flow = this.findRecord("flowKey", template.data.flow);
				var node;
				for (var i=0; i<flow.data.nodes.length; i++){
					if (flow.data.nodes[i].previousState == template.data.templateKey){
						node = flow.data.nodes[i];
						break;
					}
				}
				//Daca sunt manager, si pas 2 e semntura manager, fac ceva in privinta aceasta
				if (user.data.isManager){
					if (node.assignee == "departament" && typeof node.assigneeKey === "undefined"){
						currentBody = currentBody.replace(node.signaturePlaceholder, "");
						newRecord.data.bodyHTML = currentBody;
						for (var i=0; i<flow.data.nodes.length; i++){
							if (flow.data.nodes[i].previousState == node.nodeId){
								node = flow.data.nodes[i];
								break;
							}
						}
					}
				}
				newRecord.data.currentStateKey = node.nodeId;
				newRecord.data.currentStateName = node.nodeName;
				
				// vedem daca assignee e un user sau un departament
				// in cazul in care e departament, se trimite requestul la sef
				// in cazul in care sunt mai multi sefi, userul care face requestul
				// are posibilitatea sa aleaga cui sa trimita requestul
				var requestError = false;
				if (node.assignee == 'user')
				{
					newRecord.data.asigneeKey = node.assigneeKey;
					newRecord.data.asigneeName = node.assigneeName;
				}
				else
				{
					//Daca am in flux, definit un departament, altfel, caut dupa departamentul user-ului
					var dpt;
					if (typeof node.assigneeKey !== "undefined") { dpt = node.assigneeKey; }
					else { dpt = user.data.departament; }
					Ext.Ajax.request({
						url: 'http://localhost/couch/signme/_design/users/_view/manager?key="' +  dpt + '"',
						async: false,
						success: function(response) {
							var json = JSON.parse(response.responseText);
							if (json.rows.length == 1)
							{
								newRecord.data.asigneeKey = json.rows[0].value.username;
								newRecord.data.asigneeName = json.rows[0].value.nume + ' ' + json.rows[0].value.prenume;
							}
							else if (json.rows.length > 1)
							{
								// iau valoarea din dropdownul sefilor	
								var selected = Ext.getCmp('managersComboBox').findRecordByValue(Ext.getCmp('managersComboBox').getValue());
								
								newRecord.data.asigneeKey = selected.data.username;
								newRecord.data.asigneeName = selected.data.name;
							}
							else
							{
								Ext.getCmp('saveRequestButton').enable();
								// niciun sef pus pe departament. eroare
								Ext.Msg.alert('Eroare initiere document', 'Nu a fost gasit niciun manager pe departamentul ' + dpt + '.');
								requestError = true;
							}
						}
					});
				}
				
				if (requestError)
				{
					Ext.getCmp('saveRequestButton').enable();
					request.close();
					return;
				}
				
				//audit
				var actiuni = {}; //Fac un obiect in care imi salvez modificarile asupra documentului, fiecare set pe cheia current state
				actiuni["create"] = {"timestamp":d1.toString(),"user":user.data.username, "bodyHTML": currentBody}; //primul pas e pe cheia create
				newRecord.data.actiuni = actiuni;
				
				// file upload
				var form = request.down('form').getForm();
				
				var img = form.findField('filedata').fileInputEl.dom.files[0];
				//functie replace
                            
				if (img) // daca exista un atasament, il atasam la document
				{
					if (form.isValid())
						form.submit({
							url: 'php/upload.php',
							success: function(form, action) {
								var attachments = {};
								action.result.name = action.result.name.trim().replace(/\s/g, "_");
								attachments[action.result.name] = {"content_type": action.result.type, "data": action.result.data};
								newRecord.data._attachments = attachments;
								
								var requestStatusStore = Ext.getCmp('requestStatusView').getStore();
								requestStatusStore.add(newRecord.data);
								requestStatusStore.commitChanges();
								requestStatusStore.sync();
								requestStatusStore.reload();
								
								//trimit si un mail la misto asa
								Ext.Ajax.request({
									url: 'http://localhost/couch/signme/_design/users/_view/all?key="' + newRecord.data.asigneeKey + '"',
									async: false,
									success: function(response) {
										var json = JSON.parse(response.responseText);
										if (json.rows.length == 1)
										{
											Ext.Ajax.request({
												url: '/signME/php/sendmail.php?tipMail=task&recipient='+json.rows[0].value.mail,
												success: function() { Ext.Msg.alert('', newRecord.data.asigneeName + ' a fost notificat!'); },
												failure: function() { Ext.getCmp('saveRequestButton').enable(); Ext.Msg.alert('Eroare', 'Eroare la transmiterea mesajului'); },
												//jsonData: Ext.util.JSON.encode(dataObj)
											});
										}
									}
								});
								
								request.close();
							},
							failure: function(form, action) {
								Ext.getCmp('saveRequestButton').enable();
								request.close();
								Ext.Msg.alert('Fail', 'Failed - fisierul nu a putut fi uploadat.');
							}
						});
				}
				else // daca nu e niciun atasament, salveaza normal
				{
					var requestStatusStore = Ext.getCmp('requestStatusView').getStore();
					requestStatusStore.add(newRecord.data);
					requestStatusStore.commitChanges();
					requestStatusStore.sync();
					requestStatusStore.reload();
					
					request.close();
					
					//trimit si un mail la misto asa
					Ext.Ajax.request({
						url: 'http://localhost/couch/signme/_design/users/_view/all?key="' + newRecord.data.asigneeKey + '"',
						async: false,
						success: function(response) {
							var json = JSON.parse(response.responseText);
							if (json.rows.length == 1)
							{
								Ext.Ajax.request({
									url: '/signME/php/sendmail.php?tipMail=task&recipient='+json.rows[0].value.mail,
									success: function() { Ext.Msg.alert('', newRecord.data.asigneeName + ' a fost notificat!'); },
									failure: function() { Ext.getCmp('saveRequestButton').enable(); Ext.Msg.alert('Eroare', 'Eroare la transmiterea mesajului'); },
									//jsonData: Ext.util.JSON.encode(dataObj)
								});
							}
						}
					});
					
				}

			});
		}
	},
	
	onCloseClick: function() {
		var request = Ext.getCmp('newRequestWindow');
		request.close();
	},

	onSelect: function() {
		var templatesView = Ext.getCmp('templateView');
		var currentTaskView = Ext.getCmp('currentTaskView');
		var denyListener = templatesView.getSelectionModel().getSelection();

		if (denyListener.length == 1) {
			currentTaskView.getDockedItems()[1].items.items[1].setVisible(true);
		} else {
			currentTaskView.getDockedItems()[1].items.items[1].setVisible(false);
		}
	},

});
