<?php
session_start();

if (!isset($_SESSION['logged'])|| $_SESSION['logged']!=true){
  header('Location: login.php');
  // Redirect to login page if not logged in
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="theme-color" content="#19191a" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My web</title>
  <link rel="stylesheet" href="css/index.css" />

</head>

<body>
  <header>
    <h1>M Reza dwi prasetiawan</h1>
    <nav class="tabs" role="tablist">
      <!--fetch api-->
      <button data-tab="home" class="active" aria-selected="true"><span class="label">Beranda</span></button>
      <button data-tab="about"><span class="label">Tentang</span></button>
      <button data-tab="tos"><span class="label">Persyaratan layanan</span></button>
      <span class="bar"></span>
      <button class="logout" ><span class="label"><a href="logout.php">Logout</a></span></button>
    </nav>
  </header>

  <div class="container" role="tabpanel">
    <aside>
      <!-- fetch api -->
    </aside>

    <main id="panel" role="tabpanel" aria-live="polite"></main>
  </div>

  <footer>&copy 2025 M Reza Dwi Prasetiawan</footer>
  <script src="app.js"></script>
</body>

</html>