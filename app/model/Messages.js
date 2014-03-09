Ext.define('signME.model.Messages', {
	extend: 'Ext.data.Model',
	
    fields: [{name: '_id', type: 'string', optional: true},
    {name: '_rev', type: 'string', optional: true},
    {name: 'storage_type', type:'string', mapping:'storage_type', defaultValue:'messageStore'},
    'sender', 'message', 'receiver', 'document'],
	
	idProperty : '_id',
});