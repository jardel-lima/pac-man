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
		
			$sql = "SELECT * FROM $tableName";
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
			$name = $_REQUEST["name"];
			$score = $_REQUEST["score"];
			$time = $_REQUEST["time"];
			
			$sql = "SELECT player_name FROM $tableName";
			$result = mysqli_query($myCon, $sql);

			if (mysqli_num_rows($result) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result)) {
					
					if($row['player_name']==$name){
						
						$sql = "UPDATE $tableName SET player_score= $score, player_time= $time WHERE player_name = '$name' ";

						if (mysqli_query($myCon, $sql)) {
							echo "Record updated successfully";
						} else {
							echo "Error updating record: " . mysqli_error($myCon);
						}
						$name = null;
						break;
					}
				}
			}
			if($name!=null){
				
				$sql = "INSERT INTO $tableName (player_name, player_score, player_time)VALUES ('$name', $score, $time)";

				if (mysqli_query($myCon, $sql)){
					echo "New record created successfully";
				}
				else{
		   			 echo "Error: " . $sql . "<br>" . mysqli_error($myCon);
				}
			}
		}
		
	}	
		
    mysqli_close($myCon);	
 
 ?>
