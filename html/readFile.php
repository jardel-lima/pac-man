
<?php
	$fileName = $_GET['fileName'];

	if(!file_exists($fileName)){ //check if file exists
		print("File not found");
		exit();
	}else{ //file exits
		$fileSize = filesize($fileName);
		
		if($fileSize==0){ //if file size == 0 file is empty
			print("File empty!");
                        fclose($fh);
			
		}else{ //file not empty
			$fh = fopen($fileName,"r"); // open file to read
			while(!feof($fh)){ //it will read the file line by line until its end.
				$line = fgets($fh); // read the line
				print($line);
				}
			fclose($fh);
			}
	
	
	
}




?>

