<?php
namespace App;
use PDO;
class UserController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	public function addUser()
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_USER_PROC(".$quotes.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		$i=1;
		try{
			foreach($input as $key => $value){
				$stmt->bindParam($i,$input->$key);
				$i++;
			}
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function getAllUsers()
    {
		$sql = "SELECT a.USER_ID,a.FIRST_NAME,a.LAST_NAME,a.DESIGNATION,a.DESCRIPTION,a.USERNAME,a.USER_ROLE,a.IS_ACTIVE,a.BADGE_ID, a.USER_PROFILE_ID,a.USER_PREFERENCES_ID,b.CITY,b.COUNTRY,b.ADDRESS_LINE1,b.ADDRESS_LINE2,b.ADDRESS_LINE3,b.ADDRESS_LINE4,a.BILLING_ADDRESS_ID,a.PRIMARY_EMAIL_ID,a.WORK_PHONE,a.CELL_PHONE,IMAGE FROM PRIN_USER a inner join PRIN_LOCATION b ON a.LOCATION_ID = b.LOCATION_ID";
		$db = getDB();
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($user)) {
				echo '{"status":"success","response": ' . json_encode($user) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No users Found"}}';
			}
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
    }
	
	public function getUserbyId($id)
    {
		$sql = "SELECT pu.USER_ID,AES_DECRYPT(pu.PASSWORD, 'passw') AS PASSWORD,pu.FIRST_NAME,pu.LAST_NAME,pu.DESIGNATION,pu.DESCRIPTION,pu.USERNAME,pu.USER_ROLE,pu.IS_ACTIVE,pu.BADGE_ID,	pu.USER_PROFILE_ID,pu.USER_PREFERENCES_ID,pu.LOCATION_ID,pu.BILLING_ADDRESS_ID,pu.PRIMARY_EMAIL_ID,pu.WORK_PHONE,pu.CELL_PHONE,pu.IMAGE,pl.ADDRESS_LINE1,pl.ADDRESS_LINE2,pl.ADDRESS_LINE3,pl.ADDRESS_LINE4,pl.CITY,pl.STATE,pl.COUNTRY FROM PRIN_USER pu JOIN PRIN_LOCATION pl on pl.LOCATION_ID = pu.LOCATION_ID WHERE pu.USER_ID=".$id;
		$db = getDB();
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			
			if(!empty($user)) {
				echo '{"status":"success","response": ' . json_encode($user) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No users Found"}}';
			}
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
    }
	/***************************
		@Created by :- 5838
		@created by :- 12-dec-2016
		@ Forgot password functionality 
	**********************************/
	
	public function forgetPassword(){
		
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		
		$sql = "SELECT USER_ID,AES_DECRYPT(PASSWORD, 'passw') as pwd,FIRST_NAME FROM PRIN_USER WHERE PRIMARY_EMAIL_ID ='".$input->email."'";
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($user[0])) {
				$to = $input->email;
				$subject = "Forgot Password";
				$message = 'Dear '.$user[0]->FIRST_NAME.',<br/>You requested that your password be sent to you because it was forgotten or lost.<br/>Your login name is your email address: '.$input->email.'<br/>Your password is: '.$user[0]->pwd.'';
				 
				 $header = "From:info@previnsights.com \r\n";
				 $header .= "MIME-Version: 1.0\r\n";
				 $header .= "Content-type: text/html\r\n";
				 $retval = mail ($to,$subject,$message,$header);
				 
				echo '{"status":"success","response": ' . json_encode($user[0]) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"Email is not registered!"}}';
			}
			
			//$response_array['status'] = 'success';
	
		}catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';	
		}

	}
	/****** End ********/
	
	public function proc_qoutes($input) {
		$qts = "";
		foreach($input as $key) {
			$qts .= "?,";
		}
		return rtrim($qts,",");
	}
}