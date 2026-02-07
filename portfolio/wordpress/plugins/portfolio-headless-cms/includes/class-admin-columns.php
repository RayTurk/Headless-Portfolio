<?php
/**
 * Portfolio Admin Columns
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Admin_Columns class
 */
class Admin_Columns {

    /**
     * Register admin columns
     */
    public static function register() {
        add_filter( 'manage_project_posts_columns', array( __CLASS__, 'add_project_columns' ) );
        add_action( 'manage_project_posts_custom_column', array( __CLASS__, 'render_project_columns' ), 10, 2 );
        add_filter( 'manage_project_posts_sortable_columns', array( __CLASS__, 'make_columns_sortable' ) );
    }

    /**
     * Add custom columns to project posts list
     */
    public static function add_project_columns( $columns ) {
        // Create new columns array with thumbnail first
        $new_columns = array();

        // Add thumbnail column at the beginning
        $new_columns['thumbnail'] = esc_html__( 'Image', 'portfolio-headless-cms' );

        // Add existing columns except date
        foreach ( $columns as $key => $value ) {
            if ( 'date' !== $key && 'thumbnail' !== $key ) {
                $new_columns[ $key ] = $value;
            }
        }

        // Add custom columns after title
        $new_columns['project_type'] = esc_html__( 'Project Type', 'portfolio-headless-cms' );
        $new_columns['tech_stack']   = esc_html__( 'Technologies', 'portfolio-headless-cms' );
        $new_columns['project_status'] = esc_html__( 'Status', 'portfolio-headless-cms' );
        $new_columns['project_url']  = esc_html__( 'Project URL', 'portfolio-headless-cms' );

        // Add date back at the end
        $new_columns['date'] = esc_html__( 'Date', 'portfolio-headless-cms' );

        return $new_columns;
    }

    /**
     * Render custom columns content
     */
    public static function render_project_columns( $column, $post_id ) {
        switch ( $column ) {
            case 'thumbnail':
                self::render_thumbnail_column( $post_id );
                break;

            case 'project_type':
                self::render_taxonomy_column( $post_id, 'project_type' );
                break;

            case 'tech_stack':
                self::render_taxonomy_column( $post_id, 'tech_stack' );
                break;

            case 'project_status':
                self::render_taxonomy_column( $post_id, 'project_status' );
                break;

            case 'project_url':
                self::render_project_url_column( $post_id );
                break;
        }
    }

    /**
     * Render thumbnail column
     */
    private static function render_thumbnail_column( $post_id ) {
        $thumbnail = get_the_post_thumbnail( $post_id, array( 80, 80 ) );

        if ( $thumbnail ) {
            echo wp_kses_post( $thumbnail );
        } else {
            echo esc_html__( 'No image', 'portfolio-headless-cms' );
        }
    }

    /**
     * Render taxonomy column
     */
    private static function render_taxonomy_column( $post_id, $taxonomy ) {
        $terms = get_the_terms( $post_id, $taxonomy );

        if ( is_wp_error( $terms ) ) {
            return;
        }

        if ( empty( $terms ) ) {
            echo esc_html__( 'None', 'portfolio-headless-cms' );
            return;
        }

        $term_links = array();
        foreach ( $terms as $term ) {
            $term_links[] = sprintf(
                '<a href="%s">%s</a>',
                esc_url( add_query_arg( array( $taxonomy => $term->slug ), admin_url( 'edit.php?post_type=project' ) ) ),
                esc_html( $term->name )
            );
        }

        echo wp_kses_post( implode( ', ', $term_links ) );
    }

    /**
     * Render project URL column
     */
    private static function render_project_url_column( $post_id ) {
        if ( function_exists( 'get_field' ) ) {
            $live_url = get_field( 'live_url', $post_id );

            if ( ! empty( $live_url ) ) {
                printf(
                    '<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
                    esc_url( $live_url ),
                    esc_html__( 'View Live', 'portfolio-headless-cms' )
                );
            } else {
                echo esc_html__( 'No URL', 'portfolio-headless-cms' );
            }
        }
    }

    /**
     * Make columns sortable
     */
    public static function make_columns_sortable( $sortable_columns ) {
        $sortable_columns['project_type'] = 'project_type';
        $sortable_columns['project_status'] = 'project_status';

        return $sortable_columns;
    }
}
