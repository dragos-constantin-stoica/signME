Ext.define('signME.view.Profile', {
	extend: 'Ext.form.Panel',
	alias: 'widget.myProfile',
	
	title:'Profilul meu',
	
	id : 'myProfileView',
	
	items:[
		{
			id: 'profileView',
			xtype:'container',
			//columnWidth:.5,
			padding:'10 10 10 10',
			layout:'anchor',
			items:[
			{	name:'nume',
				xtype:'textfield',                                                                
				fieldLabel:'Nume:',
				allowBlank:false,
				maxLength:25,
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
			/*{	name:'isAdmin',
				xtype: 'checkboxfield',                                                               
				fieldLabel:'Este administartor:',
				allowBlank:false                                                                
			}, */
			{	name:'isManager',
				xtype: 'checkboxfield',                                                                
				fieldLabel:'Este manager:',
				allowBlank:false,
				disabled : true
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
	],
	buttons:[
		{
			id: 'saveButton',
			text: 'Salveaza',
			formBind: false, //only enabled once the form is valid
			disabled: false,
		}
	]

});