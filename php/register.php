<?php
	$host = "localhost";
	$user = "root";
	$password =  "user";
	$database = "pacman";
	$tableName= "players";
 		
	$myCon = mysqli_connect($host,$user,$password,$database); // try to connect to the mysql server
  
  	if(mysqli_connect_errno())
  	{
  		echo "error connection";
		exit();
  	}	
  	else
    { 
		// get the q parameter from URL
		$func=$_REQUEST["func"];
		
		if($func=="1"){
		
			$sql = "Select * from $tableName";
			$res = mysqli_query($myCon,$sql);
			
			if($res){
				if(mysqli_num_rows($res)==0){
					echo 0;
				}else{
					
					echo mysqli_num_rows($res);
				}
			}
			else{
				print("Problem at ".mysqli_errno($myCon)." <br/>");
				echo "ERROR :".mysqli_errno($myCon);
			}
		
		}
		else if($func=="2"){
			
		}

		
	}	
		
    mysqli_close($myCon);	
 
 ?>
