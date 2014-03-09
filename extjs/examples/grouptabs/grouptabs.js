Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.require([
'Ext.panel.Panel',
'Ext.button.Button',
'Ext.window.Window',
'Ext.ux.statusbar.StatusBar',
'Ext.toolbar.TextItem',
'Ext.menu.Menu',
'Ext.toolbar.Spacer',
'Ext.button.Split',
'Ext.form.field.TextArea'
]);
Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();
	
    // create some portlet tools using built in Ext tool ids
    var tools = [{
        type: 'gear',
        handler: function () {
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
		}
		}, {
        type: 'close',
        handler: function (e, target, panel) {
            panel.ownerCt.remove(panel, true);
		}
	}];
	
    Ext.create('Ext.Viewport', {
        layout: 'border',
		
		items: [
		{
            collapsible: false,
            split: false,
            height: 'auto',			
			region: 'north',
			html: '[signME logo] - menu bar - logout',
			border: false,
			margins: '1 1 1 1',
			padding: '1 1 1 1'
		},
		{
			region: 'south',
			split: false,
			collapsible: false,
			padding: '1 1 1 1',
			bbar: Ext.create('Ext.ux.StatusBar', {
				id: 'win-statusbar',
				defaultText: 'Ready',
				items: [ 
				'-',
				Ext.Date.format(new Date(), 'd-M-Y') 
				]
			}),	
		},
		{
            xtype: 'grouptabpanel',
            activeGroup: 0,
			region: 'center',
            items: [
			{
                mainItem: 1,
                items: [{
                    title: 'Tickets',
                    iconCls: 'x-icon-tickets',
                    tabTip: 'Tickets tabtip',
                    //border: false,
                    xtype: 'gridportlet',
                    margin: '10',
                    height: null
					}, {
                    xtype: 'portalpanel',
                    title: 'Dashboard',
                    tabTip: 'Dashboard tabtip',
                    border: false,
                    items: [{
                        flex: 1,
                        items: [{
                            title: 'Portlet 1',
                            html: '<div class="portlet-content">' + Ext.example.bogusMarkup + '</div>'
							}, {
							
                            title: 'Stock Portlet',
                            items: {
                                xtype: 'chartportlet'
							}
							}, {
                            title: 'Portlet 2',
                            html: '<div class="portlet-content">' + Ext.example.bogusMarkup + '</div>'
						}]
					}]
					}, {
                    title: 'Subscriptions',
                    iconCls: 'x-icon-subscriptions',
                    tabTip: 'Subscriptions tabtip',
                    style: 'padding: 10px;',
                    border: false,
                    layout: 'fit',
                    items: [{
                        xtype: 'tabpanel',
                        activeTab: 1,
                        items: [{
                            title: 'Nested Tabs',
                            html: Ext.example.shortBogusMarkup
						}]
					}]
					}, {
                    title: 'Users',
                    iconCls: 'x-icon-users',
                    tabTip: 'Users tabtip',
                    style: 'padding: 10px;',
                    html: Ext.example.shortBogusMarkup
				}]
			}, {
                expanded: true,
                items: [{
                    title: 'Configuration',
                    iconCls: 'x-icon-configuration',
                    tabTip: 'Configuration tabtip',
                    style: 'padding: 10px;',
                    html: Ext.example.shortBogusMarkup
					}, {
                    title: 'Email Templates',
                    iconCls: 'x-icon-templates',
                    tabTip: 'Templates tabtip',
                    style: 'padding: 10px;',
                    border: false,
                    items: {
                        xtype: 'form',
                        // since we are not using the default 'panel' xtype, we must specify it
                        id: 'form-panel',
                        labelWidth: 75,
                        title: 'Form Layout',
                        bodyStyle: 'padding:15px',
                        labelPad: 20,
                        defaults: {
                            width: 230,
                            labelSeparator: '',
                            msgTarget: 'side'
						},
                        defaultType: 'textfield',
                        items: [{
                            fieldLabel: 'First Name',
                            name: 'first',
                            allowBlank: false
							}, {
                            fieldLabel: 'Last Name',
                            name: 'last'
							}, {
                            fieldLabel: 'Company',
                            name: 'company'
							}, {
                            fieldLabel: 'Email',
                            name: 'email',
                            vtype: 'email'
						}],
                        buttons: [{
                            text: 'Save'
							}, {
                            text: 'Cancel'
						}]
					}
				}]
			}, {
                expanded: false,
                items: {
                    title: 'Single item in third',
                    bodyPadding: 10,
                    html: '<h1>The third tab group only has a single entry.<br>This is to test the tab being tagged with both "first" and "last" classes to ensure rounded corners are applied top and bottom</h1>',
                    border: false
				}
			}]
		}]
	});
});