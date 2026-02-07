<?php
/**
 * Portfolio ISR Webhook
 *
 * @package portfolio-isr-webhook
 * @version 1.0.0
 *
 * Plugin Name: Portfolio ISR Webhook
 * Plugin URI: https://example.com
 * Description: Triggers Next.js ISR revalidation when portfolio content is updated
 * Version: 1.0.0
 * Author: Ray Turk
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: portfolio-isr-webhook
 * Domain Path: /languages
 *
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Define plugin constants
 */
define( 'PORTFOLIO_ISR_WEBHOOK_VERSION', '1.0.0' );
define( 'PORTFOLIO_ISR_WEBHOOK_DIR', plugin_dir_path( __FILE__ ) );
define( 'PORTFOLIO_ISR_WEBHOOK_URL', plugin_dir_url( __FILE__ ) );
define( 'PORTFOLIO_ISR_WEBHOOK_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Plugin activation hook
 */
function portfolio_isr_webhook_activate() {
    // Verify that portfolio-headless-cms is active
    if ( ! is_plugin_active( 'portfolio-headless-cms/portfolio-headless-cms.php' ) ) {
        wp_die(
            esc_html__( 'Portfolio ISR Webhook requires Portfolio Headless CMS to be activated first.', 'portfolio-isr-webhook' )
        );
    }

    // Create database table for webhook logs (optional)
    portfolio_isr_webhook_create_table();

    // Flush rewrite rules
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'portfolio_isr_webhook_activate' );

/**
 * Plugin deactivation hook
 */
function portfolio_isr_webhook_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'portfolio_isr_webhook_deactivate' );

/**
 * Create database table for webhook logs
 */
function portfolio_isr_webhook_create_table() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'portfolio_webhook_logs';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS {$table_name} (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        post_id BIGINT(20),
        post_type VARCHAR(50),
        post_slug VARCHAR(255),
        event_type VARCHAR(50),
        response_code INT(4),
        response_body LONGTEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX post_id (post_id),
        INDEX event_type (event_type),
        INDEX created_at (created_at)
    ) {$charset_collate};";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}

/**
 * Initialize webhook hooks
 */
function portfolio_isr_webhook_init() {
    // Check if webhooks are enabled
    $webhooks_enabled = get_option( 'portfolio_enable_isr_webhooks', false );
    if ( ! $webhooks_enabled ) {
        return;
    }

    // Hook into save_post for all custom post types
    add_action( 'save_post_project', 'portfolio_isr_webhook_trigger_revalidation', 99, 2 );
    add_action( 'save_post_service', 'portfolio_isr_webhook_trigger_revalidation', 99, 2 );
    add_action( 'save_post_testimonial', 'portfolio_isr_webhook_trigger_revalidation', 99, 2 );
    add_action( 'save_post', 'portfolio_isr_webhook_trigger_blog_revalidation', 99, 2 );

    // Hook into post deletion
    add_action( 'delete_post', 'portfolio_isr_webhook_trigger_deletion_revalidation', 99, 2 );

    // Hook into taxonomy updates
    add_action( 'edited_project_type', 'portfolio_isr_webhook_trigger_taxonomy_revalidation', 99, 2 );
    add_action( 'edited_tech_stack', 'portfolio_isr_webhook_trigger_taxonomy_revalidation', 99, 2 );
    add_action( 'edited_project_status', 'portfolio_isr_webhook_trigger_taxonomy_revalidation', 99, 2 );

    // Add admin notice
    add_action( 'admin_notices', 'portfolio_isr_webhook_admin_notice' );
}
add_action( 'plugins_loaded', 'portfolio_isr_webhook_init', 20 );

/**
 * Load text domain on init (WP 6.7+ requires init or later)
 */
function portfolio_isr_webhook_load_textdomain() {
    load_plugin_textdomain(
        'portfolio-isr-webhook',
        false,
        dirname( PORTFOLIO_ISR_WEBHOOK_BASENAME ) . '/languages'
    );
}
add_action( 'init', 'portfolio_isr_webhook_load_textdomain' );

/**
 * Trigger revalidation on post save
 */
function portfolio_isr_webhook_trigger_revalidation( $post_id, $post ) {
    // Skip if this is an autosave or revision
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Skip if user doesn't have permission
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Only process published posts
    if ( 'publish' !== $post->post_status ) {
        return;
    }

    // Get the post slug
    $post_slug = $post->post_name;

    // Determine paths to revalidate
    $paths = portfolio_isr_webhook_get_revalidation_paths( $post );

    // Send webhook request
    portfolio_isr_webhook_send_request( $paths, $post_id, $post->post_type, 'update' );
}

/**
 * Trigger revalidation on blog post save
 */
function portfolio_isr_webhook_trigger_blog_revalidation( $post_id, $post ) {
    // Skip if this is an autosave or revision
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Only process blog posts (type 'post')
    if ( 'post' !== $post->post_type ) {
        return;
    }

    // Skip if user doesn't have permission
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Only process published posts
    if ( 'publish' !== $post->post_status ) {
        return;
    }

    $paths = array(
        '/blog',
        '/blog/' . $post->post_name,
    );

    portfolio_isr_webhook_send_request( $paths, $post_id, $post->post_type, 'update' );
}

/**
 * Trigger revalidation on post deletion
 */
function portfolio_isr_webhook_trigger_deletion_revalidation( $post_id, $post ) {
    // Get the post slug before it's deleted
    $post_slug = $post->post_name;

    // Determine paths to revalidate
    $paths = portfolio_isr_webhook_get_revalidation_paths( $post );

    // Send webhook request
    portfolio_isr_webhook_send_request( $paths, $post_id, $post->post_type, 'delete' );
}

/**
 * Trigger revalidation on taxonomy changes
 */
function portfolio_isr_webhook_trigger_taxonomy_revalidation( $term_id, $term_taxonomy_id ) {
    // Get the term object
    $term = get_term( $term_id );

    if ( is_wp_error( $term ) ) {
        return;
    }

    // Determine paths based on taxonomy
    $paths = array();
    if ( 'project_type' === $term->taxonomy ) {
        $paths[] = '/projects';
        $paths[] = '/projects/type/' . $term->slug;
    } elseif ( 'tech_stack' === $term->taxonomy ) {
        $paths[] = '/projects';
        $paths[] = '/projects/tech/' . $term->slug;
    } elseif ( 'project_status' === $term->taxonomy ) {
        $paths[] = '/projects';
        $paths[] = '/projects/status/' . $term->slug;
    }

    if ( ! empty( $paths ) ) {
        portfolio_isr_webhook_send_request( $paths, $term_id, 'taxonomy', 'update' );
    }
}

/**
 * Get paths that need revalidation based on post type
 */
function portfolio_isr_webhook_get_revalidation_paths( $post ) {
    $paths = array();
    $post_slug = $post->post_name;

    switch ( $post->post_type ) {
        case 'project':
            $paths[] = '/projects';
            $paths[] = '/projects/' . $post_slug;

            // Add taxonomy paths
            $types = get_the_terms( $post->ID, 'project_type' );
            if ( ! is_wp_error( $types ) && ! empty( $types ) ) {
                foreach ( $types as $type ) {
                    $paths[] = '/projects/type/' . $type->slug;
                }
            }

            $techs = get_the_terms( $post->ID, 'tech_stack' );
            if ( ! is_wp_error( $techs ) && ! empty( $techs ) ) {
                foreach ( $techs as $tech ) {
                    $paths[] = '/projects/tech/' . $tech->slug;
                }
            }
            break;

        case 'service':
            $paths[] = '/services';
            $paths[] = '/services/' . $post_slug;
            break;

        case 'testimonial':
            // Testimonials are typically only displayed on homepage
            $paths[] = '/';
            break;

        case 'post':
            $paths[] = '/blog';
            $paths[] = '/blog/' . $post_slug;

            // Add category paths
            $categories = get_the_category( $post->ID );
            if ( ! empty( $categories ) ) {
                foreach ( $categories as $category ) {
                    $paths[] = '/blog/category/' . $category->slug;
                }
            }
            break;
    }

    // Always revalidate homepage for any content change
    if ( ! in_array( '/', $paths, true ) ) {
        array_unshift( $paths, '/' );
    }

    // Remove duplicates and apply filters
    $paths = array_unique( $paths );
    return apply_filters( 'portfolio_isr_webhook_revalidation_paths', $paths, $post );
}

/**
 * Send webhook request to Next.js frontend
 */
function portfolio_isr_webhook_send_request( $paths, $post_id, $post_type, $event_type ) {
    // Get frontend URL and secret
    $frontend_url = get_option( 'portfolio_frontend_url', 'http://localhost:3000' );
    $secret = get_option( 'portfolio_revalidation_secret', '' );

    if ( empty( $frontend_url ) ) {
        portfolio_isr_webhook_log_event( $post_id, $post_type, implode( ',', $paths ), $event_type, 0, 'No frontend URL configured' );
        return;
    }

    // Prepare webhook payload
    $payload = array(
        'type'      => $event_type,
        'post_id'   => $post_id,
        'post_type' => $post_type,
        'paths'     => $paths,
        'timestamp' => time(),
    );

    // Prepare request args
    $request_args = array(
        'method'      => 'POST',
        'timeout'     => 30,
        'redirection' => 5,
        'httpversion' => '1.1',
        'blocking'    => false,
        'headers'     => array(
            'Content-Type' => 'application/json',
        ),
        'body'        => wp_json_encode( $payload ),
    );

    // Add authentication header if secret is configured
    if ( ! empty( $secret ) ) {
        $request_args['headers']['X-ISR-Secret'] = $secret;
    }

    // Make request to ISR endpoint
    $webhook_url = rtrim( $frontend_url, '/' ) . '/api/revalidate';

    $response = wp_remote_post( $webhook_url, $request_args );

    // Log the request
    if ( is_wp_error( $response ) ) {
        portfolio_isr_webhook_log_event(
            $post_id,
            $post_type,
            implode( ',', $paths ),
            $event_type,
            0,
            $response->get_error_message()
        );
    } else {
        $response_code = wp_remote_retrieve_response_code( $response );
        $response_body = wp_remote_retrieve_body( $response );

        portfolio_isr_webhook_log_event(
            $post_id,
            $post_type,
            implode( ',', $paths ),
            $event_type,
            $response_code,
            $response_body
        );
    }
}

/**
 * Log webhook events
 */
function portfolio_isr_webhook_log_event( $post_id, $post_type, $post_slug, $event_type, $response_code, $response_body ) {
    global $wpdb;

    $table_name = $wpdb->prefix . 'portfolio_webhook_logs';

    // Check if table exists
    if ( $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) === $table_name ) {
        $wpdb->insert(
            $table_name,
            array(
                'post_id'        => $post_id,
                'post_type'      => $post_type,
                'post_slug'      => $post_slug,
                'event_type'     => $event_type,
                'response_code'  => $response_code,
                'response_body'  => $response_body,
                'created_at'     => current_time( 'mysql' ),
            ),
            array( '%d', '%s', '%s', '%s', '%d', '%s', '%s' )
        );
    }

    // Also store in options as last event status
    update_option( 'portfolio_isr_webhook_last_event', array(
        'post_id'       => $post_id,
        'post_type'     => $post_type,
        'event_type'    => $event_type,
        'response_code' => $response_code,
        'timestamp'     => current_time( 'mysql' ),
        'success'       => ! empty( $response_code ) && $response_code >= 200 && $response_code < 300,
    ) );
}

/**
 * Display admin notice for webhook status
 */
function portfolio_isr_webhook_admin_notice() {
    // Only show on portfolio admin pages
    global $post_type;
    if ( ! isset( $_GET['post_type'] ) && ! in_array( $post_type, array( 'project', 'service', 'testimonial' ), true ) ) {
        return;
    }

    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $last_event = get_option( 'portfolio_isr_webhook_last_event' );

    if ( ! $last_event ) {
        return;
    }

    $success = $last_event['success'] ?? false;
    $notice_class = $success ? 'notice-success' : 'notice-warning';
    $status_text = $success ? esc_html__( 'Webhook delivered successfully', 'portfolio-isr-webhook' ) : esc_html__( 'Webhook delivery failed', 'portfolio-isr-webhook' );

    printf(
        '<div class="notice %s is-dismissible"><p><strong>%s:</strong> %s (Code: %d) at %s</p></div>',
        esc_attr( $notice_class ),
        esc_html__( 'ISR Webhook', 'portfolio-isr-webhook' ),
        esc_html( $status_text ),
        intval( $last_event['response_code'] ?? 0 ),
        esc_html( $last_event['timestamp'] ?? '' )
    );
}

/**
 * Admin menu for webhook logs
 */
function portfolio_isr_webhook_admin_menu() {
    add_submenu_page(
        'portfolio-headless-settings',
        esc_html__( 'Webhook Logs', 'portfolio-isr-webhook' ),
        esc_html__( 'Webhook Logs', 'portfolio-isr-webhook' ),
        'manage_options',
        'portfolio-webhook-logs',
        'portfolio_isr_webhook_logs_page'
    );
}
add_action( 'admin_menu', 'portfolio_isr_webhook_admin_menu' );

/**
 * Render webhook logs page
 */
function portfolio_isr_webhook_logs_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( esc_html__( 'You do not have permission to view this page.', 'portfolio-isr-webhook' ) );
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'portfolio_webhook_logs';

    // Check if table exists
    $table_exists = $wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'" ) === $table_name;

    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Webhook Logs', 'portfolio-isr-webhook' ); ?></h1>

        <?php if ( ! $table_exists ) : ?>
            <div class="notice notice-info">
                <p><?php esc_html_e( 'No logs available yet. The webhook logs table will be created when webhooks are triggered.', 'portfolio-isr-webhook' ); ?></p>
            </div>
        <?php else : ?>
            <?php
            // Get logs
            $logs = $wpdb->get_results(
                "SELECT * FROM {$table_name} ORDER BY created_at DESC LIMIT 50"
            );

            if ( empty( $logs ) ) {
                ?>
                <div class="notice notice-info">
                    <p><?php esc_html_e( 'No webhook logs yet.', 'portfolio-isr-webhook' ); ?></p>
                </div>
                <?php
            } else {
                ?>
                <table class="wp-list-table widefat">
                    <thead>
                        <tr>
                            <th><?php esc_html_e( 'Date', 'portfolio-isr-webhook' ); ?></th>
                            <th><?php esc_html_e( 'Post Type', 'portfolio-isr-webhook' ); ?></th>
                            <th><?php esc_html_e( 'Event Type', 'portfolio-isr-webhook' ); ?></th>
                            <th><?php esc_html_e( 'Status Code', 'portfolio-isr-webhook' ); ?></th>
                            <th><?php esc_html_e( 'Paths', 'portfolio-isr-webhook' ); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ( $logs as $log ) : ?>
                            <tr>
                                <td><?php echo esc_html( $log->created_at ); ?></td>
                                <td><?php echo esc_html( $log->post_type ); ?></td>
                                <td><?php echo esc_html( $log->event_type ); ?></td>
                                <td>
                                    <?php
                                    $code = intval( $log->response_code );
                                    if ( $code >= 200 && $code < 300 ) {
                                        echo '<span style="color: green;">&#10003; ' . esc_html( $code ) . '</span>';
                                    } else {
                                        echo '<span style="color: red;">&#10005; ' . esc_html( $code ) . '</span>';
                                    }
                                    ?>
                                </td>
                                <td><?php echo esc_html( $log->post_slug ); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <?php
            }
            ?>
        <?php endif; ?>
    </div>
    <?php
}
