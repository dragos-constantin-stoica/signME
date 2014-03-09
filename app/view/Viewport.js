Ext.define('signME.view.Viewport', {
    extend: 'Ext.container.Viewport',
	alias: 'widget.viewport',
	
    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

		Ext.applyIf(me,{
			 layout: 'border'
			,componentLayout: ''
			,items: [
				{
                    //xtype: 'container',
                    height: 'auto',
                    region: 'north',
					margins: '0',
					padding: '0'
                },
                {
                    //xtype: 'container',
                    height: 'auto',
                    region: 'south',
					margins: '0',
					padding: '0'
                },
				{
					 region: 'center'
					,layout: 'fit' 
					,html: 
					"<p align='center'>" +
					" <br><br>" +
					"    <img src='resources/img/logo_novaintermed.gif' alt='Novaintermed' />" +
					//"    <img src='resources/img/logo_ph.png' alt='Company logo' />" +
					" &nbsp;&nbsp;" +
					"    <img src='resources/img/logo_nova.png' alt='Logo signME' />" +
					"</p>"
				}
			]
		});
        me.callParent(arguments);
    }
});