<?php
/**
 * This is a little proxy to work around same origin restrictions,
 * so weg can get the interactions despite beeing served from
 * another host.
 */

if(isset($_GET['host']) && isset($_GET['guid'])) {
  // Construct interactions-url
  $host = $_GET['host'];
  $guid = $_GET['guid'];
  $url = "https://$host/posts/$guid/interactions.json";
  
  // Load url
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
  curl_setopt($ch, CURLOPT_URL, $url);

  $content = curl_exec($ch);
  curl_close($ch);
  
  echo $content;
}

?>