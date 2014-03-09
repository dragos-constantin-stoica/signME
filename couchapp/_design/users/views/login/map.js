function(doc){
	if(typeof doc.storage_type !=='undefined' && doc.storage_type=="userStore"){
	emit([doc.username, doc.password],[doc.isAdmin, doc.isManager,doc.nume, doc.prenume, doc.semnatura]);
	}
}