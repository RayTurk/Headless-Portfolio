<?php
/**
 * Portfolio Headless CMS
 *
 * @package portfolio-headless-cms
 * @version 1.0.0
 *
 * Plugin Name: Portfolio Headless CMS
 * Plugin URI: https://example.com
 * Description: Complete headless CMS setup for portfolio site with CPTs, taxonomies, ACF fields, and GraphQL support
 * Version: 1.0.0
 * Author: Ray Turk
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: portfolio-headless-cms
 * Domain Path: /languages
 *
 * Requires: PHP 7.4
 * Requires Plugins: acf-pro, wp-graphql
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Define plugin constants
 */
define( 'PORTFOLIO_HEADLESS_CMS_VERSION', '1.0.0' );
define( 'PORTFOLIO_HEADLESS_CMS_DIR', plugin_dir_path( __FILE__ ) );
define( 'PORTFOLIO_HEADLESS_CMS_URL', plugin_dir_url( __FILE__ ) );
define( 'PORTFOLIO_HEADLESS_CMS_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Autoloader for plugin classes
 */
spl_autoload_register( function( $class ) {
    // Check if class is in our namespace
    if ( strpos( $class, 'Portfolio_Headless_CMS\\' ) !== 0 ) {
        return;
    }

    // Remove namespace prefix
    $class = str_replace( 'Portfolio_Headless_CMS\\', '', $class );

    // Convert class name to file path
    $file = PORTFOLIO_HEADLESS_CMS_DIR . 'includes/class-' . strtolower( str_replace( '_', '-', $class ) ) . '.php';

    if ( file_exists( $file ) ) {
        require_once $file;
    }
} );

/**
 * Check for required plugins
 */
function portfolio_headless_cms_check_dependencies() {
    $dependencies = array();

    // Check for ACF Pro
    if ( ! class_exists( 'ACF_Pro' ) && ! defined( 'ACF_PRO' ) ) {
        $dependencies[] = 'ACF Pro';
    }

    // Check for WP GraphQL
    if ( ! class_exists( '\WPGraphQL\Core' ) && ! defined( 'WPGRAPHQL_VERSION' ) ) {
        $dependencies[] = 'WP GraphQL';
    }

    return $dependencies;
}

/**
 * Plugin activation hook
 */
function portfolio_headless_cms_activate() {
    $missing = portfolio_headless_cms_check_dependencies();

    if ( ! empty( $missing ) ) {
        wp_die(
            sprintf(
                esc_html__( 'Portfolio Headless CMS requires the following plugins to be installed and activated: %s', 'portfolio-headless-cms' ),
                esc_html( implode( ', ', $missing ) )
            )
        );
    }

    // Flush rewrite rules
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'portfolio_headless_cms_activate' );

/**
 * Plugin deactivation hook
 */
function portfolio_headless_cms_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'portfolio_headless_cms_deactivate' );

/**
 * Initialize plugin
 */
function portfolio_headless_cms_init() {
    // Initialize post types
    Portfolio_Headless_CMS\Post_Types::register();

    // Initialize taxonomies
    Portfolio_Headless_CMS\Taxonomies::register();

    // Initialize admin columns
    Portfolio_Headless_CMS\Admin_Columns::register();

    // Initialize headless settings
    Portfolio_Headless_CMS\Headless_Settings::register();

    // Load ACF fields
    portfolio_headless_cms_load_acf_fields();

    // Initialize GraphQL config
    Portfolio_Headless_CMS\GraphQL_Config::register();

    // Initialize GraphQL resolvers
    Portfolio_Headless_CMS\GraphQL_Resolvers::register();

    // Load text domain
    load_plugin_textdomain(
        'portfolio-headless-cms',
        false,
        dirname( PORTFOLIO_HEADLESS_CMS_BASENAME ) . '/languages'
    );
}
add_action( 'plugins_loaded', 'portfolio_headless_cms_init', 10 );

/**
 * Load ACF field definitions
 */
function portfolio_headless_cms_load_acf_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    require_once PORTFOLIO_HEADLESS_CMS_DIR . 'acf-fields/project-fields.php';
    require_once PORTFOLIO_HEADLESS_CMS_DIR . 'acf-fields/blog-fields.php';
    require_once PORTFOLIO_HEADLESS_CMS_DIR . 'acf-fields/service-fields.php';
    require_once PORTFOLIO_HEADLESS_CMS_DIR . 'acf-fields/testimonial-fields.php';
    require_once PORTFOLIO_HEADLESS_CMS_DIR . 'acf-fields/global-options.php';
}

/**
 * Admin notice for missing dependencies
 */
function portfolio_headless_cms_admin_notice() {
    // Only show if not on plugin activation page
    if ( isset( $_GET['activate'] ) || isset( $_GET['deactivate'] ) ) {
        return;
    }

    $missing = portfolio_headless_cms_check_dependencies();

    if ( ! empty( $missing ) ) {
        ?>
        <div class="notice notice-error is-dismissible">
            <p>
                <strong><?php esc_html_e( 'Portfolio Headless CMS:', 'portfolio-headless-cms' ); ?></strong>
                <?php
                printf(
                    esc_html__( 'The following required plugins are not active: %s', 'portfolio-headless-cms' ),
                    esc_html( implode( ', ', $missing ) )
                );
                ?>
            </p>
        </div>
        <?php
    }
}
add_action( 'admin_notices', 'portfolio_headless_cms_admin_notice' );
