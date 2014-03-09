Ext.define('signME.store.OrgChart', {
	extend: 'Ext.data.TreeStore',
	model: 'signME.model.OrgChart',
	requires : ['signME.model.OrgChart'],
	storeId : 'OrgChartStore',
	autoLoad : true,
	proxy: {
		//the store will get the content from json file			
		type: 'ajax',
		url: 'data/orgchart.json'
	},
	reader : { type : 'json' },
	
	folderSort: false
});