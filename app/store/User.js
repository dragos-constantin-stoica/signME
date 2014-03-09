Ext.define('signME.store.User', {
    extend: 'Ext.data.Store',
    model: 'signME.model.User',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'User',
            model: 'signME.model.User'
        }, cfg)]);
    }
});