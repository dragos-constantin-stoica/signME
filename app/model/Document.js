Ext.define('signME.model.Document', {
    extend: 'Ext.data.Model',
	
    fields: [{name: '_id', type: 'string', optional: true},
    {name: '_rev', type: 'string', optional: true},
    {name: '_attachments', optional: true},
    {name: 'storage_type', type:'string', mapping:'storage_type', defaultValue:'docStore'},
    'docName', 'docStatus', 'startDate', 'endDate', 'estimatedFinishDate', 'authorKey', 'authorName', 'asigneeKey', 'asigneeName', 'contributorsList', 
    'currentStateKey', 'currentStateName', 'actiuni', 'bodyHTML', 'template', 'observatii', 
	{name: 'isPrelucrat', type: 'boolean'}],
	
	idProperty: '_id',
    /*,
	hasOne: [{
		name: 'template',
		model: 'Template',
		associationKey: 'template' // <- this is the same as what is in the JSON response
    }
    ]*/
});