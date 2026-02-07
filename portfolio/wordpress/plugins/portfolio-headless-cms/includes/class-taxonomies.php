<?php
/**
 * Portfolio Taxonomies
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Taxonomies class
 */
class Taxonomies {

    /**
     * Register taxonomies
     */
    public static function register() {
        add_action( 'init', array( __CLASS__, 'register_project_type_taxonomy' ) );
        add_action( 'init', array( __CLASS__, 'register_tech_stack_taxonomy' ) );
        add_action( 'init', array( __CLASS__, 'register_project_status_taxonomy' ) );
    }

    /**
     * Register Project Type taxonomy
     */
    public static function register_project_type_taxonomy() {
        $labels = array(
            'name'                       => esc_html_x( 'Project Types', 'taxonomy general name', 'portfolio-headless-cms' ),
            'singular_name'              => esc_html_x( 'Project Type', 'taxonomy singular name', 'portfolio-headless-cms' ),
            'menu_name'                  => esc_html_x( 'Project Types', 'admin menu', 'portfolio-headless-cms' ),
            'all_items'                  => esc_html__( 'All Project Types', 'portfolio-headless-cms' ),
            'parent_item'                => esc_html__( 'Parent Project Type', 'portfolio-headless-cms' ),
            'parent_item_colon'          => esc_html__( 'Parent Project Type:', 'portfolio-headless-cms' ),
            'new_item_name'              => esc_html__( 'New Project Type', 'portfolio-headless-cms' ),
            'add_new_item'               => esc_html__( 'Add New Project Type', 'portfolio-headless-cms' ),
            'edit_item'                  => esc_html__( 'Edit Project Type', 'portfolio-headless-cms' ),
            'update_item'                => esc_html__( 'Update Project Type', 'portfolio-headless-cms' ),
            'view_item'                  => esc_html__( 'View Project Type', 'portfolio-headless-cms' ),
            'separate_items_with_commas' => esc_html__( 'Separate types with commas', 'portfolio-headless-cms' ),
            'add_or_remove_items'        => esc_html__( 'Add or remove types', 'portfolio-headless-cms' ),
            'choose_from_most_used'      => esc_html__( 'Choose from most used', 'portfolio-headless-cms' ),
            'popular_items'              => esc_html__( 'Popular Project Types', 'portfolio-headless-cms' ),
            'search_items'               => esc_html__( 'Search Project Types', 'portfolio-headless-cms' ),
            'not_found'                  => esc_html__( 'Not Found', 'portfolio-headless-cms' ),
            'no_terms'                   => esc_html__( 'No types', 'portfolio-headless-cms' ),
            'items_list'                 => esc_html__( 'Project Types list', 'portfolio-headless-cms' ),
            'items_list_navigation'      => esc_html__( 'Project Types list navigation', 'portfolio-headless-cms' ),
            'text_domain'                => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'            => $labels,
            'description'       => esc_html__( 'Project type taxonomy', 'portfolio-headless-cms' ),
            'public'            => true,
            'publicly_queryable' => true,
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_in_menu'      => true,
            'show_in_nav_menus' => true,
            'show_tagcloud'     => false,
            'show_in_quick_edit' => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array(
                'slug'       => 'project-type',
                'with_front' => true,
            ),
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'projectType',
            'graphql_plural_name'   => 'projectTypes',
        );

        register_taxonomy( 'project_type', 'project', $args );
    }

    /**
     * Register Tech Stack taxonomy
     */
    public static function register_tech_stack_taxonomy() {
        $labels = array(
            'name'                       => esc_html_x( 'Technologies', 'taxonomy general name', 'portfolio-headless-cms' ),
            'singular_name'              => esc_html_x( 'Technology', 'taxonomy singular name', 'portfolio-headless-cms' ),
            'menu_name'                  => esc_html_x( 'Technologies', 'admin menu', 'portfolio-headless-cms' ),
            'all_items'                  => esc_html__( 'All Technologies', 'portfolio-headless-cms' ),
            'parent_item'                => null,
            'parent_item_colon'          => null,
            'new_item_name'              => esc_html__( 'New Technology', 'portfolio-headless-cms' ),
            'add_new_item'               => esc_html__( 'Add New Technology', 'portfolio-headless-cms' ),
            'edit_item'                  => esc_html__( 'Edit Technology', 'portfolio-headless-cms' ),
            'update_item'                => esc_html__( 'Update Technology', 'portfolio-headless-cms' ),
            'view_item'                  => esc_html__( 'View Technology', 'portfolio-headless-cms' ),
            'separate_items_with_commas' => esc_html__( 'Separate technologies with commas', 'portfolio-headless-cms' ),
            'add_or_remove_items'        => esc_html__( 'Add or remove technologies', 'portfolio-headless-cms' ),
            'choose_from_most_used'      => esc_html__( 'Choose from most used', 'portfolio-headless-cms' ),
            'popular_items'              => esc_html__( 'Popular Technologies', 'portfolio-headless-cms' ),
            'search_items'               => esc_html__( 'Search Technologies', 'portfolio-headless-cms' ),
            'not_found'                  => esc_html__( 'Not Found', 'portfolio-headless-cms' ),
            'no_terms'                   => esc_html__( 'No technologies', 'portfolio-headless-cms' ),
            'items_list'                 => esc_html__( 'Technologies list', 'portfolio-headless-cms' ),
            'items_list_navigation'      => esc_html__( 'Technologies list navigation', 'portfolio-headless-cms' ),
            'text_domain'                => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'            => $labels,
            'description'       => esc_html__( 'Technology stack taxonomy', 'portfolio-headless-cms' ),
            'public'            => true,
            'publicly_queryable' => true,
            'hierarchical'      => false,
            'show_ui'           => true,
            'show_in_menu'      => true,
            'show_in_nav_menus' => true,
            'show_tagcloud'     => true,
            'show_in_quick_edit' => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array(
                'slug'       => 'tech',
                'with_front' => true,
            ),
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'techStack',
            'graphql_plural_name'   => 'techStacks',
        );

        register_taxonomy( 'tech_stack', 'project', $args );
    }

    /**
     * Register Project Status taxonomy
     */
    public static function register_project_status_taxonomy() {
        $labels = array(
            'name'                       => esc_html_x( 'Statuses', 'taxonomy general name', 'portfolio-headless-cms' ),
            'singular_name'              => esc_html_x( 'Status', 'taxonomy singular name', 'portfolio-headless-cms' ),
            'menu_name'                  => esc_html_x( 'Project Status', 'admin menu', 'portfolio-headless-cms' ),
            'all_items'                  => esc_html__( 'All Statuses', 'portfolio-headless-cms' ),
            'parent_item'                => esc_html__( 'Parent Status', 'portfolio-headless-cms' ),
            'parent_item_colon'          => esc_html__( 'Parent Status:', 'portfolio-headless-cms' ),
            'new_item_name'              => esc_html__( 'New Status', 'portfolio-headless-cms' ),
            'add_new_item'               => esc_html__( 'Add New Status', 'portfolio-headless-cms' ),
            'edit_item'                  => esc_html__( 'Edit Status', 'portfolio-headless-cms' ),
            'update_item'                => esc_html__( 'Update Status', 'portfolio-headless-cms' ),
            'view_item'                  => esc_html__( 'View Status', 'portfolio-headless-cms' ),
            'separate_items_with_commas' => esc_html__( 'Separate statuses with commas', 'portfolio-headless-cms' ),
            'add_or_remove_items'        => esc_html__( 'Add or remove statuses', 'portfolio-headless-cms' ),
            'choose_from_most_used'      => esc_html__( 'Choose from most used', 'portfolio-headless-cms' ),
            'popular_items'              => esc_html__( 'Popular Statuses', 'portfolio-headless-cms' ),
            'search_items'               => esc_html__( 'Search Statuses', 'portfolio-headless-cms' ),
            'not_found'                  => esc_html__( 'Not Found', 'portfolio-headless-cms' ),
            'no_terms'                   => esc_html__( 'No statuses', 'portfolio-headless-cms' ),
            'items_list'                 => esc_html__( 'Statuses list', 'portfolio-headless-cms' ),
            'items_list_navigation'      => esc_html__( 'Statuses list navigation', 'portfolio-headless-cms' ),
            'text_domain'                => 'portfolio-headless-cms',
        );

        $args = array(
            'labels'            => $labels,
            'description'       => esc_html__( 'Project status taxonomy', 'portfolio-headless-cms' ),
            'public'            => true,
            'publicly_queryable' => true,
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_in_menu'      => true,
            'show_in_nav_menus' => true,
            'show_tagcloud'     => false,
            'show_in_quick_edit' => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array(
                'slug'       => 'status',
                'with_front' => true,
            ),
            'show_in_graphql'       => true,
            'graphql_single_name'   => 'projectStatus',
            'graphql_plural_name'   => 'projectStatuses',
        );

        register_taxonomy( 'project_status', 'project', $args );
    }
}
