Ext.define('signME.view.History', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.history',
	
	store: 'History',
	
	title: 'Istoric',
       layout: 'fit',
	multiSelect: true,
	id: 'historyView',
	width: 'auto',
	height: 400,
	features: [{	ftype: 'filters',
					local: true  // defaults to false (remote filtering)
				}],
	columns: [
		{
			header:'Nume document',
			dataIndex:'docName',
			width:250,
			filter: true
		},
		{
			header:'Nume template',
			dataIndex:'template',
			renderer: function(value){ return value.templateName },
			flex:1,
			width:100,
			filter: true
		},
		{
			header:'Status',
			dataIndex: 'docStatus',
			width:80,
			filterable : true,
			filter: {
                type: 'list',
				options : ["completed","rejected"]
            }
		},
		{
			header:'Data initierii',
			dataIndex: 'startDate',
			width:100,
			filter: true
		},
		{
			header:'Data finalizarii',
			dataIndex: 'endDate',
			width:100,
			filter: true
		},
		{
			header:'Autor',
			dataIndex: 'authorName',
			width:150,
			filter: true
		},
		{
			header:'Observatii',
			dataIndex: 'observatii',
			/*renderer: function renderTip(value, metaData, record, rowIdx, colIdx, store) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                    return value;
            },*/
			icon: './resources/img/edit_task.png',
			xtype: 'actioncolumn',
			align: 'center',
			id: 'viewObsH'
		},
		{
			id: 'getPdf',
			header:'Preview',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi documentul',
			align: 'center',
			icon: './resources/img/edit_task.png',
			width:50,
		},	
		{
			header:'Atasament',
			id: 'viewAttachHistory',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi imaginea atasata',
			align: 'center',
			icon: './resources/img/edit_task.png',
			width:80,
		},
		{
			header:'Prelucrat',
			id: 'checkPrelucrat',
			xtype: 'checkcolumn',
			dataIndex: 'isPrelucrat',
			tooltip: 'Da un click aici ca sa marchezi dosarul prelucrat',
			align: 'center',
			width:100,
			listeners: {
				'checkchange': function(column, rowindex){ 
						var historyView = Ext.getCmp('historyView');
						var historyStore = historyView.getStore();
						var record = historyStore.getAt(rowindex);
						record.beginEdit();
						record.set('isPrelucrat', true);
						record.endEdit();
						historyStore.commitChanges();
						historyStore.sync();		
				}
			},
		}
	],
	
	/*listeners: {
		'beforerender' : function(grid) {

			if(user.data.departament != "Contabilitate") {
				var cb = Ext.getCmp("checkPrelucrat");
				cb.hide();
				var btn = Ext.getCmp("savePrelucratCheckbox");
				btn.hide();
			}

		}
	},*/
	
	dockedItems: [
		{
			dock: 'top',
			xtype: 'toolbar',
			items: [
				{
					id: 'clearFilterButton2',
					xtype:'button',
					text: 'Curata toate filtrele',
					handler: function () {
						Ext.getCmp('historyView').filters.clearFilters();
					}
				},
				{
					id: 'savePrelucratCheckbox',
					xtype:'button',
					text: 'Salveaza flag prelucrare document',
					handler: function () {
						/*var historyView = Ext.getCmp('historyView');
						var historyStore = historyView.getStore();
						historyStore.commitChanges();
						historyStore.sync();*/
					}
				}
			]
		}
	]

});