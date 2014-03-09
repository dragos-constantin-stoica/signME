<?php
require_once('../tcpdf/config/lang/eng.php');
require_once('../tcpdf/tcpdf.php');


$Titlu = $_REQUEST["docName"];
// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator('SignME');
$pdf->SetAuthor('SignME');
$pdf->SetTitle($Titlu);
//$pdf->SetSubject('TCPDF Tutorial');
//$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
// $pdf->SetHeaderData("nova/nova_logo.PNG", PDF_HEADER_LOGO_WIDTH-5, $Titlu, "\nhttp://www.novaintermed.ro/");

// set header and footer fonts
// $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
// $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

//set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

//set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

//set some language-dependent strings
$pdf->setLanguageArray($l);

// ---------------------------------------------------------

/*
NOTES:
 - To create self-signed signature: openssl req -x509 -nodes -days 365000 -newkey rsa:1024 -keyout tcpdf.crt -out tcpdf.crt
 - To export crt to p12: openssl pkcs12 -export -in tcpdf.crt -out tcpdf.p12
 - To convert pfx certificate to pem: openssl pkcs12 -in tcpdf.pfx -out tcpdf.crt -nodes
*/

// set certificate file
//$certificate = 'file://../tcpdf/tcpdf.crt';

// set additional information
/*$info = array(
	'Name' => 'TCPDF',
	'Location' => 'Office',
	'Reason' => 'Testing TCPDF',
	'ContactInfo' => 'http://www.tcpdf.org',
	);
*/
// set document signature
//$pdf->setSignature($certificate, $certificate, 'tcpdfdemo', '', 2, $info);

// set font
$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage();

// print a line of text
//$postData = json_decode($HTTP_RAW_POST_DATA);
//$html = $postData["bodyHTML"];

$html = $_REQUEST['bodyHTML'];
$pdf->writeHTML($html, true, false, true,false, '');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// *** set signature appearance ***

// create content for signature (image and/or text)
//$pdf->Image('../tcpdf/images/tcpdf_signature.png', 180, 60, 15, 15, 'PNG');

// define active area for signature appearance
//$pdf->setSignatureAppearance(180, 60, 15, 15);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// *** set an empty signature appearance ***
//$pdf->addEmptySignatureAppearance(180, 80, 15, 15);

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('../data/PDF/'.$_GET["user"].'/'.$_REQUEST["docName"].'.pdf', 'F');

//============================================================+
// END OF FILE
//============================================================+
