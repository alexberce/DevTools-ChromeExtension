<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);

// TODO: Allow access only with a valid token

try {
	$action = $_REQUEST['action'];
	$input  = $_REQUEST['input'];
	
	switch ($action) {
		/**
		 * Encoding
		 */
		case 'base64_encode':
			respond(['error' => false, 'message' => (string) base64_encode($input)]);
			break;
		case 'base64_decode':
			respond(['error' => false, 'message' => (string) base64_decode($input)]);
			break;
		
		/**
		 * Encryption
		 */
		case 'md5':
			respond(['error' => false, 'message' => md5($input)]);
			break;
		case 'sha1':
			respond(['error' => false, 'message' => sha1($input)]);
			break;
		
		/**
		 * Generation
		 */
		case 'generate_string':
		case 'generate_string_with_special_characters':
			$length      = $input && is_numeric($input) && $input < 1000 ? (int) $input : 32;
			$withSpecial = $action == 'generate_string' ? false : true;
			$string      = randomString($length, $withSpecial);
			respond(['error' => false, 'message' => $string]);
			break;
		
		default:
			respond(['error' => true, 'message' => 'Action not implemented']);
			break;
	}
} catch(Exception $e) {
	respond(['error' => true, 'message' => 'There was an error processing your request']);
}


function randomString($length, $withSpecial)
{
	$alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	$special      = '~!@#$%^&*(){}[],./?';
	$alphabet     = !$withSpecial ? $alphaNumeric : ($alphaNumeric . $special);
	
	$random = openssl_random_pseudo_bytes($length);
	$string = '';
	for ($i = 0; $i < $length; ++$i) {
		$string .= $alphabet[ord($random[$i]) % strlen($alphabet)];
	}
	
	return $string;
}

function respond($message)
{
	echo json_encode($message);
}