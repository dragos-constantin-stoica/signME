Ext.define('signME.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginform',

    draggable: true,
    floating: true,
    frame: true,
    height: 155,
    width: 302,
    bodyPadding: 10,
    title: 'Login',
    url: '/couch/signme/_design/users/_view/login',

    initComponent: function() {
        var me = this;

        me.initialConfig = Ext.apply({
            url: '/couch/signme/_design/users/_view/login'
        }, me.initialConfig);

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            id: 'btnSubmit',
                            text: 'Login'
                        }
                    ]
                }
            ],
            items: [
			{
                    xtype: 'textfield',
                    name: 'username',
                    fieldLabel: 'Nume utilizator',
                    allowBlank: false,
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: 'Parola',
                    allowBlank: false,
                    anchor: '100%'
                }
            ]
        });

        me.callParent(arguments);
    }

});