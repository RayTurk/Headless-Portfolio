<?php
/**
 * GraphQL Configuration
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * GraphQL_Config class
 */
class GraphQL_Config {

    /**
     * Register GraphQL configuration
     */
    public static function register() {
        add_action( 'graphql_register_types', array( __CLASS__, 'register_graphql_fields' ), 10 );
        add_action( 'graphql_register_types', array( __CLASS__, 'register_site_settings_type' ), 10 );
    }

    /**
     * Register custom GraphQL fields and expose ACF fields
     */
    public static function register_graphql_fields() {
        if ( ! function_exists( 'register_graphql_field' ) ) {
            return;
        }

        // Register reading time field for posts
        register_graphql_field(
            'Post',
            'readingTime',
            array(
                'type'        => 'Int',
                'description' => esc_html__( 'Estimated reading time in minutes', 'portfolio-headless-cms' ),
                'resolve'     => function( $post ) {
                    // Get override value from ACF
                    if ( function_exists( 'get_field' ) ) {
                        $override = get_field( 'reading_time_override', $post->ID );
                        if ( ! empty( $override ) ) {
                            return (int) $override;
                        }
                    }

                    // Calculate based on word count
                    $content = $post->post_content;
                    $word_count = str_word_count( strip_tags( $content ) );
                    $reading_time = ceil( $word_count / 200 ); // Average reading speed
                    return max( 1, $reading_time ); // Minimum 1 minute
                },
            )
        );

        // Register featured image URL field
        register_graphql_field(
            'Post',
            'featuredImageUrl',
            array(
                'type'        => 'String',
                'description' => esc_html__( 'URL of the featured image', 'portfolio-headless-cms' ),
                'resolve'     => function( $post ) {
                    if ( $post->featured_image_id ) {
                        $image = wp_get_attachment_image_src( $post->featured_image_id, 'full' );
                        return $image ? $image[0] : null;
                    }
                    return null;
                },
            )
        );

        // Register author display name
        register_graphql_field(
            'Post',
            'authorName',
            array(
                'type'        => 'String',
                'description' => esc_html__( 'Author display name', 'portfolio-headless-cms' ),
                'resolve'     => function( $post ) {
                    $author = get_the_author_meta( 'display_name', $post->post_author );
                    return ! empty( $author ) ? $author : null;
                },
            )
        );

        // Register category list for posts
        register_graphql_field(
            'Post',
            'categoryList',
            array(
                'type'        => array( 'list_of' => 'String' ),
                'description' => esc_html__( 'List of category names', 'portfolio-headless-cms' ),
                'resolve'     => function( $post ) {
                    $categories = get_the_category( $post->ID );
                    if ( is_wp_error( $categories ) ) {
                        return array();
                    }
                    return array_map( function( $cat ) {
                        return $cat->name;
                    }, $categories );
                },
            )
        );
    }

    /**
     * Register Site Settings as GraphQL type
     */
    public static function register_site_settings_type() {
        if ( ! function_exists( 'register_graphql_object_type' ) ) {
            return;
        }

        // Register SiteSettings object type
        register_graphql_object_type(
            'SiteSettings',
            array(
                'description' => esc_html__( 'Site-wide settings and options', 'portfolio-headless-cms' ),
                'fields'      => array(
                    'siteName'            => array(
                        'type'        => 'String',
                        'description' => esc_html__( 'Site name', 'portfolio-headless-cms' ),
                        'resolve'     => function() {
                            return get_bloginfo( 'name' );
                        },
                    ),
                    'siteDescription'     => array(
                        'type'        => 'String',
                        'description' => esc_html__( 'Site tagline', 'portfolio-headless-cms' ),
                        'resolve'     => function() {
                            return get_bloginfo( 'description' );
                        },
                    ),
                    'siteUrl'             => array(
                        'type'        => 'String',
                        'description' => esc_html__( 'Site URL', 'portfolio-headless-cms' ),
                        'resolve'     => function() {
                            return site_url();
                        },
                    ),
                    'homeUrl'             => array(
                        'type'        => 'String',
                        'description' => esc_html__( 'Home URL', 'portfolio-headless-cms' ),
                        'resolve'     => function() {
                            return home_url();
                        },
                    ),
                    'frontendUrl'         => array(
                        'type'        => 'String',
                        'description' => esc_html__( 'Next.js frontend URL', 'portfolio-headless-cms' ),
                        'resolve'     => function() {
                            return get_option( 'portfolio_frontend_url', 'http://localhost:3000' );
                        },
                    ),
                ),
            )
        );

        // Register RootQuery field for siteSettings
        register_graphql_field(
            'RootQuery',
            'siteSettings',
            array(
                'type'        => 'SiteSettings',
                'description' => esc_html__( 'Get site settings', 'portfolio-headless-cms' ),
                'resolve'     => function() {
                    return array();
                },
            )
        );

        // Register options page data queries
        self::register_options_page_queries();
    }

    /**
     * Register GraphQL queries for options pages
     */
    public static function register_options_page_queries() {
        if ( ! function_exists( 'register_graphql_field' ) || ! function_exists( 'get_field' ) ) {
            return;
        }

        // Header Settings
        register_graphql_field(
            'RootQuery',
            'headerSettings',
            array(
                'type'        => 'HeaderSettings',
                'description' => esc_html__( 'Header and navigation settings', 'portfolio-headless-cms' ),
                'resolve'     => function() {
                    return self::get_options_page_data( 'site-settings-header' );
                },
            )
        );

        // Footer Settings
        register_graphql_field(
            'RootQuery',
            'footerSettings',
            array(
                'type'        => 'FooterSettings',
                'description' => esc_html__( 'Footer settings', 'portfolio-headless-cms' ),
                'resolve'     => function() {
                    return self::get_options_page_data( 'site-settings-footer' );
                },
            )
        );

        // Homepage Settings
        register_graphql_field(
            'RootQuery',
            'homepageSettings',
            array(
                'type'        => 'HomepageSettings',
                'description' => esc_html__( 'Homepage settings', 'portfolio-headless-cms' ),
                'resolve'     => function() {
                    return self::get_options_page_data( 'site-settings-homepage' );
                },
            )
        );

        // SEO Defaults
        register_graphql_field(
            'RootQuery',
            'seoDefaults',
            array(
                'type'        => 'SeoDefaults',
                'description' => esc_html__( 'SEO defaults and structured data', 'portfolio-headless-cms' ),
                'resolve'     => function() {
                    return self::get_options_page_data( 'site-settings-seo' );
                },
            )
        );
    }

    /**
     * Get ACF option page data
     */
    private static function get_options_page_data( $page_slug ) {
        if ( ! function_exists( 'get_field' ) ) {
            return array();
        }

        return get_fields( 'option' );
    }
}
