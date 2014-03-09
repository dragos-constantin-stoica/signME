Ext.define('signME.controller.OrgChart', {
    extend: 'Ext.app.Controller',

    stores: [
        'OrgChart',
    ],
    views: [
        'OrgChart',
    ],
    init: function() {
        this.control({
			"actioncolumn[id=editUser]": {
                click: this.onAction
            },
        });
    },

	onAction: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
	}

});