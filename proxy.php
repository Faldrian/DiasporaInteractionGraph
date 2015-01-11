<?php
/**
 * This is a little proxy to work around same origin restrictions,
 * so weg can get the interactions despite beeing served from
 * another host.
 */

if(isset($_GET['host']) && isset($_GET['guid'])) {
  header('Content-Type: application/json; charset=utf-8');

  // Construct interactions-url
  $host = $_GET['host'];
  $guid = $_GET['guid'];
  $url = "https://$host/posts/$guid/interactions.json";

  // Load url
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_URL, $url);

  curl_exec($ch);
  curl_close($ch);
}
?>