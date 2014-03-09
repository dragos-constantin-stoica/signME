Ext.define('signME.view.CurrentTask', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.currentTask',
	
	store: 'CurrentTask',
	
	title : 'Lista documentelor de semnat',	
	multiSelect: true,
	id: 'currentTaskView',
	
	columns: [
		{
			header:'Nume document',
			dataIndex:'docName',
			//flex:1,
			width:300,
			filter: { type: 'string'} 
		},
		{
			header:'Nume template',
			dataIndex:'template',
			renderer: function(value) { return value.templateName },
			flex:1,
			width:100
		},
		{
			header:'Status',
			dataIndex: 'docStatus',
			width:150
		},
		{
			header:'Data initierii',
			dataIndex: 'startDate',
			renderer: Ext.util.Format.dateRenderer('Y-m-d'),
			width:200,
			filter: true
		},
		{
			header:'Data estimata finalizare',
			dataIndex: 'estimatedFinishDate',
			renderer: function(value) { return value.toString().match(/(.+)T.+/)[1] },
			width:150,
			filter: true
		},
		{
			header:'Autor',
			dataIndex: 'authorName',
			width:150,
			filter: true
		},
		{
			header:'De facut',
			dataIndex: 'currentStateName',
			width:300
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
			id: 'viewObsC'
		},
		{
			id: 'previewDoc',
			header:'Preview',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi documentul',
			align: 'center',
			icon: './resources/img/edit_task.png',
		},
		{
			id: 'viewAttach',
			header:'Atasament',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi imaginea atasata',
			align: 'center',
			icon: './resources/img/edit_task.png',
		},
		{
			header:'Asignat',
			dataIndex: 'asigneeKey',
			hidden: true		}
	],
	
	features: [{	ftype: 'filters',
					local: true,   // defaults to false (remote filtering)
	}],
				
	items: [
		{
			id: 'managersDropdown2',
			xtype: 'container',
			padding: '5',
		},
	],
	
	dockedItems: [
		{
			dock: 'top',
			xtype: 'toolbar',
			items: [
			{
				id: 'signButton',
				xtype: 'button',
				text: 'Semneaza',
			},
			{
				id: 'signAndMessageButton',
				xtype: 'button',
				text: 'Semneaza cu observatii',
			}, 
			{
				id: 'rejectButton',
				xtype:'button',
				text:'Respinge',
			},
			{
				id: 'clearFilterButton',
				xtype:'button',
				text: 'Curata toate filtrele',
				handler: function () {
					Ext.getCmp('currentTaskView').filters.clearFilters();
				}
            }]
		}
	],

});