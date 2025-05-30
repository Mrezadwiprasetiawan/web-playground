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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="css/index.css">
  </head>
<body>
  <header>
    <h1>Welcome to the Dashboard</h1>
    <nav>
      <ul>
        <li><a href="logout.php">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h2>Dashboard Content</h2>
    <p>This is a protected area. Only logged-in users can see this content.</p>
  </main>

  <footer>
    <p>&copy; 2025 M Reza Dwi Prasetiawan</p>
  </footer>
</html>