Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Ext.ux', 'extjs/examples/ux/');

Ext.require([
'Ext.panel.Panel',
'Ext.button.Button',
'Ext.window.Window',
'Ext.ux.statusbar.StatusBar',
'Ext.toolbar.TextItem',
'Ext.menu.Menu',
'Ext.toolbar.Spacer',
'Ext.button.Split',
'Ext.form.field.TextArea',
'Ext.Viewport',
'Ext.data.JsonStore',
'Ext.tip.QuickTipManager',
'Ext.tab.Panel',
'Ext.ux.GroupTabPanel',
'Ext.grid.*',
'Ext.data.*',
'Ext.tree.*',
'Ext.ux.CheckColumn',
'Ext.form.field.Text',
'Ext.util.Filter',
'Ext.ux.grid.FiltersFeature',
]);

Ext.application({
    name: 'signME',
	
	autoCreateViewport: false,
	appFolder: 'app',
	controllers: [
	'User',
	'Login',
	'Main',
	'Profile',
	'RequestStatus',
	'History',
	'Messages',
	'OrgChart',
	'Template',
	'UserAll',
	'CurrentTask',
	'DocEditor',
	'Delegare'
	],
	models: [
	'User',
	'UserAll',
	'OrgChart',
	'Messages',
	'Document',
	'Template',
	'Flow',
	],
    stores: [
	'User',
	'UserAll',
	'OrgChart',
	'Messages',
	'Profile',
	'RequestStatus',
	'History',
	'Template',
	'CurrentTask',
	'Flow',
	'Managers'
	],
    views: [
	'Viewport',
	'Main',
	'UserAll',
	'OrgChart',
	'Messages',
	'Profile',
	'DocEditor',
	'RequestStatus',
	'History',
	'Template',
	'CurrentTask',
	'AdminMenu',
	'NonAdminMenu',
	'Delegare'
    ],	
	
    launch: function() {
		
		signME.myAppGlobal = this;
		user = this.getController('signME.controller.User').getUser();
		var store = Ext.create('signME.store.User');	

		if(!user.data.loggedIn) {
			Ext.create('signME.view.Viewport', {id: 'viewport'}).show();
			Ext.create('signME.view.LoginForm', {id:'loginform'}).show();
		}
		else
		{		  
			Ext.create('signME.view.Main',{id:'mainview'}).show();
		}
		
	}
	
});

signME = {
		getLoggedUser : function() {
			this.getController('signME.controller.User').getUser();
		}
};