<?php
	
	include("start.php");

	switch ($operation) {

		case 'login':

			include("controllers/user.php");
			(new User())->login($request, $mysqli);
			break;
		
	}
