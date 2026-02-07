<?php
/**
 * Portfolio Headless Theme Functions
 *
 * @package portfolio-headless
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register theme support and features
 */
function portfolio_headless_setup() {
    // Register navigation menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'portfolio-headless' ),
        'footer'  => esc_html__( 'Footer Menu', 'portfolio-headless' ),
    ) );

    // Add theme support
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'title-tag' );

    // Register custom image sizes
    add_image_size( 'thumbnail-card', 600, 400, true );
    add_image_size( 'hero', 1920, 1080, true );
    add_image_size( 'project-thumb', 800, 600, true );
    add_image_size( 'avatar', 200, 200, true );
}
add_action( 'after_setup_theme', 'portfolio_headless_setup' );

/**
 * Disable frontend rendering and redirect to Next.js
 */
function portfolio_headless_frontend_redirect() {
    // Skip redirects for admin, REST/GraphQL requests, and static files
    if ( is_admin() || defined( 'XMLRPC_REQUEST' ) ||
         ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ||
         strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) !== false ||
         strpos( $_SERVER['REQUEST_URI'], '/graphql' ) !== false ) {
        return;
    }

    // Get the frontend URL from options
    $frontend_url = get_option( 'portfolio_frontend_url', 'http://localhost:3000' );

    // Get the requested path
    $request_uri = $_SERVER['REQUEST_URI'];

    // Don't redirect WordPress core paths
    if ( preg_match( '/^\/wp-/', $request_uri ) || preg_match( '/^\/index\.php/', $request_uri ) ) {
        return;
    }

    // Redirect to Next.js frontend
    wp_safe_remote_post( apply_filters( 'portfolio_headless_redirect_url', $frontend_url . $request_uri ) );
    // Note: Actual redirect happens in index.php
}
add_action( 'template_redirect', 'portfolio_headless_frontend_redirect' );

/**
 * Add CORS headers for GraphQL endpoint
 */
function portfolio_headless_cors_headers() {
    header( 'Access-Control-Allow-Origin: *' );
    header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS' );
    header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );

    if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
        exit;
    }
}
add_action( 'init', 'portfolio_headless_cors_headers', 1 );

/**
 * Enable GraphQL support for custom menus
 */
function portfolio_headless_graphql_menu_support() {
    if ( function_exists( 'register_graphql_object_type' ) ) {
        // GraphQL support for menus is typically handled by plugins
        // This ensures menu items are properly exposed via GraphQL
        add_filter( 'register_nav_menu_graphql_args', function( $args, $menu_location ) {
            $args['show_in_graphql'] = true;
            return $args;
        }, 10, 2 );
    }
}
add_action( 'after_setup_theme', 'portfolio_headless_graphql_menu_support' );

/**
 * Enqueue stylesheets and scripts
 */
function portfolio_headless_scripts() {
    wp_enqueue_style( 'portfolio-headless-style', get_stylesheet_uri(), array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'portfolio_headless_scripts' );

/**
 * Register REST API meta fields
 */
function portfolio_headless_register_rest_fields() {
    // Register featured image meta for REST API
    register_rest_field( 'post', 'featured_image_url', array(
        'get_callback' => function( $post ) {
            if ( $post['featured_media'] ) {
                $image = wp_get_attachment_image_src( $post['featured_media'], 'full' );
                return $image ? $image[0] : null;
            }
            return null;
        },
        'schema' => array(
            'type'        => 'string',
            'description' => 'Featured image URL',
        ),
    ) );
}
add_action( 'rest_api_init', 'portfolio_headless_register_rest_fields' );

/**
 * Custom login redirect to dashboard
 */
function portfolio_headless_login_redirect( $redirect_to, $request, $user ) {
    if ( isset( $user->roles ) && is_array( $user->roles ) ) {
        if ( in_array( 'administrator', $user->roles, true ) ) {
            return admin_url();
        }
    }
    return $redirect_to;
}
add_filter( 'login_redirect', 'portfolio_headless_login_redirect', 10, 3 );

/**
 * Hide admin bar on frontend
 */
add_filter( 'show_admin_bar', '__return_false' );

/**
 * Disable theme customizer on frontend
 */
function portfolio_headless_disable_customizer() {
    // Customizer is admin-only, so this is minimal
    remove_action( 'wp_head', 'wp_custom_css_cb', 101 );
}
add_action( 'wp_enqueue_scripts', 'portfolio_headless_disable_customizer' );
