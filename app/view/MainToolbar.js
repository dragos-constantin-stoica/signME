Ext.define('signME.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.maintoolbar',

    width: 'auto',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
					xtype: 'tbtext', 
					text: 'signME'
				},
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    id: 'btnLogout',
                    //icon: 'resources/img/logout.png',
                    text: 'Logout'
                }
            ]
        });

        me.callParent(arguments);
    }
});