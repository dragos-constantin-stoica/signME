Ext.define('signME.controller.CurrentTask', {
    extend: 'Ext.app.Controller',

    stores: [
        'CurrentTask',
    ],
    views: [
        'CurrentTask',
    ],
    init: function() {
        this.control({
			"actioncolumn[id=previewDoc]": {
                click: this.onPreview
            },
			
			"actioncolumn[id=viewAttach]": {
                click: this.onAttach
            },
			
			"actioncolumn[id=viewObsC]": {
                click: this.onViewObs
            },
			
			"button[id=signButton]": {
                click: this.onSignClick
            },
			
			"button[id=signAndMessageButton]": {
                click: this.onSignAndMessageClick
            },
			
			"button[id=saveMessageButton]": {
                click: this.onSaveMessageClick
            },
			
			"button[id=cancelMessageButton]": {
                click: this.onCancelMessageClick
            },
			
			"button[id=rejectButton]": {
                click: this.onRejectClick
            },
			
			"button[id=saveRejectButton]": {
                click: this.onSaveRejectClick
            },
			
			"button[id=cancelRejectButton]": {
                click: this.onCancelRejectClick
            },
			
			"panel[id=currentTaskView]": {
                select: this.onSelect
            },
        });
			
		
		var store = Ext.create('signME.store.CurrentTask');
    },

	
	onViewObs: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		Ext.create('Ext.window.Window', {
			height:400,
			width:400,
			modal:true,
			title:'Observatii complete',
			layout:'fit',
			requires:['Ext.form.Panel', 'Ext.form.field.Text'],
			autoShow:true,
			draggable:true,
			resizable:true,
			padding: 10,
			autoScroll:true,
			bodyStyle: 'background-color: white; padding: 10; word-wrap: break-word;',
			
			html: '<div style="white-space:normal !important;">'+ record.get('observatii') +'</div>'
		});
	},
	
	onPreview: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		Ext.create('Ext.window.Window', {
			height:600,
			width:500,
			modal:true,
			title:'Documentul in forma partiala',
			layout:'fit',
			requires:['Ext.form.Panel', 'Ext.form.field.Text'],
			autoShow:true,
			draggable:true,
			resizable:true,
			autoScroll:true,
			padding: 10,
			bodyStyle: 'background-color: white; padding: 10;',
			
			html: record.get('bodyHTML').replace('../data/signatures','data/signatures'),
		});
	},
	
	onAttach: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		for (item in record.data._attachments)
			window.open('http://localhost/couch/signme/' + record.data._id + '/' + item);
	},
	
	onSignClick: function(isMessage) {
		var authorList = []; // folosit pt functia de semnare cu observatii
		var sendmailUser = "";
		
		var currentTaskView = Ext.getCmp('currentTaskView');
		var recordTask = currentTaskView.getSelectionModel().getSelection();
		if (recordTask.length >= 1) {
		
			var flowStore = Ext.create('signME.store.Flow');
			flowStore.load(function(records, operation, success) {
		
				var currentTaskStore = currentTaskView.getStore();
				
				var failed_docs = [];
											
				for (var i=0; i<recordTask.length; i++){	
					var requestError = false;
					var doc = recordTask[i];
					var d1 = new Date();
					
					var returnobj = new Object();
					returnobj.doc = doc.data.docName;
					
					//campuri default din structura obiectului
					doc.beginEdit();
					doc.set('endDate', Ext.Date.format(d1, 'Y-m-d'));
					
					//bodyHTML	
					var semnatar = user.data.nume + " " + user.data.prenume;
					var semnaturaURL = user.data.semnatura;
					var currentBody = doc.data.bodyHTML;
					currentBody = currentBody.replace("{nume_sef}", semnatar);
					
					//campuri din flux
					//var flow = this.findRecord("nodeId", doc.data.currentStateKey);
					var flow = this.findRecord("flowKey", doc.data.template.flow);
					var node;
					for (var j=0; j<flow.data.nodes.length; j++){
						if (flow.data.nodes[j].nodeId == doc.data.currentStateKey){
							node = flow.data.nodes[j];
							break;
						}
					}
					currentBody = currentBody.replace(node.signaturePlaceholder, '<img src=\"../'+semnaturaURL+'\"/ width="100" height="70">');
					currentBody = currentBody.replace(node.datePlaceholder, Ext.Date.format(d1, 'Y-m-d'));
					
					var requestError,mailKey,mailName;
					var tipMail = "task";
					if (node.finalNode) // ultimul nod
					{
						mailKey = doc.data.authorKey;
						mailName = doc.data.authorName;
						tipMail = "completed";
						
						//Trimit mesaj la autor in caz ca am observatie
						returnobj.author = doc.data.authorKey;
						authorList.push(returnobj);
						
						//currentState
						delete doc.data.currentStateKey;
						delete doc.data.currentStateName;
						//asignee
						delete doc.data.asigneeKey;
						delete doc.data.asigneeName;
						
						doc.set('docStatus', 'completed');
						//verific daca mai am de trimis mail la alti destinatari
						if(typeof(node.sendmail) !== 'undefined'){
							var destinatarSuplimentar = "";
							//poate am un user, recuperez adresa de mail dupa nume utilizator
							//in campul node.sendmail.user am numele utilizator
							if(typeof(node.sendmail.user) !== 'undefined'){
								destinatarSuplimentar = 'http://localhost/couch/signme/_design/users/_view/all?key="' + node.sendmail.user + '"';
							}
							//poate este seful unui departament
							if(typeof(node.sendmail.departament) !== 'undefined'){
								destinatarSuplimentar = 'http://localhost/couch/signme/_design/users/_view/manager?key="' + node.sendmail.departament + '"';
							}
							
							//generez fisierul PDF si recuperez link-ul
							Ext.Ajax.request({
								url: '/signME/php/generate_doc_pdf.php?user='+user.data.username,
								params: { 'docName': doc.data.docName, 'bodyHTML': currentBody },
								success: function() { 
									//Ext.Msg.alert('Descarcare PDF', '<a target="_blank" href="/signME/data/PDF/'+user.data.username+'/'+doc.data.docName+'.pdf">Da un click aici sa descarci PDF.</a>'); 
									//trimit si un mail catre destinatar cu mesaj care contine link-ul catre fisierul PDF
									Ext.Ajax.request({
										url: destinatarSuplimentar,
										async: false,
										success: function(response) {
											var json = JSON.parse(response.responseText);
											sendmailUser = json.rows[0].value.username;
											if (json.rows.length == 1)
											{
												var attachlink = "";
												if (typeof doc.data._attachments !== "undefined"){
												for (item in doc.data._attachments) {
												attachlink = 'http://localhost/couch/signme/' + doc.data._id + '/' + item;
												break;
												}
												}
												Ext.Ajax.request({
												params: { 'attachlink': attachlink, 'docName': doc.data.docName, 'pdflink': 'http://localhost/signME/data/PDF/'+user.data.username+'/'+doc.data.docName+'.pdf' },
												url: '/signME/php/sendmail.php?tipMail=notificare&recipient='+json.rows[0].value.mail,
												success: function() { Ext.Msg.alert('', 'Notificare transmisa cu succes!'); },
												failure: function() { Ext.Msg.alert('Eroare', 'Eroare la transmiterea mesajului'); },
												//jsonData: Ext.util.JSON.encode(dataObj)
												});
											}
										}
									});
								},
								failure: function() { Ext.Msg.alert('Fail', 'Eroare generare fisier PDF!'); },
								//jsonData: function () { return Ext.JSON.encode(record.data);}
							});
													
						}
					}
					else // nu e ultimul nod. se trimite documentul mai departe
					{
						var nextState;// = this.findRecord("nodeId", flow.data.nextState);	
						for (var j=0; j<flow.data.nodes.length; j++){
							if (flow.data.nodes[j].previousState == node.nodeId){
								nextState = flow.data.nodes[j];
								break;
							}
						}
						if (nextState.assignee == 'user')
						{
							doc.data.asigneeKey = nextState.assigneeKey;
							doc.data.asigneeName = nextState.assigneeName;
						}
						else // caut seful departamentului
						{
							//Daca am in flux, definit un departament, altfel, caut dupa departamentul user-ului
							var dpt;
							if (typeof nextState.assigneeKey !== "undefined") { dpt = nextState.assigneeKey; }
							else { dpt = user.data.departament; }
							Ext.Ajax.request({
								url: 'http://localhost/couch/signme/_design/users/_view/manager?key="' + dpt + '"',
								async: false,
								success: function(response) {
									var json = JSON.parse(response.responseText);
									if (json.rows.length == 1)
									{
										doc.data.asigneeKey = json.rows[0].value.username;
										doc.data.asigneeName = json.rows[0].value.nume + ' ' + json.rows[0].value.prenume;
									}
									else if (json.rows.length > 1)
									{
										failed_docs.push(doc.data.docName);
										requestError = true; // departamentul are mai multi manageri. eroare
									}
									else
									{
										// niciun sef pus pe departament. eroare
										Ext.Msg.alert('Eroare semnare document', 'Nu a fost gasit niciun manager pe departamentul ' + dpt + '.');
										requestError = true;
									}
								}
							});
						}
						
						//Trimit mesaj la assignee, daca am observati
						returnobj.author = doc.data.authorKey;
						authorList.push(returnobj);
						
						if (!requestError)
						{
							doc.data.currentStateKey = nextState.nodeId;
							doc.data.currentStateName = nextState.nodeName;
							
							mailKey = doc.data.asigneeKey;
							mailName = doc.data.asigneeName;
						}
					}
					
					if (requestError)
					{
						continue;
					}			
					
					//audit
					var actiuni = doc.data.actiuni; //Fac un obiect in care imi salvez modificarile asupra documentului, fiecare set pe cheia current state
					if (!user.data.isDelegat) {
						actiuni[node.nodeId] = {"timestamp":d1.toString(),"user":user.data.username,"bodyHTML": currentBody}; //primul pas e pe cheia create
					} else {
						actiuni[node.nodeId] = {"timestamp":d1.toString(),"user":user.data.username,"bodyHTML": currentBody, "delegatDe": user.data.user_delegat};
					}
					doc.set('actiuni', actiuni);
					
					//Daca este semneaza cu observatii, ii acumuleaz si mesajul pe dosar
					if (recordTask.length == 1 && isMessage === true) { // daca userul a dat click pe "Semneaza cu observatii" 
						var message = Ext.getCmp('messageWindow');
						if (typeof doc.data.observatii === "undefined" || doc.data.observatii.length == 0){
							doc.set('observatii', message.down('form').getForm().findField('comment').getValue());
						} else {
							doc.set('observatii', doc.data.observatii + "<br>" + message.down('form').getForm().findField('comment').getValue());
						}
						//Daca sunt pe departamentul pun observatiile in document daca exista placeholder
						if ((user.data.departament == "Contabilitate" || user.data.departament_delegare == "Contabilitate") && 
								currentBody.indexOf("{observatii_conta}") != -1){
								currentBody = currentBody.replace("{observatii_conta}", message.down('form').getForm().findField('comment').getValue());
						}
					} else {
						if (node.finalNode) // ultimul nod
						{
							//Daca am ajuns la final si a ramas placeholder observatii conta agatat, il sterg
							currentBody = currentBody.replace("{observatii_conta}", "");
						}
					}
					
					doc.set('bodyHTML', currentBody);
					doc.endEdit();
					
					currentTaskStore.commitChanges();
					currentTaskStore.sync();
					currentTaskStore.reload();
					
					var historyView = Ext.getCmp('historyView');
					var historyStore = historyView.getStore();
					historyStore.reload();
					
					var rsView = Ext.getCmp('requestStatusView');
					var rsStore = rsView.getStore();
					rsStore.reload();
					
					//trimit si un mail la misto asa
					Ext.Ajax.request({
						url: 'http://localhost/couch/signme/_design/users/_view/all?key="' + mailKey + '"',
						async: false,
						success: function(response) {
							var json = JSON.parse(response.responseText);
							if (json.rows.length == 1)
							{
								Ext.Ajax.request({
									url: '/signME/php/sendmail.php?tipMail='+tipMail+'&recipient='+json.rows[0].value.mail,
									success: function() { Ext.Msg.alert('', mailName + ' a fost notificat!'); },
									failure: function() { Ext.Msg.alert('Eroare', 'Eroare la transmiterea mesajului'); },
									//jsonData: Ext.util.JSON.encode(dataObj)
								});
							}
						}
					});
				
				}
			
				if (failed_docs.length)
				{
					Ext.Msg.alert('Eroare semnare', 'Urmatoarele documente nu au putut fi semnate deoarece departamentele asignate au mai multi manageri: <b>' + failed_docs + '</b>. Contactati un administrator');
					return;
				}		
				
				if (recordTask.length == 1 && isMessage === true) // daca userul a dat click pe "Semneaza cu observatii"
				{
					// trebuie sa creeam mesajul
					var newMessage = Ext.create('signME.model.Messages');
					var message = Ext.getCmp('messageWindow');
					newMessage.data.storage_type = 'messageStore';
					newMessage.data.sender = user.data.nume + " " + user.data.prenume;
					
					newMessage.data.receiver = sendmailUser.length > 0 ? sendmailUser : mailKey;//trimit mesajul la urmatorul pe flux authorList[0].author;
					newMessage.data.document = authorList[0].doc;	
					newMessage.data.message = message.down('form').getForm().findField('comment').getValue();
					
					var messagesStore = Ext.getCmp('messagesView').getStore();
					console.log(newMessage);
					console.log(messagesStore);
					messagesStore.add(newMessage.data);
					messagesStore.commitChanges();
					messagesStore.sync();
					messagesStore.reload();
					message.close();
				}
				
			});
		
		}
		else 
		{
			Ext.Msg.alert('Eroare semnare', 'Selectati cel putin un element');
		}
	},
	
	onSignAndMessageClick: function() {
		var currentTaskView = Ext.getCmp('currentTaskView');
		var recordTask = currentTaskView.getSelectionModel().getSelection();
		if (recordTask.length == 1) {
			Ext.create('Ext.window.Window', {
				id: 'messageWindow',
				height:200,
				width:300,
				modal:true,
				title:'Introdu comentariu',
				layout:'fit',
				requires:['Ext.form.Panel', 'Ext.form.field.Text'],
				autoShow:true,
				resizable:true,
				draggable:true,
				items: [
					{
						xtype:'panel',
						layout:{
							type:'vbox',
							align:'center'
						},
						border:false,
						items:[
							{
								xtype:'form',
								padding:'10 10 10 10',
								flex:1,
								border:false,
								layout:{
									columns:1,
									type:'table'

								},
								fieldDefaults:{
									msgTarget:'side'

								},
								items:[
									{
										xtype:'container',
										//columnWidth:.5,
										padding:'10 10 10 10',
										layout:'anchor',
										items:[
											{
												xtype:'textareafield',
												name:'comment',
												grow: true,
												fieldLabel:'Comentariu:',
												allowBlank:false
											}
										]
									},

									{
										xtype:'textfield',
										hidden:true,
										name:'id'
									}


								]
							}
						]

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
							id: 'saveMessageButton',
							iconCls:'icon-save',
							itemId:'save',
							scale:'medium',
							text:'Save',
							action:'save',
						}, 
						{
							id: 'cancelMessageButton',
							iconCls:'icon-reset',
							text:'Cancel',
							scale:'medium',
							scope:this,
						}]
					}
				]

			}).show();
		} else if (recordTask.length > 1) {
			// do semneaza pt toate
		} else {
			Ext.Msg.alert('Eroare semnare', 'Selectati cel putin un element');
		}
	},
	
	onSaveMessageClick: function() {
		var message = Ext.getCmp('messageWindow');
		this.onSignClick(true);
	},
	
	onCancelMessageClick: function() {
		var message = Ext.getCmp('messageWindow');
		message.close();
	},

	onRejectClick: function() {
		var currentTaskView = Ext.getCmp('currentTaskView');
		var recordTask = currentTaskView.getSelectionModel().getSelection();
		if (recordTask.length == 1) {
			Ext.create('Ext.window.Window', {
				id: 'rejectWindow',
				height:200,
				width:300,
				modal:true,
				title:'Introdu comentariu',
				layout:'fit',
				requires:['Ext.form.Panel', 'Ext.form.field.Text'],
				autoShow:true,
				resizable:true,
				draggable:true,
				items: [
					{
						xtype:'panel',
						layout:{
							type:'vbox',
							align:'center'
						},
						border:false,
						items:[
							{
								xtype:'form',
								padding:'10 10 10 10',
								flex:1,
								border:false,
								layout:{
									columns:1,
									type:'table'

								},
								fieldDefaults:{
									msgTarget:'side'

								},
								items:[
									{
										xtype:'container',
										//columnWidth:.5,
										padding:'10 10 10 10',
										layout:'anchor',
										items:[
											{
												xtype:'textareafield',
												name:'comment',
												grow: true,
												fieldLabel:'Comentariu:',
												allowBlank:false
											}
										]
									},

									{
										xtype:'textfield',
										hidden:true,
										name:'id'
									}


								]
							}
						]

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
							id: 'saveRejectButton',
							iconCls:'icon-save',
							itemId:'save',
							scale:'medium',
							text:'Save',
							action:'save',
						}, 
						{
							id: 'cancelRejectButton',
							iconCls:'icon-reset',
							text:'Cancel',
							scale:'medium',
							scope:this,
						}]
					}
				]

			}).show();
		} else {
			Ext.Msg.alert('Eroare respingere', 'Selectati cel putin un element');
		}
	},

	RejectTask: function() {
		var currentTaskView = Ext.getCmp('currentTaskView');
		var currentTaskStore = currentTaskView.getStore();
		var recordTask = currentTaskView.getSelectionModel().getSelection();
		var doc = recordTask[0];
		// creeam mesajul
		var newMessage = Ext.create('signME.model.Messages');
		var message = Ext.getCmp('rejectWindow');
		newMessage.data.storage_type = 'messageStore';
		newMessage.data.sender = user.data.nume + " " + user.data.prenume;
		newMessage.data.receiver = doc.data.authorKey;
		newMessage.data.document = doc.data.docName;	
		newMessage.data.message = message.down('form').getForm().findField('comment').getValue();
		
		var messagesStore = Ext.getCmp('messagesView').getStore();
		console.log(newMessage);
					console.log(messagesStore);
		messagesStore.add(newMessage.data);
		messagesStore.commitChanges();
		messagesStore.sync();
		messagesStore.reload();
		message.close();	
		
		//Actualizam documentul		
		var d1 = new Date();
		
		mailKey = doc.data.authorKey;
		mailName = doc.data.authorName;
		
		//currentState
		doc.data.currentStateKey = 'Rejected';
		doc.data.currentStateName = 'Respins de catre ' + user.data.nume + " " + user.data.prenume;
		//asignee
		delete doc.data.asigneeKey;
		delete doc.data.asigneeName;
		
		doc.beginEdit();
		doc.set('docStatus', 'rejected');
		
		currentBody = doc.data.bodyHTML;
		
		//audit
		var actiuni = doc.data.actiuni; //Fac un obiect in care imi salvez modificarile asupra documentului, fiecare set pe cheia current state
		if (!user.data.isDelegat){
			actiuni['reject'] = {"timestamp":d1.toString(),"user":user.data.username,"bodyHTML": currentBody}; //primul pas e pe cheia create
		} else {
			actiuni['reject'] = {"timestamp":d1.toString(),"user":user.data.username,"bodyHTML": currentBody, "delegatDe": user.data.user_delegat};
		}
		doc.set('bodyHTML', currentBody);
		doc.set('actiuni', actiuni);
		
		//Daca a rjectat, ii acumulez si mesajul, la observatiile curente de pe dosar
		if (typeof doc.data.observatii === "undefined" || doc.data.observatii.length == 0){
			doc.set('observatii', newMessage.data.message);
		} else {
			doc.set('observatii', doc.data.observatii + "<br>" + newMessage.data.message);
		}
		doc.endEdit();
		
		currentTaskStore.commitChanges();
		currentTaskStore.sync();
		currentTaskStore.reload();
		
		var historyView = Ext.getCmp('historyView');
		var historyStore = historyView.getStore();
		historyStore.reload();
		
		var rsView = Ext.getCmp('requestStatusView');
		var rsStore = rsView.getStore();
		rsStore.reload();
		
		//trimit si un mail la misto asa
		Ext.Ajax.request({
			url: 'http://localhost/couch/signme/_design/users/_view/all?key="' + mailKey + '"',
			async: false,
			success: function(response) {
				var json = JSON.parse(response.responseText);
				if (json.rows.length == 1)
				{
					Ext.Ajax.request({
						url: '/signME/php/sendmail.php?tipMail=rejected&recipient='+json.rows[0].value.mail,
						success: function() { Ext.Msg.alert('', mailName + ' a fost notificat!'); },
						failure: function() { Ext.Msg.alert('Eroare', 'Eroare la transmiterea mesajului'); },
						//jsonData: Ext.util.JSON.encode(dataObj)
					});
				}
			}
		});
	},
	
	onSaveRejectClick: function() {
		var message = Ext.getCmp('rejectWindow');
		this.RejectTask();
	},
	
	onCancelRejectClick: function() {
		var message = Ext.getCmp('rejectWindow');
		message.close();
	},
	
	onSelect: function() {
		var currentTaskView = Ext.getCmp('currentTaskView');
		var denyListener = currentTaskView.getSelectionModel().getSelection();
		if (denyListener.length == 1) {
			currentTaskView.getDockedItems()[1].items.items[1].setVisible(true);
			currentTaskView.getDockedItems()[1].items.items[2].setVisible(true);
		} else {
			currentTaskView.getDockedItems()[1].items.items[1].setVisible(false);
			currentTaskView.getDockedItems()[1].items.items[2].setVisible(false);
		}
	},
	
});
