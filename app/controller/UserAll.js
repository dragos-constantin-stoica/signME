Ext.define('signME.controller.UserAll', {
    extend: 'Ext.app.Controller',

    stores: [
        'UserAll',
    ],
    views: [
        'UserAll',
    ],
    init: function() {
        this.control({
			"button[id=addUserButton]": {
                click: this.onAddUserClick
            },
			
			"button[id=saveUserButton]": {
                click: this.onSaveUserClick
            },
			
			"button[id=cancelButton]": {
                click: this.onCancelClick
            },
			
			"button[id=editUserButton]": {
                click: this.onEditUserClick
            },
			
			"button[id=editSaveButton]": {
                click: this.onEditSaveClick
            },
			
			"button[id=editCancelButton]": {
                click: this.onEditCancelClick
            },
        });
    },


	onAddUserClick: function() {
		Ext.create('Ext.window.Window', {
			id: 'addUserWindow',
			height:400,
			width:500,
			modal:true,
			title:'Adauga un nou utilizator',
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
										{	name:'nume',
											xtype:'textfield',                                                                
											fieldLabel:'Nume:',
											allowBlank:false,
											maxLength:25
										}, 
										{	name:'prenume',
											xtype:'textfield',                                                                
											fieldLabel:'Prenume:',
											allowBlank:false,
											maxLength:25
										}, 
										{	name:'mail',
											xtype:'textfield',                                                                
											fieldLabel:'E-mail:',
											allowBlank:false                                                                
										}, 
										{	name:'departament',
											xtype:'textfield',                                                                
											fieldLabel:'Departament:',
											allowBlank:false
										}, 
										{	name:'functia',
											xtype:'textfield',                                                                
											fieldLabel:'Functia:',
											allowBlank:true
										}, 
										{	name:'username',
											xtype:'textfield',                                                                
											fieldLabel:'Nume utilizator:',
											allowBlank:false,
											maxLength:20
										}, 
										{	name:'password',
											xtype:'textfield',                                                                
											fieldLabel:'Parola:',
											allowBlank:false,
											maxLength:100
										}, 
										{	name:'isAdmin',
											xtype: 'checkboxfield',                                                               
											fieldLabel:'Este administartor:',
											allowBlank:false                                                                
										}, 
										{	name:'isManager',
											xtype: 'checkboxfield',                                                                
											fieldLabel:'Este manager:',
											allowBlank:false
										}, 
										{	name:'sex',
											xtype:'textfield',                                                                
											fieldLabel:'Sex:',
											allowBlank:false,
											maxLength:1
										},
										{	name:'varsta',
											xtype:'textfield',                                                                
											fieldLabel:'varsta:',
											allowBlank:false,
											maxLength:3
										},
										{	name:'telefon',
											xtype:'textfield',                                                                
											fieldLabel:'Telefon:',
											allowBlank:false,
											maxLength:15
										}, 
										{	name: 'semnatura',
											xtype: 'textfield',																
											emptyText: 'locatie semnatura digitala',
											fieldLabel: 'Semnatura'																
										}

									]
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
							id: 'saveUserButton',
							iconCls:'icon-save',
							itemId:'save',
							scale:'medium',
							text:'Save',
							action:'save',
						}, 
						{
							id: 'cancelButton',
							iconCls:'icon-reset',
							text:'Cancel',
							scale:'medium',
							scope:this,
						}]
					}
			]

		}).show();
	},
	
	onSaveUserClick: function() {
		var add = Ext.getCmp('addUserWindow');
		var newRecord = Ext.create('signME.model.User');
		var form = add.down('form').getForm();
		var me = Ext.getCmp('userAllGrid');
		var store = me.getStore();
		newRecord.data.nume = form.findField('nume').getValue();
		newRecord.data.prenume = form.findField('prenume').getValue();
		newRecord.data.mail = form.findField('mail').getValue();
		newRecord.data.departament = form.findField('departament').getValue();
		newRecord.data.functia = form.findField('functia').getValue();
		newRecord.data.username = form.findField('username').getValue();
		newRecord.data.password = form.findField('password').getValue();
		newRecord.data.isAdmin = form.findField('isAdmin').getValue();
		newRecord.data.isManager = form.findField('isManager').getValue();
		newRecord.data.sex = form.findField('sex').getValue();
		newRecord.data.varsta = form.findField('varsta').getValue();                                                        
		newRecord.data.telefon = form.findField('telefon').getValue();
		newRecord.data.semantura = form.findField('semnatura').getValue();
		store.add(newRecord.data);
		store.commitChanges();
		store.sync();
		store.reload();	
		add.close();
	},
	
	onCancelClick: function() {
		var add = Ext.getCmp('addUserWindow');
		add.close();
	},
	
	onEditUserClick: function() {
		var me = Ext.getCmp('userAllGrid');
		var recordAsignareRol = me.getSelectionModel().getSelection();
		if (recordAsignareRol[0] != undefined) {
			var edit = Ext.create('Ext.window.Window', {
				id: 'editUserWindow',
				height:400,
				width:500,
				modal:true,
				title:'Editeaza',
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
										{	name:'nume',
											xtype:'textfield',                                                                
											fieldLabel:'Nume:',
											allowBlank:false,
											maxLength:25
										}, 
										{	name:'prenume',
											xtype:'textfield',                                                                
											fieldLabel:'Prenume:',
											allowBlank:false,
											maxLength:25
										}, 
										{	name:'mail',
											xtype:'textfield',                                                                
											fieldLabel:'E-mail:',
											allowBlank:false                                                                
										}, 
										{	name:'departament',
											xtype:'textfield',                                                                
											fieldLabel:'Departament:',
											allowBlank:false
										},
										{	name:'functia',
											xtype:'textfield',                                                                
											fieldLabel:'Functia:',
											allowBlank:true
										}, 
										{	name:'username',
											xtype:'textfield',                                                                
											fieldLabel:'Nume utilizator:',
											allowBlank:false,
											maxLength:20
										}, 
										{	name:'password',
											xtype:'textfield',                                                                
											fieldLabel:'Parola:',
											allowBlank:false,
											maxLength:100
										}, 
										{	name:'isAdmin',
											xtype: 'checkboxfield',                                                               
											fieldLabel:'Este administartor:',
											allowBlank:false                                                                
										}, 
										{	name:'isManager',
											xtype: 'checkboxfield',                                                                
											fieldLabel:'Este manager:',
											allowBlank:false
										}, 
										{	name:'sex',
											xtype:'textfield',                                                                
											fieldLabel:'Sex:',
											allowBlank:false,
											maxLength:1
										},
										{	name:'varsta',
											xtype:'textfield',                                                                
											fieldLabel:'varsta:',
											allowBlank:false,
											maxLength:3
										},
										{	name:'telefon',
											xtype:'textfield',                                                                
											fieldLabel:'Telefon:',
											allowBlank:false,
											maxLength:15
										}, 
										{	name: 'semnatura',
											xtype: 'textfield',																
											emptyText: 'locatie semnatura digitala',
											fieldLabel: 'Semnatura'																
										}


										]
									},

									{
										xtype:'textfield',
										hidden:true,
										name:'_id'
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
						items:['->', {
							id: 'editSaveButton',
							iconCls:'icon-save',
							itemId:'save',
							scale:'medium',
							text:'Save',
							action:'save',
						}, 
						{
							id: 'editCancelButton',
							iconCls:'icon-reset',
							text:'Cancel',
							scale:'medium',
							scope:this,
						}]
					}
				]

			}).show();

			edit.down('form').getForm().loadRecord(recordAsignareRol[0]);

		} else {
			Ext.Msg.alert('Eroare editare', 'Selectati cel putin un element');
		}
	},
	
	onEditSaveClick: function() {
		var edit = Ext.getCmp('editUserWindow');
		var me = Ext.getCmp('userAllGrid');
		var recordAsignareRol = me.getSelectionModel().getSelection();
		edit.down('form').getForm().updateRecord(recordAsignareRol[0]);
		var store = me.getStore();
		store.commitChanges();
		store.sync();
		store.reload();
		// if the user is actually the currently logged user, update the myprofile view
		if (recordAsignareRol[0].data.username == user.data.username);
			signME.controller.Profile.prototype.updateGrid();
		edit.close();
	},
	
	onEditCancelClick: function() {
		var edit = Ext.getCmp('editUserWindow');
		edit.close();
	},

});