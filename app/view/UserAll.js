Ext.define('signME.view.UserAll', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.userGrid',
	
	store: 'UserAll',
	
	title : 'Gestionare utilizatori',
	layout: 'fit',
	multiSelect: true,	
	id: 'userAllGrid',
	loadMask: true,
	width: 'auto',
	height: 600,	
	features: [{	ftype: 'filters',
					// encode and local configuration options defined previously for easier reuse
					encode: false, // json encode the filter query
					local: true,   // defaults to false (remote filtering)
				}],
	columns: [
		{   header:'Nume',
			dataIndex:'nume',
			//flex:1,
			width:100,
			filter: { type: 'string'} 
		},
		{   header:'Prenume',
			dataIndex: 'prenume',
			width:100,
			filter: { type: 'string'} 
		},
		{   header:'Departament',
			dataIndex: 'departament',
			flex:1,
			width:100,
			filter: { type: 'string'} 
		},
		{   header:'Functia',
			dataIndex: 'functia',
			flex:1,
			width:100,
			filter: { type: 'string'} 
		},

		{   header:'E-Mail',
			dataIndex: 'mail',
			width:200
		},
		{   header:'Nume utilizator',
			dataIndex: 'username',
			width:100,
			filter: { type: 'string'} 
		},
		{   header:'Parola',
			dataIndex: 'password',
			width:100
		},
		{   header:'Admin',
			dataIndex: 'isAdmin',
			xtype: 'checkcolumn',
			processEvent: function () { return false; },
			width:100
		},
		{   header:'Manager',
			dataIndex: 'isManager',
			xtype: 'checkcolumn',
			processEvent: function () { return false; },
			width:100
		}
	],
	
	dockedItems: [
		{
			dock: 'top',
			xtype: 'toolbar',
			items: [{
				id: 'addUserButton',
				xtype: 'button',
				text: 'Add',
			}, 
			{
				id: 'editUserButton',
				xtype: 'button',
				text: 'Edit',
			},
			{
				id: 'clearFilterButton3',
				xtype:'button',
				text: 'Curata toate filtrele',
				handler: function () {
					Ext.getCmp('userAllGrid').filters.clearFilters();
				}
            }]
	}]

});