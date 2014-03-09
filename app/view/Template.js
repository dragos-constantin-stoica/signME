Ext.define('signME.view.Template', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.template',
	
	store: 'Template',
	
	title: 'Lista de modele de documente cu care se poate genera o noua cerere',
	
	multiSelect: false,

	id: 'templateView',

	columns: [
		{
			header:'Template',
			dataIndex:'templateName',
			//flex:1,
			width:200
		},
		{
			header:'Descriere',
			dataIndex: 'templateDescription',
			width:400,
			flex:1
		},
		{
			header:'Versiune',
			dataIndex: 'templateVer',
			width:200
		},
		{
			id: 'previewTemplate',
			header:'Preview',
			xtype: 'actioncolumn',
			tooltip: 'Da un click aici ca sa vezi cum arata template-ul',
			align: 'center',
			icon: './resources/img/edit_task.png',
			width:100,
		}
	],
	
	dockedItems: [{
		dock: 'top',
		xtype: 'toolbar',
		items: [{
			id: 'createRequestButton',
			xtype: 'button',
			text: 'Creeaza document nou',
		}]
	}],

});