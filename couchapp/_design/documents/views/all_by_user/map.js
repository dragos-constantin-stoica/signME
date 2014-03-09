function(doc) { 
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=='docStore'){
		if (doc.authorKey !== 'undefined'){
			emit(doc.authorKey , doc);
		} else {
			return; //e o duda daca nu are autor
		}
		var asignee = "";
		if (typeof doc.asigneeKey !== 'undefined'){
			asignee = doc.asigneeKey;
			emit(doc.asigneeKey , doc);
		}
		if (typeof doc.actiuni !== 'undefined'){
			for(var key in doc.actiuni){
            			var actiune= doc.actiuni[key];
				if (actiune.user != asignee && actiune.user != doc.authorKey){
					emit(actiune.user, doc);
				}
			}	
		}
	}
}