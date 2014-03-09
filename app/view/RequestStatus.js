Ext.define('signME.view.RequestStatus', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.requestStatus',
	
	store: 'RequestStatus',
	
	title : 'Status documente initiate',
	
	id: 'requestStatusView',

	columns: [
		{
			header:'Nume document',
			dataIndex:'docName',
			//flex:1,
			width:150
		},
		{
			header:'Nume template',
			dataIndex:'template',
			renderer: function(value) { return value.templateName },
			flex:1,
			width:150
		},
		{
			header:'Status',
			dataIndex: 'docStatus',
			width:150
		},
		{
			header:'Data initierii',
			dataIndex: 'startDate',
			width:200
		},
		{
			header:'Data estimata finalizare',
			dataIndex: 'estimatedFinishDate',
			renderer: function(value) { return value.toString().match(/(.+)T.+/)[1] },
			width:150
		},
		{
			header:'In lucru la',
			dataIndex: 'asigneeName',
			width:150
		},
		{
			header:'De facut',
			dataIndex: 'currentStateName',
			width:200
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
			id: 'viewObsR'
		},
		{
			id: 'previewPartialDoc',
			header:'Preview',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi documentul',
			align: 'center',
			icon: './resources/img/edit_task.png',
			//flex:1
			width:50,
		},
		{
			header:'Atasament',
			id: 'viewAttachReqStatus',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi imaginea atasata',
			align: 'center',
			icon: './resources/img/edit_task.png',
			width:80,
		},
	]

});