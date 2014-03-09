Ext.define('signME.view.Main', {
    extend: 'Ext.container.Viewport',
	alias: 'widget.mainview',
	
    layout: {
        type: 'border'
	},
	
	
    initComponent: function() {
        var me = this;
		//console.log("View - Main - initComponent");
		Ext.applyIf(me, {
			layout: 'border',
	
			items: [
				{
					//xtype: 'container',
					height: 'auto',
					region: 'north',
					margins: '1 1 1 1',
					padding: '1 1 1 1',
					items: Ext.create('signME.view.MainToolbar', {
						id: 'maintoolbar'
					})
				},
				{
					//xtype: 'container',
					height: 'auto',
					region: 'south',
					margins: '1 1 1 1',
					padding: '1 1 1 1',
					bbar: Ext.create('Ext.ux.StatusBar', {
						id: 'win-statusbar',
						defaultText: 'Ready',
						items: [
							'-',
							'Versiunea 2.0',
							Ext.Date.format(new Date(), 'd-M-Y')
						]
					})
				}
			],
			
			listeners: {
				afterrender: function (main) {
					if (user.data.isAdmin)
					{
						var view = Ext.create('signME.view.AdminMenu');
						main.insert(0, view);
					}
					else
					{
						var view = Ext.create('signME.view.NonAdminMenu');
						main.insert(0, view);
					}
				}
			}
			
		});
		
		me.callParent(arguments);
	}	

});