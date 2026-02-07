<?php
/**
 * Portfolio Post Types
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Post_Types class
 */
class Post_Types {

    /**
     * Register post types
     */
    public static function register() {
        add_action( 'init', array( __CLASS__, 'register_project_post_type' ) );
        add_action( 'init', array( __CLASS__, 'register_service_post_type' ) );
        add_action( 'init', array( __CLASS__, 'register_testimonial_post_type' ) );
    }

    /**
     * Register Project post type
     */
    public static function register_project_post_type() {
        $labels = array(
            'name'                     => esc_html_x( 'Projects', 'Post type general name', 'portfolio-headless-cms' ),
            'singular_name'            => esc_html_x( 'Project', 'Post type singular name', 'portfolio-headless-cms' ),
            'menu_name'                => esc_html_x( 'Projects', 'Admin Menu text', 'portfolio-headless-cms' ),
            'name_admin_bar'           => esc_html_x( 'Project', 'Add New on Toolbar', 'portfolio-headless-cms' ),
            'archives'                 => esc_html__( 'Project Archives', 'portfolio-headless-cms' ),
            'attributes'               => esc_html__( 'Project Attributes', 'portfolio-headless-cms' ),
            'parent_item_colon'        => esc_html__( 'Parent Project:', 'portfolio-headless-cms' ),
            'all_items'                => esc_html__( 'All Projects', 'portfolio-headless-cms' ),
            'add_new_item'             => esc_html__( 'Add New Project', 'portfolio-headless-cms' ),
            'add_new'                  => esc_html__( 'Add New', 'portfolio-headless-cms' ),
            'new_item'                 => esc_html__( 'New Project', 'portfolio-headless-cms' ),
            'edit_item'                => esc_html__( 'Edit Project', 'portfolio-headless-cms' ),
            'update_item'              => esc_html__( 'Update Project', 'portfolio-headless-cms' ),
            'view_item'                => esc_html__( 'View Project', 'portfolio-headless-cms' ),
            'view_items'               => esc_html__( 'View Projects', 'portfolio-headless-cms' ),
            'search_items'             => esc_html__( 'Search Project', 'portfolio-headless-cms' ),
            'not_found'                => esc_html__( 'No projects found', 'portfolio-headless-cms' ),
            'not_found_in_trash'       => esc_html__( 'No projects found in Trash', 'portfolio-headless-cms' ),
            'featured_image'           => esc_html__( 'Project Featured Image', 'portfolio-headless-cms' ),
            'set_featured_image'       => esc_html__( 'Set featured image', 'portfolio-headless-cms' ),
            'remove_featured_image'    => esc_html__( 'Remove featured image', 'portfolio-headless-cms' ),
            'use_featured_image'       => esc_html__( 'Use as featured image', 'portfolio-headless-cms' ),
            'filter_items_list'        => esc_html__( 'Filter projects list', 'portfolio-headless-cms' ),
            'items_list_navigation'    => esc_html__( 'Projects list navigation', 'portfolio-headless-cms' ),
            'items_list'               => esc_html__( 'Projects list', 'portfolio-headless-cms' ),
            'item_published'           => esc_html__( 'Project published', 'portfolio-headless-cms' ),
            'item_published_privately' => esc_html__( 'Project published privately', 'portfolio-headless-cms' ),
            'item_reverted_to_draft'   => esc_html__( 'Project reverted to draft', 'portfolio-headless-cms' ),
            'item_scheduled'           => esc_html__( 'Project scheduled', 'portfolio-headless-cms' ),
            'item_updated'             => esc_html__( 'Project updated', 'portfolio-headless-cms' ),
            'text_domain'              => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'                => $labels,
            'description'           => esc_html__( 'Custom post type for portfolio projects', 'portfolio-headless-cms' ),
            'public'                => true,
            'publicly_queryable'    => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'query_var'             => true,
            'rewrite'               => array(
                'slug'       => 'projects',
                'with_front' => true,
            ),
            'capability_type'       => 'post',
            'has_archive'           => true,
            'hierarchical'          => false,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-portfolio',
            'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ),
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'project',
            'graphql_plural_name'   => 'projects',
        );

        register_post_type( 'project', $args );
    }

    /**
     * Register Service post type
     */
    public static function register_service_post_type() {
        $labels = array(
            'name'                     => esc_html_x( 'Services', 'Post type general name', 'portfolio-headless-cms' ),
            'singular_name'            => esc_html_x( 'Service', 'Post type singular name', 'portfolio-headless-cms' ),
            'menu_name'                => esc_html_x( 'Services', 'Admin Menu text', 'portfolio-headless-cms' ),
            'name_admin_bar'           => esc_html_x( 'Service', 'Add New on Toolbar', 'portfolio-headless-cms' ),
            'archives'                 => esc_html__( 'Service Archives', 'portfolio-headless-cms' ),
            'attributes'               => esc_html__( 'Service Attributes', 'portfolio-headless-cms' ),
            'parent_item_colon'        => esc_html__( 'Parent Service:', 'portfolio-headless-cms' ),
            'all_items'                => esc_html__( 'All Services', 'portfolio-headless-cms' ),
            'add_new_item'             => esc_html__( 'Add New Service', 'portfolio-headless-cms' ),
            'add_new'                  => esc_html__( 'Add New', 'portfolio-headless-cms' ),
            'new_item'                 => esc_html__( 'New Service', 'portfolio-headless-cms' ),
            'edit_item'                => esc_html__( 'Edit Service', 'portfolio-headless-cms' ),
            'update_item'              => esc_html__( 'Update Service', 'portfolio-headless-cms' ),
            'view_item'                => esc_html__( 'View Service', 'portfolio-headless-cms' ),
            'view_items'               => esc_html__( 'View Services', 'portfolio-headless-cms' ),
            'search_items'             => esc_html__( 'Search Service', 'portfolio-headless-cms' ),
            'not_found'                => esc_html__( 'No services found', 'portfolio-headless-cms' ),
            'not_found_in_trash'       => esc_html__( 'No services found in Trash', 'portfolio-headless-cms' ),
            'featured_image'           => esc_html__( 'Service Featured Image', 'portfolio-headless-cms' ),
            'set_featured_image'       => esc_html__( 'Set featured image', 'portfolio-headless-cms' ),
            'remove_featured_image'    => esc_html__( 'Remove featured image', 'portfolio-headless-cms' ),
            'use_featured_image'       => esc_html__( 'Use as featured image', 'portfolio-headless-cms' ),
            'filter_items_list'        => esc_html__( 'Filter services list', 'portfolio-headless-cms' ),
            'items_list_navigation'    => esc_html__( 'Services list navigation', 'portfolio-headless-cms' ),
            'items_list'               => esc_html__( 'Services list', 'portfolio-headless-cms' ),
            'item_published'           => esc_html__( 'Service published', 'portfolio-headless-cms' ),
            'item_published_privately' => esc_html__( 'Service published privately', 'portfolio-headless-cms' ),
            'item_reverted_to_draft'   => esc_html__( 'Service reverted to draft', 'portfolio-headless-cms' ),
            'item_scheduled'           => esc_html__( 'Service scheduled', 'portfolio-headless-cms' ),
            'item_updated'             => esc_html__( 'Service updated', 'portfolio-headless-cms' ),
            'text_domain'              => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'              => $labels,
            'description'         => esc_html__( 'Custom post type for services', 'portfolio-headless-cms' ),
            'public'              => true,
            'publicly_queryable'  => true,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => true,
            'rewrite'             => array(
                'slug'       => 'services',
                'with_front' => true,
            ),
            'capability_type'     => 'post',
            'has_archive'         => true,
            'hierarchical'        => false,
            'menu_position'       => 6,
            'menu_icon'           => 'dashicons-admin-tools',
            'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
            'show_in_graphql'     => true,
            'graphql_single_name' => 'service',
            'graphql_plural_name' => 'services',
        );

        register_post_type( 'service', $args );
    }

    /**
     * Register Testimonial post type
     */
    public static function register_testimonial_post_type() {
        $labels = array(
            'name'                     => esc_html_x( 'Testimonials', 'Post type general name', 'portfolio-headless-cms' ),
            'singular_name'            => esc_html_x( 'Testimonial', 'Post type singular name', 'portfolio-headless-cms' ),
            'menu_name'                => esc_html_x( 'Testimonials', 'Admin Menu text', 'portfolio-headless-cms' ),
            'name_admin_bar'           => esc_html_x( 'Testimonial', 'Add New on Toolbar', 'portfolio-headless-cms' ),
            'archives'                 => esc_html__( 'Testimonial Archives', 'portfolio-headless-cms' ),
            'attributes'               => esc_html__( 'Testimonial Attributes', 'portfolio-headless-cms' ),
            'parent_item_colon'        => esc_html__( 'Parent Testimonial:', 'portfolio-headless-cms' ),
            'all_items'                => esc_html__( 'All Testimonials', 'portfolio-headless-cms' ),
            'add_new_item'             => esc_html__( 'Add New Testimonial', 'portfolio-headless-cms' ),
            'add_new'                  => esc_html__( 'Add New', 'portfolio-headless-cms' ),
            'new_item'                 => esc_html__( 'New Testimonial', 'portfolio-headless-cms' ),
            'edit_item'                => esc_html__( 'Edit Testimonial', 'portfolio-headless-cms' ),
            'update_item'              => esc_html__( 'Update Testimonial', 'portfolio-headless-cms' ),
            'view_item'                => esc_html__( 'View Testimonial', 'portfolio-headless-cms' ),
            'view_items'               => esc_html__( 'View Testimonials', 'portfolio-headless-cms' ),
            'search_items'             => esc_html__( 'Search Testimonial', 'portfolio-headless-cms' ),
            'not_found'                => esc_html__( 'No testimonials found', 'portfolio-headless-cms' ),
            'not_found_in_trash'       => esc_html__( 'No testimonials found in Trash', 'portfolio-headless-cms' ),
            'featured_image'           => esc_html__( 'Testimonial Avatar', 'portfolio-headless-cms' ),
            'set_featured_image'       => esc_html__( 'Set avatar', 'portfolio-headless-cms' ),
            'remove_featured_image'    => esc_html__( 'Remove avatar', 'portfolio-headless-cms' ),
            'use_featured_image'       => esc_html__( 'Use as avatar', 'portfolio-headless-cms' ),
            'filter_items_list'        => esc_html__( 'Filter testimonials list', 'portfolio-headless-cms' ),
            'items_list_navigation'    => esc_html__( 'Testimonials list navigation', 'portfolio-headless-cms' ),
            'items_list'               => esc_html__( 'Testimonials list', 'portfolio-headless-cms' ),
            'item_published'           => esc_html__( 'Testimonial published', 'portfolio-headless-cms' ),
            'item_published_privately' => esc_html__( 'Testimonial published privately', 'portfolio-headless-cms' ),
            'item_reverted_to_draft'   => esc_html__( 'Testimonial reverted to draft', 'portfolio-headless-cms' ),
            'item_scheduled'           => esc_html__( 'Testimonial scheduled', 'portfolio-headless-cms' ),
            'item_updated'             => esc_html__( 'Testimonial updated', 'portfolio-headless-cms' ),
            'text_domain'              => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'              => $labels,
            'description'         => esc_html__( 'Custom post type for testimonials', 'portfolio-headless-cms' ),
            'public'              => false,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_menu'        => true,
            'query_var'           => false,
            'rewrite'             => false,
            'capability_type'     => 'post',
            'has_archive'         => false,
            'hierarchical'        => false,
            'menu_position'       => 7,
            'menu_icon'           => 'dashicons-format-quote',
            'supports'            => array( 'title', 'editor', 'thumbnail' ),
            'show_in_graphql'     => true,
            'graphql_single_name' => 'testimonial',
            'graphql_plural_name' => 'testimonials',
        );

        register_post_type( 'testimonial', $args );
    }
}
