Ext.define('signME.model.UserAll', {
	extend: 'Ext.data.Model',
	
	fields: [
	{name: '_id', type: 'string', optional: true},
	{name: '_rev', type: 'string', optional: true},
	{name: 'storage_type', type:'string', mapping:'storage_type', defaultValue:'userStore'},
	'username','password',
	{name:'isAdmin', type:'boolean'},
	{name:'isManager', type:'boolean'},
	{name:'isDelegat', type:'boolean'},
	{name: 'aDelegat', type:'boolean'},
	'user_delegat','departament_delegare','functia','departament','nume','prenume', 'sex', 'varsta', 'mail', 'telefon',
	{name:'semnatura', type:'string', defaultValue:'signME/data/signatures/'}],
	
	idProperty : '_id',
	
});