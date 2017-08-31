<?php
    
    $to = "sense.wrk@gmail.com"; // this is your Email address
    $subject = "BarraWave - Online Form";
    $from = $_GET['myEmail'];
    $name = $_GET['myName'];
    $phone = $_GET['myPhone'];
    $details = $_GET['myDetails'];
    $message = $name . " sent the following information:" . "\n\n" . "Phone: " . $phone . "\n\n" . "Message: " . $details;
    $headers = "From:" . $from;

    mail($to,$subject,$message,$headers);

?>