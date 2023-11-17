<!DOCTYPE html>
<html lang="ru" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Posts</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
</head>
<body class="h-full">
    <div class="wrapper min-h-full flex flex-col">
        <header class="bg-gray-100">
            <div class="container py-5 text-center">Header</div>
        </header>
        <main class="flex-auto">
            <div class="container flex flex-col gap-12">
                <?php
                    include 'includes/addPost.php';
                    include 'includes/editPost.php';
                    include 'includes/posts.php';
                ?>
            </div>
        </main>
        <footer class="bg-gray-100">
            <div class="container py-5 text-center">Footer</div>
        </footer>
    </div>
</body>
</html>