Ext.define('signME.controller.RequestStatus', {
    extend: 'Ext.app.Controller',

    stores: [
        'RequestStatus',
    ],
    views: [
        'RequestStatus',
    ],
    init: function() {
        this.control({
			"actioncolumn[id=previewPartialDoc]": {
                click: this.onAction
            },
			
			"actioncolumn[id=viewObsR]": {
                click: this.onViewObs
            },
			
			"actioncolumn[id=viewAttachReqStatus]": {
                click: this.onAttach
            },
        });
			
		var store = Ext.create('signME.store.RequestStatus');
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
					Ext.create('Ext.window.Window', {
						height:600,
						width:500,
						modal:true,
						title:'Documentul in forma partiala',
						layout:'anchor',
						requires:['Ext.form.Panel', 'Ext.form.field.Text'],
						autoShow:true,
						draggable:true,
						resizable:true,
						autoScroll:true,
						padding: 10,
						bodyStyle: 'background-color: white; padding: 10;',
						
						html: doc.bodyHTML.replace('../data/signatures','data/signatures'),
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
