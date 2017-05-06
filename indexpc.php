<!DOCTYPE html>

<?php
require_once( __DIR__.'/server/api/Auth.php');
require_once( __DIR__.'/server/api/User.php');
?>

<html>

<head>
  <meta charset="utf-8">
  <title>身份认证</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="icon" type="image/x-icon" href="img/icon/verification.ico" />
</head>

<body>
  <p class="notification">正在验证您的身份，请稍后……</p>

  <!-- script start -->
  <script>
    var _config =
      <?php
        $auth = new Auth(1);  // debug: 1表示本地调试；0表示远程服务器。使用本地调试时，请注意修改config文件
        echo json_encode($auth->get_signature());
      ?>;
    localStorage.setItem('thisUser', 'error');
  </script>

  <script src="http://g.alicdn.com/dingding/open-develop/1.0.0/dingtalk.js"></script>
  <script src="./lib/jquery/jquery-3.1.1.js"></script>
  <script src="js/dd-init.js"></script>
  <!-- script end -->
</body>
