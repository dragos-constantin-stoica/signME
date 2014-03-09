Ext.define('signME.model.Flow', {
    extend: 'Ext.data.Model',
	
    fields: [{name: '_id', type: 'string', optional: true},
			{name: '_rev', type: 'string', optional: true},
			{name: 'storage_type', type:'string', mapping:'storage_type', defaultValue:'flowStore'},
    "flowKey", "flowVer",
			{name: 'nodes', type:'json', mapping:'nodes'}
	],

});