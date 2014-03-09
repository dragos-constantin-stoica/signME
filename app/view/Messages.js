Ext.define('signME.view.Messages', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.messages',
	
	store: 'Messages',
	
	title: 'Mesaje/Notificari',
	
	id: 'messagesView',

	columns: [
		{
			header:'Primit de la',
			dataIndex:'sender',
			//flex:1,
			width:100
		},
		{
			header:'Mesaj',
			dataIndex: 'message',
			width:200,
			flex:1
		},
		{
			header:'Document',
			dataIndex: 'document',
			width:200
		}
	],
	listeners: {
				beforerender: function (main) {
					this.getStore().filter('receiver', user.data.username);
				}
			}

});