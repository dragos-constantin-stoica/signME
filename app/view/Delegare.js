Ext.define('signME.view.Delegare', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.Delegare',
	
	store: 'Managers',
	
	title : 'Delegare manager departament',
	layout: 'fit',
	multiSelect: false,	
	id: 'delegareView',
	loadMask: true,
	width: 'auto',
	height: 600,	
	/*features: [{	ftype: 'filters',
					// encode and local configuration options defined previously for easier reuse
					encode: false, // json encode the filter query
					local: true,   // defaults to false (remote filtering)
				}],*/
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
			width:100,
			filter: { type: 'string'} 
		},
		{   header:'Functia',
			dataIndex: 'functia',
			width:100,
			flex : 1,
			filter: { type: 'string'} 
		},
		{   header:'Manager',
			dataIndex: 'isManager',
			xtype: 'checkcolumn',
			processEvent: function () { return false; },
			width:100
		},
		{   header:'Delegat',
			dataIndex: 'isDelegat',
			xtype: 'checkcolumn',
			processEvent: function () { return false; },
			width:100
		},
		{   header:'Departament delegare',
			dataIndex: 'departament_delegare',
			width:150,
			filter: { type: 'string'} 
		},
	],
	
	listeners: {
				beforerender: function (main) {
					this.getStore().filter([
						{
							filterFn: function(item) {
								if ((item.get('isManager') == true || item.get('isDelegat') == true) &&
									item.get('username') != user.data.username){
									return true;
								}
								return false;
							}
						}
					]);
				}
			},
			
	dockedItems: [
		{
			dock: 'top',
			xtype: 'toolbar',
			items: [{
				id: 'delegareButton',
				xtype: 'button',
				text: 'Deleaga',
			},
			{
				id: 'cancelDelegareButton',
				xtype: 'button',
				text: 'Anuleaza delegare',
			},
			{
				id: 'clearFilterButton4',
				xtype:'button',
				text: 'Curata toate filtrele',
				handler: function () {
					Ext.getCmp('userAllGrid').filters.clearFilters();
				}
            }]
	}]

});