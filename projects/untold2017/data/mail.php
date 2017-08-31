<?php
    
    $to = "sense.wrk@gmail.com"; // this is your Email address
    $subject = "Untold Interactive - Start Your Project";
    $from = $_GET['myEmail'];
    $name = $_GET['myName'];
    $company = $_GET['myCompany'];
    $budget = $_GET['myBudget'];
    $details = $_GET['myDetails'];
    $message = $name . " sent the following information" . "\n\n" . "Company: " . $company . "\n\n" . "Budget: " . $budget . "\n\n" . "Details: " . $details;
    $headers = "From:" . $from;

    mail($to,$subject,$message,$headers);

?>