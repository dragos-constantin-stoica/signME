function(doc) { 
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="templateStore"){
	emit(doc._id, doc);
}
}