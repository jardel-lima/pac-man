<?php
$host = "localhost";
$user = "root";//"f2014_user9";
$password = ""; //"f2014_user9";
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
		$sql = "Select *  from $tableName ORDER BY player_score desc, player_time";
		$res = mysqli_query($myCon,$sql);
		
		if($res){
			if(mysqli_num_rows($res)==0){
				print "No Ranking Yet!";
			}else{
				
				$tableFinal="<table><tr><th>Position</th><th>Name</th><th>Score</th><th>Time</th></tr>";
				
				for($row=1;$row<=mysqli_num_rows($res);$row++){
                                    $aux = $row;
                                    
                                    if($aux>19)
                                        while($aux>9)
                                            $aux-=10;
                                    if($aux==1)
                                        $word="st";
                                        elseif ($aux==2)
                                               $word = "nd";
                                        elseif($aux==3)
                                                $word ="rd";
                                        else
                                            $word= "th";
                                   
					$tableFinal=$tableFinal."<tr>";
					
					$record = mysqli_fetch_assoc($res);
                                        
					$tableFinal=$tableFinal."<td>$row"."$word</td>";
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