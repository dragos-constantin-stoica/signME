Ext.define('signME.controller.Profile', {
    extend: 'Ext.app.Controller',

    stores: [
        'Profile',
		'UserAll',
    ],
    views: [
        'Profile',
    ],
    init: function() {
        this.control({
			"button[id=saveButton]": {
                click: this.onSaveClick
            },
        });
			
		var store = this.getProfileStore();
		store.load(function(records, operation, success) {
			var view = Ext.getCmp('profileView');

			var record = this.findRecord("username", user.data.username, 0, false, true, true);
			view.up('form').loadRecord(record);
		});

    },


	onSaveClick: function(button, e, options) {
		var store = this.getProfileStore();

		store.filter([
			{
				property: 'username',
				value   : user.data.username
			}
		]);
		
		button.up('form').getForm().updateRecord(store.first());
		store.commitChanges();
		store.sync();
		store.reload();
		
		//Actualizez si user all
		//Ext.getStore("UserAll").reload();
		Ext.getCmp('userAllGrid').getStore().reload();
		
		var sb = Ext.getCmp('win-statusbar');
		sb.setStatus({
			text: 'Datele au fost salvate cu succes!',
			iconCls: 'x-status-error',
			clear: true // auto-clear after a set interval
		});
	},
	
	updateGrid: function() {
		// called when the currently logged user is edited in the users view
		var store = Ext.create('signME.store.Profile');

		store.load(function(records, operation, success) {
			var view = Ext.getCmp('profileView');

			var record = store.first();
			view.up('form').loadRecord(record);
		});
	}


});