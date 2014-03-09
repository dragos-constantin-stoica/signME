Ext.define('signME.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'loggedIn',
            type: 'boolean'
        }, {
            name: 'username',
            type: 'string'
        }, {
            name: 'nume',
            type: 'string'
        }, {
            name: 'prenume',
            type: 'string'
        }, {
            name: 'semnatura',
            type: 'string'
        }, {
			name: 'isAdmin',
			type: 'boolean'
		}, {
			name: 'isManager',
			type: 'boolean'
		}, {
            name: 'departament',
            type: 'string'
        }, {
            name: 'functia',
            type: 'string'
        }
		
    ],

    proxy: {
        type: 'localstorage',
        id: 'userpreference'

    }
});