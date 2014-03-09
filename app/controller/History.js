Ext.define('signME.controller.History', {
    extend: 'Ext.app.Controller',

    stores: [
        'History',
    ],
    views: [
        'History',
    ],
    init: function() {
        this.control({
			"actioncolumn[id=getPdf]": {
                click: this.onAction
            },
			
			"actioncolumn[id=viewObsH]": {
                click: this.onViewObs
            },
			
			"actioncolumn[id=viewAttachHistory]": {
                click: this.onAttach
            },
        });

		
		//var store = this.getHistoryStore();
		var store = Ext.create('signME.store.History');
    },

	onViewObs: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		Ext.create('Ext.window.Window', {
			height:400,
			width:400,
			modal:true,
			title:'Observatii complete',
			layout:'fit',
			requires:['Ext.form.Panel', 'Ext.form.field.Text'],
			autoShow:true,
			draggable:true,
			resizable:true,
			padding: 10,
			autoScroll:true,
			bodyStyle: 'background-color: white; padding: 10; word-wrap: break-word;',
			
			html: '<div style="white-space:normal !important;">'+ record.get('observatii') +'</div>'
		});
	},
	
	onAction: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
	
		//Imi trag bodyHTML din baza
		Ext.Ajax.request({
			url: 'http://localhost/couch/signme/' +  record.data._id ,
			async: false,
			success: function(response) {
				if (response.responseText.length > 1) {
					var doc = JSON.parse(response.responseText);
					Ext.Ajax.request({
						url: '/signME/php/generate_doc_pdf.php?user='+user.data.username,
						params: { 'docName': record.data.docName, 'bodyHTML': doc.bodyHTML },
						success: function() { Ext.Msg.alert('Descarcare PDF', '<a target="_blank" href="/signME/data/PDF/'+user.data.username+'/'+record.data.docName+'.pdf">Da un click aici sa descarci PDF.</a>'); },
						failure: function() { Ext.Msg.alert('Fail', 'Fail'); },
						//jsonData: function () { return Ext.JSON.encode(record.data);}
					});
				} else	{
					Ext.Msg.alert('Eroare aducere document din baza');
				}
			}
		});
	},
	
	onAttach: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		for (item in record.data._attachments)
			window.open('http://localhost/couch/signme/' + record.data._id + '/' + item);
	}


});
