Ext.define('signME.model.OrgChart', {
	extend: 'Ext.data.Model',
	
	fields: [
	{name: 'department_employee', type: 'string'},
	{name: 'isManager',  type: 'boolean'},
	{name: 'isAdmin',    type: 'boolean'}
	]
});