<?php

set_time_limit(0);
date_default_timezone_set('UTC');

require __DIR__.'/../vendor/autoload.php';

/////// CONFIG ///////
$username = '';
$password = '';
$debug = true;
$truncatedDebug = false;
//////////////////////

$ig = new \InstagramAPI\Instagram($debug, $truncatedDebug);

try {
    $ig->setUser($username, $password);
    $loginResponse = $ig->login();

    if (!is_null($loginResponse) && $loginResponse->getTwoFactorRequired()) {
        $twoFactorIdentifier = $loginResponse->getTwoFactorInfo()->getTwoFactorIdentifier();

         // The "STDIN" lets you paste the code via terminal for testing.
         // You should replace this line with the logic you want.
         // The verification code will be sent by Instagram via SMS.
        $verificationCode = trim(fgets(STDIN));
        $ig->twoFactorLogin($verificationCode, $twoFactorIdentifier);
    }
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
}
