function(doc) { 
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="userStore"){
	emit(doc._id, doc);
}
}