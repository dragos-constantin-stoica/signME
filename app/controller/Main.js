Ext.define('signME.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'MainToolbar',
		'Main'
    ],
    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        }
    ],

    init: function() {
        this.control({
        });
		
    },

    showMainView: function() {
	    //mainView = Ext.create('signME.view.Main',{});
	    //center_container = this.getViewport().down('container[region=center]'); 
        //center_container.add(mainView);
		var main = Ext.create('signME.view.Main', {id:'mainview'}).show();
		
        //mainToolBar = Ext.getCmp('maintoolbar');
        //north_container = this.getViewport().down('container[region=north]'); 
        //north_container.add(mainToolBar);
        var sb = Ext.getCmp('win-statusbar');
		sb.setStatus({
			text: 'Logged in!',
			iconCls: 'x-status-error',
			clear: true // auto-clear after a set interval
		});
	},

    destroyAll: function() {
		var sb = Ext.getCmp('win-statusbar');
		sb.setStatus({
			text: 'Logged-out!',
			iconCls: 'x-status-error',
			clear: true // auto-clear after a set interval
		});        
		mainToolBar = Ext.getCmp('maintoolbar');
		mainToolBar.destroy();
        this.destroy();
    },

});