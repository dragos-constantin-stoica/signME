Ext.define('signME.controller.Messages', {
    extend: 'Ext.app.Controller',

    stores: [
        'Messages',
    ],
    views: [
        'Messages',
    ],
    init: function() {
        this.control();
			
		var store = this.getMessagesStore();
		store.filter([
			{
				property: 'receiver',
				value   : user.data.username
			}
		]);
    },

});