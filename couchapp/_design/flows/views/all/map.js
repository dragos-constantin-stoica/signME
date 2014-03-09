function(doc) { 
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="flowStore"){
	emit(doc.flowKey, doc);
}
}