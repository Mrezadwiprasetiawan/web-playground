<?php session_start();
if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    // Unset all of the session variables
    $_SESSION = array();

    // Destroy the session
    session_destroy();

    // Redirect to login page
    header('Location: login.php');
    exit;
} else {
    // If not logged in, redirect to login page
    header('Location: login.php');
    exit;
}
?>