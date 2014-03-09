Ext.define('signME.store.History', {
	
	extend: 'Ext.data.Store',
	model: 'signME.model.Document',
	
	autoSync: true,
	autoLoad: true,
	pageSize: 1000,

	proxy: {
		//the store will get the content from CouchDB			
		type: 'rest',
		appendId: true,
		noCache: false,
		idProperty: '_id',

		api: {
			create: 'http://localhost/couch/signme',
			read:	'http://localhost/couch/signme/_design/documents/_view/history_by_user',
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
				if (!record.data._attachments){
					delete record.data._attachments;
				}
				return record.data;
			}
		},

		buildUrl: function(request) {
			var me        = this,
				operation = request.operation,
				url       = me.getUrl(request);	
			
			if (request.operation.action == "read" && typeof user !== "undefined"){
				if (user.data.departament != "Contabilitate") {
					url += '?key=\"'+user.data.username+'\"';
				}
			}
			
			if (operation.action == "update" || operation.action == "destroy"){
				url += '/'+request.operation.records[0].internalId;
			}
			
			return url;
		}

	},

});
