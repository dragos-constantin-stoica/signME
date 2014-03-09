function(doc) { 
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="messageStore"){
	emit(doc._id, doc);
}
}