Ext.define('signME.model.Template', {
	extend: 'Ext.data.Model',
	fields: [{name: '_id', type: 'string', optional: true},
			{name: '_rev', type: 'string', optional: true},
			{name: 'storage_type', type:'string', mapping:'storage_type', defaultValue:'templateStore'},
	'templateName','templateKey', 'templateDescription', 'templateVer', 'flow', 'bodyHTML']
});