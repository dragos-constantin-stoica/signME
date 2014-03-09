function(doc){
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="userStore" && doc.isManager==true){
	emit(doc.departament, doc);
	}
}