Ext.define('signME.controller.Delegare', {
    extend: 'Ext.app.Controller',

    stores: [
        'Managers',
    ],
    views: [
        'Delegare',
    ],
    init: function() {
        this.control({
			"button[id=delegareButton]": {
                click: this.onDelegareClick
            },
			
			"button[id=cancelDelegareButton]": {
                click: this.onCancelDelegareClick
            }
        });
    },

	onDelegareClick: function() {
		var me = Ext.getCmp('delegareView');
		var store = me.getStore();
		var selectedRow = me.getSelectionModel().getSelection()[0];
		
		var profileStore = Ext.getStore('Profile');
		var userRecord = profileStore.findRecord("username", user.data.username, 0, false, true, true);
		userRecord.beginEdit();
		userRecord.set("isManager", false);
		userRecord.set("aDelegat", true);
		userRecord.endEdit();
		profileStore.commitChanges();
		profileStore.sync();
		profileStore.reload();
		
		selectedRow.beginEdit();
		selectedRow.set("isDelegat", true);
		selectedRow.set("departament_delegare", user.data.departament);
		selectedRow.set("user_delegat", user.data.username);
		selectedRow.endEdit();
		store.commitChanges();
		store.sync();
		//store.reload();
	},
	
	onCancelDelegareClick: function() {
		var me = Ext.getCmp('delegareView');
		var store = me.getStore();
		var selectedRow = me.getSelectionModel().getSelection()[0];
		
		if (user.data.username != selectedRow.get("user_delegat")){
			Ext.Msg.alert('Nu puteti anula o delegare facuta de alta manager!!!');
			return;
		}
		var profileStore = Ext.getStore('Profile');
		var userRecord = profileStore.findRecord("username", user.data.username, 0, false, true, true);
		userRecord.beginEdit();
		userRecord.set("isManager", true);
		userRecord.set("aDelegat", false);
		userRecord.endEdit();
		profileStore.commitChanges();
		profileStore.sync();
		profileStore.reload();
		
		selectedRow.beginEdit();
		selectedRow.set("isDelegat", false);
		selectedRow.set("departament_delegare", null);
		selectedRow.set("user_delegat", null);
		selectedRow.endEdit();
		store.commitChanges();
		store.sync();
		//store.reload();
	}

});