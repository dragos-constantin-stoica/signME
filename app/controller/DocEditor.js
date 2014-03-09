Ext.define('signME.controller.DocEditor', {
    extend: 'Ext.app.Controller',

    views: [
        'DocEditor',
    ],
	
    init: function() {
        this.control({
			"combobox[id=template_select]": {
                change: this.onChange
            },
        });
    },


	onChange: function() {
		// iau valoarea din dropdown
		var selected = Ext.getCmp('template_select').findRecordByValue(Ext.getCmp('template_select').getValue());

		tinymce.get('doc_content-inputEl').setContent(selected.data.bodyHTML);
	},
	

});