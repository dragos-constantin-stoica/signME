Ext.define('signME.controller.User', {
    extend: 'Ext.app.Controller',

    stores: ['User'],
	
    init: function() {
        this.control({
        });

        var store = this.getUserStore();
        store.load();
		
		// clear all the empty records
		store.filterBy( function( rec, id ){
			return rec.data.username != '';
		});	
		store.sync();
		
		
        user = store.first();
        if(!user){
            store.add({});
            user = store.first();
            store.sync();
        }

    },

    saveSession: function(username) {
        user.set('loggedIn', true);
        user.set('username', username);
        user.save();
    },

	setAttribute: function(attr_name, attr_value){
		user.set(attr_name,attr_value);
		user.save();
	},
	
    deleteSession: function() {
        user.destroy();
        var store = this.getUserStore();
		store.load();
		store.removeAll();
        store.sync();
    },

    getUser: function() {
        return user;
    }

});