<?php
// This is a test file to check if the components can be accessed via server-side includes
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Component Test</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/utility.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h1>PHP Component Test</h1>
    
    <h2>Header from PHP include:</h2>
    <div>
        <?php include('../components/header.html'); ?>
    </div>
    
    <hr>
    
    <h2>Footer from PHP include:</h2>
    <div>
        <?php include('../components/footer.html'); ?>
    </div>
</body>
</html>
