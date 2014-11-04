<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "nameDataBase";
$tableName= "nameTable";
 		
$myCon = mysqli_connect($host,$user,$password,$database);
  
  if(mysqli_connect_errno())
  {
  	echo "error connection";
	exit();
  }	
   else
     {
		$sql = "Select *  from $tableName ORDER BY pontuation";
		$res = mysqli_query($myCon,$sql);
		
		if($res){
			if(mysqli_num_rows($res)==0){
				print "No Ranking Yet!";
			}else{
				$tableAnser="";
				for($row=1;$row<=mysqli_num_rows($res);$row++){
					$record = mysqli_fetch_assoc($res);
					$tableAnser+=$record+"<br>"; // maybe it is not working...		
				
				}
				echo $tableAnser;
			}
			
		}else{
			print("Problem at ".mysqli_errno($myCon)." <br/>");
		}		
	
		
	}	
		
    mysqli_close($myCon);	
 		
 	
 ?>