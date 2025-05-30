<?php session_start();
$admin_alias = 'admin';
$admin_name = 'Administrator';
$admin_pass = 'password123'; // Change this to your desired password
if (isset($_SESSION['logged']) && $_SESSION['logged'] === true) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    // change these to your admin credentials
    if (($user === $admin_alias || $user === $admin_name) && $pass === $admin_pass) {
        $_SESSION['logged_in'] = true;
        header('Location: index.php');
        $error = '';
        exit;
    } else {
        $error = 'Username or password is incorrect.';
        $_SESSION['logged_in'] = false;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
    <div class="login-container">
        <h2>Login Page</h2>
        <form method="post">
            <?php if (!empty($error)): ?>
                <div class="error"><?= $error ?></div>
            <?php endif ?>
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
    
</html>