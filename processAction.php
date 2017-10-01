<?php
header('Access-Control-Allow-Origin: *');
error_reporting(0);
date_default_timezone_set('UTC');
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
        case 'password_hash':
			respond(['error' => false, 'message' => password_hash($input, PASSWORD_DEFAULT)]);
            break;
		
		/**
		 * Strings
		 */
		case 'string_length':
		    respond(['error' => false, 'message' => strlen($input)]);
		    break;

        case 'word_count':
            respond(['error' => false, 'message' => str_word_count($input)]);
            break;

        case 'word_frequency':
            respond(['error' => false, 'message' => print_r(array_count_values(str_word_count($input, 1)),1)]);
            break;

        case 'remove_spaces':
            respond(['error' => false, 'message' => str_replace(' ', '', $input)]);
            break;

        case 'remove_new_lines':
            respond(['error' => false, 'message' => str_replace(array("\r\n","\n","\r"),"",$input)]);
            break;

        case 'remove_spaces_and_new_lines':
            respond(
            [
                'error' => false,
                'message' => preg_replace(
                    "/(\t|\n|\v|\f|\r| |\xC2\x85|\xc2\xa0|\xe1\xa0\x8e|\xe2\x80[\x80-\x8D]|\xe2\x80\xa8|\xe2\x80\xa9|\xe2\x80\xaF|\xe2\x81\x9f|\xe2\x81\xa0|\xe3\x80\x80|\xef\xbb\xbf)+/",
                    "",
                    $input
                )
            ]);
            break;

		case 'generate_string':
		case 'generate_string_with_special_characters':
			$length      = $input && is_numeric($input) && $input < 1000 ? (int) $input : 32;
			$withSpecial = $action == 'generate_string' ? false : true;
			$string      = randomString($length, $withSpecial);
			respond(['error' => false, 'message' => $string]);
			break;

        /** Date and time */
        case 'current_timestamp':
            respond(['error' => false, 'message' => strtotime( date( 'Y/m/d H:i:s'))]);
            break;
		case 'timestamp_to_date':
            respond(['error' => false, 'message' => gmdate("Y/m/d H:i:s",trim($input))]);
		    break;
		case 'date_to_timestamp':
		    $date = new DateTime(trim($input));
            respond(['error' => false, 'message' => $date->getTimestamp()]);
		    break;

		default:
			respond(['error' => true, 'message' => 'Action not implemented']);
			break;
	}
} catch(Exception $e) {
	respond(['error' => true, 'message' => 'There was an error processing your request.']);
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