<?php
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;">
    <title>Contact Us - Probe Right Inspection</title>
    <link rel="icon" href="./images/Logo20x20.png" type="image/png" sizes="20x20">
   <meta
      name="description"
      content="Professional home inspection services in Dallas-Fort Worth, Texas. Licensed InterNACHI certified inspectors offering thermal imaging, foundation checks, pool inspections, sewer line camera inspections. Get detailed reports within 24 hours. Same-day scheduling available. Serving DFW metroplex with precision and care."
    />
    <meta
      name="keywords"
      content="home inspection Dallas, home inspector Fort Worth, DFW home inspection, thermal imaging inspection, foundation inspection Texas, pool inspection Dallas, sewer line camera inspection, residential home inspection, certified home inspector TREC, InterNACHI certified inspector, McKinney home inspection, Plano home inspector, Allen TX inspection services, pre-purchase home inspection, new construction inspection, commercial property inspection Dallas, moisture detection, drone roof inspection, detailed inspection report, same day inspection Dallas, affordable home inspection DFW, trusted home inspector Texas, structural inspection, irrigation system inspection, elevation survey, home inspection near me"
    />
    <meta name="ermal hila" content="Probe Right Inspection" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style/styles.css">
    <link rel="stylesheet" href="./style/header.css">
     <link rel="stylesheet" href="./style/index.css" />
    <link rel="stylesheet" href="./style/footer.css">
    <link rel="stylesheet" href="./contactUs/contactus.css">
    <link rel="stylesheet" href="./contactUs/questMssg.css">
</head>
<body>
    <header class="header">
        <a href="index.html">
            <img src="./images/home_inspection_2.png" alt="Probe Right Inspection Logo" class="logo-header">
        </a>
        <button class="menu-toggle" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
        </button>
        <nav class="nav-menu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="service.html">Services</a></li>
                <li><a href="aboutUs.html">About Us</a></li>
                <!-- <li><a href="scheduler.html">Schedule</a></li> -->
            </ul>
        </nav>
    </header>

    <?php if (isset($_SESSION['message'])): ?>
        <div class="alert alert-success">
            <div class="alert alert-success">
                <?php 
                echo $_SESSION['message'];
                unset($_SESSION['message']);
                ?>
            </div>
        </div>
    <?php endif; ?>

    <div class="contact-title">
        <h1>Get in touch</h1>
        <h2>Ready to schedule your inspection or have a question? Reach out to us!</h2>
    </div>
    
    <div class="contact-form">
        <form id="contact-form" method="post" action="./contactUs/contact-form.php" onsubmit="return validateForm()">
            <input name="name" id="name" type="text" class="form-control" placeholder="Your Name" required>
            <input name="email" id="email" type="email" class="form-control" placeholder="Your Email" required>
            <input name="phNumber" id="phNumber" type="tel" class="form-control" placeholder="Phone Number" pattern="[0-9]{10}" required>
            <input name="address" id="address" type="text" class="form-control" placeholder="Your Address" required>
            <textarea name="message" id="message" class="form-control" placeholder="Your Message" rows="5" required></textarea>
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <input type="submit" class="form-control submit" value="Send Message">
        </form>
    </div>
    <div class="btn-container">
        <a href="index.html">
            <button class="btn"><i class="fa fa-home"></i></button>
        </a>
    </div>
    <script src="./script/script.js"></script>
    <script src="./contactUs/contactus.js"></script>
</body>
</html>