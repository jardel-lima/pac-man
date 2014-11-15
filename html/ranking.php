<?php
$host = "localhost";
$user = "f2014_user9";
$password =  "f2014_user9";
$database = "f2014_user9";
$tableName= "player";
 		
$myCon = mysqli_connect($host,$user,$password,$database); // try to connect to the mysql server
  
  if(mysqli_connect_errno())
  {
  	echo "error connection";
	exit();
  }	
   else
     {
		$sql = "Select *  from $tableName ORDER BY player_score-(player_time/10) desc";
		$res = mysqli_query($myCon,$sql);
		
		if($res){
			if(mysqli_num_rows($res)==0){
				print "No Ranking Yet!";
			}else{
				
				$tableFinal="<table><tr><th>Name</th><th>Score</th><th>Time</th></tr>";
				
				for($row=1;$row<=mysqli_num_rows($res);$row++){
					$tableFinal=$tableFinal."<tr>";
					
					$record = mysqli_fetch_assoc($res);
					
					$tableFinal=$tableFinal."<td>".$record["player_name"]."</td>";
					$tableFinal=$tableFinal."<td>".$record["player_score"]."</td>";
					$tableFinal=$tableFinal."<td>".$record["player_time"]."</td>";
							
					$tableFinal=$tableFinal."</tr>";
				}
				$tableFinal=$tableFinal."</table>";
				echo $tableFinal;
			}
			
		}else{
			print("Problem at ".mysqli_errno($myCon)." <br/>");
		}		
	
		
	}	
		
    mysqli_close($myCon);	
 		
 	
 ?>