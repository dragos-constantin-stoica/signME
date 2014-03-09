Ext.define('signME.controller.Login', {
    extend: 'Ext.app.Controller',

    stores: [
        'User'
    ],
    views: [
        'LoginForm',
        'MainToolbar'
    ],
    init: function() {
        this.control({
            "loginform button[id=btnSubmit]": {
                click: this.onLoginClick
            },
            "maintoolbar button[id=btnLogout]": {
                click: this.onLogoutClick
            }
        });
    },

    onLoginClick: function(button, e, options) {
		var form = button.up('loginform').getForm(); // get the basic form
		form.method='GET';
		if (form.isValid()) { // make sure the form contains valid data before submitting
			form.submit({
			params:{
				key:"[\"" + button.up('loginform').getForm().findField('username').getValue() + "\", \"" 
				        + button.up('loginform').getForm().findField('password').getValue() + "\"]"
			},
			success: function(form, action) {		
			   Ext.Msg.alert('Success', action.result.msg);
			},
			failure: function(form, action) {
				if(action.result.rows.length>0){
					var win = button.up('loginform');
					
					signME.controller.User.prototype.saveSession(win.getForm().findField('username').getValue());
					signME.controller.User.prototype.setAttribute('isAdmin',action.result.rows[0].value[0]);
					signME.controller.User.prototype.setAttribute('isManager',action.result.rows[0].value[1]);
					signME.controller.User.prototype.setAttribute('nume',action.result.rows[0].value[2]);
					signME.controller.User.prototype.setAttribute('prenume',action.result.rows[0].value[3]);
					signME.controller.User.prototype.setAttribute('departament',action.result.rows[0].value[4]);
					signME.controller.User.prototype.setAttribute('semnatura',action.result.rows[0].value[5]);
					signME.controller.User.prototype.setAttribute('aDelegat',action.result.rows[0].value[6]);
					signME.controller.User.prototype.setAttribute('isDelegat',action.result.rows[0].value[7]);
					signME.controller.User.prototype.setAttribute('departament_delegare',action.result.rows[0].value[8]);
					signME.controller.User.prototype.setAttribute('user_delegat',action.result.rows[0].value[9]);
					
					signME.controller.Main.prototype.showMainView();
					
					Ext.getCmp('viewport').destroy();
					
					win.destroy();
					
					var store = Ext.getStore('Profile');
					store.load(function(records, operation, success) {
						var view = Ext.getCmp('profileView');
						var record = this.findRecord("username", user.data.username, 0, false, true, true);
						view.up('form').loadRecord(record);
					});
					
				}else{
					Ext.Msg.alert('Fail', 'Failed - user name or password are incorrect!', action.result.msg);
				}
			}
			});
		} else { // display error alert if the data is invalid
			Ext.Msg.alert('Invalid user name or password', 'Please check username and password.')
		}        
    },

    onLogoutClick: function(button, e, options) {
        this.getController('signME.controller.Main').destroyAll();
		Ext.getCmp('mainview').destroy();
        this.getController('signME.controller.User').deleteSession();

        Ext.create('signME.view.Viewport', {id: 'viewport'}).show();
		Ext.create('signME.view.LoginForm', {id:'loginform'}).show();
    }

});