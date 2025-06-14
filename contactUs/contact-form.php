<?php
session_start();
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("Method Not Allowed");
}

if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    http_response_code(403);
    die("Invalid CSRF token");
}

function sanitize_input($data) {
    if (!isset($data)) return '';
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

try {
    // Check mail configuration
    if (!ini_get('sendmail_path') && !ini_get('SMTP')) {
        error_log("Mail configuration not found");
        throw new Exception("Mail server not configured");
    }

    $name = sanitize_input($_POST['name'] ?? '');
    $visitor_email = filter_var(sanitize_input($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $phone_number = sanitize_input($_POST['phNumber'] ?? '');
    $address = sanitize_input($_POST['address'] ?? '');
    $message = sanitize_input($_POST['message'] ?? '');

    // Validation
    if (!$visitor_email) {
        throw new Exception("Invalid email format");
    }
    if (empty($name) || !preg_match('/^[a-zA-Z\s]+$/', $name)) {
        throw new Exception("Name is required and must contain only letters and spaces");
    }
    if (!preg_match('/^[0-9]{10}$/', $phone_number)) {
        throw new Exception("Phone number must be 10 digits");
    }
    if (empty($address)) {
        throw new Exception("Address is required");
    }
    if (empty($message)) {
        throw new Exception("Message is required");
    }

    $email_from = "noreply@proberightinspection.com";
    $email_subject = "Client question, email form website" . substr($name, 0, 50);
    $email_body = "Client Name: $name\n" .
                  "Client Email: $visitor_email\n" .
                  "Phone Number: $phone_number\n" .
                  "Address: $address\n" .
                  "Message: $message\n";

    $to = "inspector@proberightinspection.com";
    $headers = "From: $email_from\r\n";
    $headers .= "Reply-To: $visitor_email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    if (!mail($to, $email_subject, $email_body, $headers)) {
        error_log("Mail sending failed: " . error_get_last()['message']);
        throw new Exception("Failed to send email");
    }

    $_SESSION['message'] = "Thank you for your message. We'll get back to you soon!";
    header("Location: /contactUs.php");
    exit();

} catch (Exception $e) {
    error_log("Form submission error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
?>