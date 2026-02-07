<?php
/**
 * Main Theme Template
 *
 * This is a headless theme - all frontend rendering is done by Next.js
 * This file redirects all requests to the Next.js frontend
 *
 * @package portfolio-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Get the frontend URL from WordPress options
$frontend_url = get_option( 'portfolio_frontend_url', 'http://localhost:3000' );

// Get the requested path
$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/';

// Remove the WordPress path prefix if this is installed in a subdirectory
$home_url = home_url();
$home_path = wp_parse_url( $home_url, PHP_URL_PATH );

if ( ! empty( $home_path ) && $home_path !== '/' ) {
    $request_uri = str_replace( $home_path, '', $request_uri );
}

// Ensure leading slash
if ( strpos( $request_uri, '/' ) !== 0 ) {
    $request_uri = '/' . $request_uri;
}

// Redirect to Next.js frontend
$redirect_url = rtrim( $frontend_url, '/' ) . $request_uri;

// Use JavaScript redirect as fallback
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0;url=<?php echo esc_url( $redirect_url ); ?>">
    <title>Redirecting...</title>
    <script>
        window.location.href = <?php echo wp_json_encode( $redirect_url ); ?>;
    </script>
</head>
<body>
    <p>Redirecting to Next.js frontend... <a href="<?php echo esc_url( $redirect_url ); ?>">Click here if not redirected</a></p>
</body>
</html>
