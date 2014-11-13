<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "pacmandb";
$tableName= "players";
 		
$myCon = mysqli_connect($host,$user,$password,$database);
  
  if(mysqli_connect_errno())
  {
  	echo "error connection";
	exit();
  }	
   else
     {
		$sql = "Select *  from $tableName ORDER BY player_score desc";
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