Ext.define('signME.view.AdminMenu', {
	extend: 'Ext.ux.GroupTabPanel',
	
	id: 'AdminMenu',
	alias: 'widget.AdminMenu',
	activeGroup: 0,
	region: 'center',
	layout: 'fit',
	html: null,
	
	requires: [
        'signME.view.UserAll',
        'signME.view.OrgChart',
        'signME.view.Messages',
        'signME.view.Profile',
        'signME.view.DocEditor',
        'signME.view.RequestStatus',
        'signME.view.History',
        'signME.view.Template',
        'signME.view.CurrentTask',
		'signME.view.Delegare',
    ],
	
	listeners: {
					'beforegroupchange': function(tabPanel, tab){
					}
	},
	
	initComponent: function() {
        var me = this;
		
		var manager = user.data.isManager;
		if (!manager) {
			if (typeof user.data.aDelegat !== "undefined"){
				manager = user.data.aDelegat;
			}
		}
		
		Ext.applyIf(me, {
		
	
			items:[
			{
				xtype: 'tabpanel',
				activeTab: 0,
				expanded: true,
				items: [{
					title: 'Dashboard',
					bodyPadding: 10,
					html: '<h1>Dupa cum puteti vedea in coltul din dreapta jos, aceasta este versiunea 2.0 a aplicatiei, anumite modificari importante au fost facute, asa ca va rugam sa apasati combinatia de taste Shift + F5, pentru a fi siguri ca functionati inca de la inceput pe sursele actualizate. <br> <br> ' +
					'<ul><li>Current task: Vad documente asignate si le semnez;</li>' +
					'<li>Create request: Intiez un document cu fluxul asociat;</li>' +
					'<li>Request status: Vad lista documentelor initiate de mine, in ce pas al fluxurilor au ajuns;</li>' +
					'<li>Messages: Vad mesajele ca entitati separate, cu sender, receiver, si document atasat, dar din aceasta noua versiune, ele pot fi vizualizate si din listele de documente;</li>' +
					'<li>History: Vad lista de documente pe care le-am semnat. Se pot face filtrari si sortari dupa orice camp;</li>' +
					'<li>My profile: Datele personale inregistrate in sistem.</li></ul>' +
					'<br></h1>',
					border: false
					},{
					title: 'Current task',
					bodyPadding: 10,
					items: [{ xtype: 'currentTask' }],
					id: 'currentTask',
					listeners:{
						'activate' : function(panel){
							var store = Ext.getStore('CurrentTask');
							store.reload();
						}
				    }
					}, {
					title: 'Create request',
					bodyPadding: 10,
					items: [{ xtype: 'template' }]
					}, {
					title: 'Request status',
					bodyPadding: 10,
					items:[{ xtype: 'requestStatus' }],
					listeners:{
						'activate' : function(panel){
							var store = Ext.getStore('RequestStatus');
							store.reload();
						}
				    }
					}, {
					title:'Messages',
					bodyPadding: 10,
					items: [{ xtype: 'messages' }],
					listeners:{
						'activate' : function(panel){
							Ext.getStore('Messages').reload();
						}
					}
					},{
					title:'History',
					bodyPadding: 10,
					items:[{ xtype: 'history' }],
					listeners:{
						'activate' : function(panel){
							Ext.getStore('History').reload();
						}
					}
					},{
					title:'My Profile',
					bodyPadding: 10,
					items:[{ xtype: 'myProfile' }]
					},
					{
						title:'Delegare',
						id:'Delegare',
						bodyPadding: 10,
						items:[{ xtype: 'Delegare' }],
						hidden : !manager,
						listeners:{
							'activate' : function(panel){
								Ext.getStore('Managers').reload();
							}
						}
					}
				]
			},
			{
				expanded: true,
				items: [{
					title: 'Admin',
					bodyPadding: 10,
					html: '<h1>Aici este partea de gestionare a utilizatorilor, template-urilor de documente, flow-urilor etc.<br></h1>',
					border: false
					},{
					title:'Organizational chart',
					bodyPadding: 10,
					items:[{ xtype: 'orgChart' }]
					},{
					title:'Users',
					bodyPadding: 10,
					items:[{ xtype: 'userGrid' }]
					},{
					title:'Workflows',
					bodyPadding: 10,
					items : [{
						xtype : "component",
						width:1600,
						height:800,
						autoEl : {
							tag : "iframe",
							src : "http://jsplumb.org/yui3/flowchartConnectorsDemo.html"
						}
					}]},{
					title:'Document templates',
					bodyPadding: 10,
					items:[{ xtype: 'docEditor' }]
				}]
			}
			]
			
		});
		
		me.callParent(arguments);
	},
	
	listeners: {
				beforerender: function () {
					var manager = user.data.isManager;
					if (!manager) {
						if (typeof user.data.aDelegat !== "undefined"){
							manager = user.data.aDelegat;
						}
					}
					if (!manager) { Ext.getCmp('AdminMenu').down('#Delegare').disable(); }
				}
	}
});