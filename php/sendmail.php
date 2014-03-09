<?php

$tip_mail = $_GET["tipMail"];
$recipient = $_GET["recipient"];
$pdf_link = $_REQUEST["pdflink"];
$attach_link = $_REQUEST["attachlink"];
$nume_doc = $_REQUEST["docName"];
$mail_body = "";
$subject = "";
if ($tip_mail == "task"){
	$mail_body = "Trebuie sa semnati un document.Mergeti in signME, in tab-ul current tasks."; 
	$subject = "Aveti o sarcina atribuita";
} else if ($tip_mail == "completed") {
	$subject = "Document finalizat";
       $mail_body = "Documentul ".$nume_doc; 
	$mail_body .= " a fost semnat de toata lumea. Mergeti in signME, in tab-ul history pentru a descarca forma finala.";
} else if ($tip_mail == "notificare") {
	$subject = "Notificare document finalizat"; 
	$mail_body = "Documentul ".$nume_doc;
	$mail_body .= " a fost semnat de toata lumea. Acesta este un mesaj de notificare, nu necesita semnatura dvs. Pentru vizualizare dati click: ".$pdf_link;
	$mail_body .= "\n" . "Aveti si documente atasate. Pentru vizualizare dati click: ".$attach_link;

} else if ($tip_mail == "rejected") {
	$subject = "Notificare document respins"; 
	$mail_body = "Documentul solicitat a fost respins. Mergeti in signME, in tab-ul Messages, pentru a vedea motivul respingerii.";
}


mail($recipient, $subject, $mail_body); //mail command :)
?>