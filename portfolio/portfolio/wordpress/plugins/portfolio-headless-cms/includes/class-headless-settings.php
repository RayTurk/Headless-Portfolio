<?php
/**
 * Portfolio Headless Settings
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Headless_Settings class
 */
class Headless_Settings {

    /**
     * Register settings
     */
    public static function register() {
        add_action( 'admin_menu', array( __CLASS__, 'add_settings_page' ) );
        add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
    }

    /**
     * Add settings page to Settings menu
     */
    public static function add_settings_page() {
        add_options_page(
            esc_html__( 'Headless Settings', 'portfolio-headless-cms' ),
            esc_html__( 'Headless Settings', 'portfolio-headless-cms' ),
            'manage_options',
            'portfolio-headless-settings',
            array( __CLASS__, 'render_settings_page' )
        );
    }

    /**
     * Register settings fields
     */
    public static function register_settings() {
        // Register settings
        register_setting(
            'portfolio_headless_settings',
            'portfolio_frontend_url',
            array(
                'type'              => 'string',
                'sanitize_callback' => array( __CLASS__, 'sanitize_url' ),
                'show_in_rest'      => true,
            )
        );

        register_setting(
            'portfolio_headless_settings',
            'portfolio_revalidation_secret',
            array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'show_in_rest'      => false,
            )
        );

        register_setting(
            'portfolio_headless_settings',
            'portfolio_enable_isr_webhooks',
            array(
                'type'              => 'boolean',
                'sanitize_callback' => array( __CLASS__, 'sanitize_checkbox' ),
                'show_in_rest'      => true,
            )
        );

        // Add settings section
        add_settings_section(
            'portfolio_headless_settings',
            esc_html__( 'Headless CMS Settings', 'portfolio-headless-cms' ),
            array( __CLASS__, 'render_settings_section' ),
            'portfolio_headless_settings'
        );

        // Add settings fields
        add_settings_field(
            'portfolio_frontend_url',
            esc_html__( 'Frontend URL', 'portfolio-headless-cms' ),
            array( __CLASS__, 'render_frontend_url_field' ),
            'portfolio_headless_settings',
            'portfolio_headless_settings'
        );

        add_settings_field(
            'portfolio_revalidation_secret',
            esc_html__( 'Revalidation Secret', 'portfolio-headless-cms' ),
            array( __CLASS__, 'render_secret_field' ),
            'portfolio_headless_settings',
            'portfolio_headless_settings'
        );

        add_settings_field(
            'portfolio_enable_isr_webhooks',
            esc_html__( 'Enable ISR Webhooks', 'portfolio-headless-cms' ),
            array( __CLASS__, 'render_webhook_checkbox_field' ),
            'portfolio_headless_settings',
            'portfolio_headless_settings'
        );
    }

    /**
     * Render settings section
     */
    public static function render_settings_section() {
        echo wp_kses_post( wpautop( esc_html__( 'Configure your headless CMS settings for Next.js integration.', 'portfolio-headless-cms' ) ) );
    }

    /**
     * Render frontend URL field
     */
    public static function render_frontend_url_field() {
        $value = get_option( 'portfolio_frontend_url', 'http://localhost:3000' );
        ?>
        <input
            type="url"
            id="portfolio_frontend_url"
            name="portfolio_frontend_url"
            value="<?php echo esc_attr( $value ); ?>"
            placeholder="http://localhost:3000"
            class="regular-text"
            required
        />
        <p class="description">
            <?php esc_html_e( 'The URL where your Next.js frontend is hosted.', 'portfolio-headless-cms' ); ?>
        </p>
        <?php
    }

    /**
     * Render revalidation secret field
     */
    public static function render_secret_field() {
        $value = get_option( 'portfolio_revalidation_secret', '' );
        ?>
        <input
            type="password"
            id="portfolio_revalidation_secret"
            name="portfolio_revalidation_secret"
            value="<?php echo esc_attr( $value ); ?>"
            class="regular-text"
        />
        <p class="description">
            <?php esc_html_e( 'Secret key used to authenticate ISR webhook requests to your Next.js frontend.', 'portfolio-headless-cms' ); ?>
        </p>
        <?php
    }

    /**
     * Render webhook checkbox field
     */
    public static function render_webhook_checkbox_field() {
        $value = get_option( 'portfolio_enable_isr_webhooks', false );
        ?>
        <input
            type="checkbox"
            id="portfolio_enable_isr_webhooks"
            name="portfolio_enable_isr_webhooks"
            value="1"
            <?php checked( $value, 1 ); ?>
        />
        <label for="portfolio_enable_isr_webhooks">
            <?php esc_html_e( 'Enable automatic ISR webhook requests when content is published or updated.', 'portfolio-headless-cms' ); ?>
        </label>
        <?php
    }

    /**
     * Render settings page
     */
    public static function render_settings_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'You do not have permission to access this page.', 'portfolio-headless-cms' ) );
        }

        // Check if form was submitted
        if ( isset( $_POST['submit'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ?? '' ) ), 'portfolio_headless_settings' ) ) {
            settings_errors( 'portfolio_headless_settings' );
        }
        ?>
        <div class="wrap">
            <h1><?php esc_html_e( 'Headless Settings', 'portfolio-headless-cms' ); ?></h1>

            <form method="post" action="options.php">
                <?php
                settings_fields( 'portfolio_headless_settings' );
                do_settings_sections( 'portfolio_headless_settings' );
                submit_button();
                ?>
            </form>

            <div class="notice notice-info">
                <p>
                    <strong><?php esc_html_e( 'Webhook Endpoint:', 'portfolio-headless-cms' ); ?></strong><br/>
                    <code><?php echo esc_url( rest_url( 'portfolio/v1/webhook/isr' ) ); ?></code>
                </p>
                <p>
                    <?php esc_html_e( 'Use this endpoint to receive webhook notifications from your Next.js application about ISR-related events.', 'portfolio-headless-cms' ); ?>
                </p>
            </div>
        </div>
        <?php
    }

    /**
     * Sanitize URL input
     */
    public static function sanitize_url( $value ) {
        if ( empty( $value ) ) {
            return 'http://localhost:3000';
        }
        return esc_url_raw( $value );
    }

    /**
     * Sanitize checkbox input
     */
    public static function sanitize_checkbox( $value ) {
        return ! empty( $value ) ? 1 : 0;
    }
}
