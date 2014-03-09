<?php
// Se ocupa de encodarea imaginii

	if ($_FILES)
	{
		$data = file_get_contents($_FILES['filedata-inputEl']['tmp_name']);
		echo json_encode(array('success' => 'true', 'name' => $_FILES['filedata-inputEl']['name'], 'type' => $_FILES['filedata-inputEl']['type'], 'data' => base64_encode($data)));
	}
	else
		echo "{success: false}";

?>