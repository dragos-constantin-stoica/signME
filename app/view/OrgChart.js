Ext.define('signME.view.OrgChart', {
	extend: 'Ext.tree.Panel',	
	alias: 'widget.orgChart',
	
	store: 'OrgChart',
	
	title: 'Organizational Chart',
	width: 'auto',
	height: 600,
	collapsible: false,
	useArrows: true,
	rootVisible: false,
	multiSelect: true,
	singleExpand: false,
	
	//the 'columns' property is now 'headers'
	columns: [
	{
		xtype: 'treecolumn', //this is so we know which column will show the tree
		text: 'Department/Employee',
		flex: 2,
		sortable: true,
		width: 'auto',
		dataIndex: 'department_employee',
	},
	{
		xtype: 'checkcolumn',
		text: 'Manager',
		sortable: false,
		dataIndex: 'isManager'           
	},
	{
		xtype: 'checkcolumn',
		header: 'Administrator',
		dataIndex: 'isAdmin',
		stopSelection: false
	}, 
	{
		id: 'editUser',
		text: 'Edit',
		flex: 1,
		width: 40,
		menuDisabled: true,
		xtype: 'actioncolumn',
		tooltip: 'Edit User',
		align: 'center',
		icon: './resources/img/edit_task.png',
	}]

});