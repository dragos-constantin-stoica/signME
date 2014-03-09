/*Ext.define('signME.store.Flow', {
	extend: 'Ext.data.Store',
	model: 'signME.model.Flow',
	requires : ['signME.model.OrgChart'],

	autoLoad: true,
	
	proxy: {	
		type: 'ajax',
		url: 'data/flow.json'
	},
	
	reader: { 
		type : 'json',
		root: [],
	},
	
});*/
Ext.define('signME.store.Flow', {
	extend: 'Ext.data.Store',
	model: 'signME.model.Flow',
	
	autosync: true,
	autoLoad: true,
	
	proxy: {
		//the store will get the content from CouchDB			
		type: 'rest',
		appendId: true,
		noCache: false,
		idProperty: '_id',

		api: {
			create: 'http://localhost/couch/signme',
			read:	'http://localhost/couch/signme/_design/flows/_view/all',
			update:	'http://localhost/couch/signme',
			destroy:'http://localhost/couch/signme'
		},

		reader: {
			type: 'json',
			root: 'rows',
			record: 'value',
			idProperty: '_id',
			totalProperty: 'total_rows',
			successProperty: 'ok'
		},
		
		//Custom Writer
		writer: {
			allowSingle: true,
			encode: false,
			writeAllFields: true,
			root: '',
			getRecordData: function(record,operation){
				if (operation.action == 'create'){
					delete record.data._id;
					delete record.data._rev;
				}
				return record.data;
			}
		}				

	},

});
