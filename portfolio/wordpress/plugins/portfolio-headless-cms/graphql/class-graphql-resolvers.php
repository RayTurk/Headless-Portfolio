<?php
/**
 * GraphQL Custom Resolvers
 *
 * @package portfolio-headless-cms
 */

namespace Portfolio_Headless_CMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * GraphQL_Resolvers class
 */
class GraphQL_Resolvers {

    /**
     * Register custom GraphQL resolvers
     */
    public static function register() {
        add_action( 'graphql_register_types', array( __CLASS__, 'register_custom_queries' ) );
    }

    /**
     * Register custom queries for featured content
     */
    public static function register_custom_queries() {
        if ( ! function_exists( 'register_graphql_field' ) ) {
            return;
        }

        // Featured Projects Query
        register_graphql_field(
            'RootQuery',
            'featuredProjects',
            array(
                'type'        => array( 'list_of' => 'Project' ),
                'args'        => array(
                    'first' => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of projects to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get featured projects', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : -1;

                    $query_args = array(
                        'post_type'      => 'project',
                        'posts_per_page' => $first,
                        'orderby'        => array(
                            'meta_value_num' => 'ASC',
                            'post_date'      => 'DESC',
                        ),
                        'meta_query'     => array(
                            array(
                                'key'     => 'is_featured',
                                'value'   => '1',
                                'compare' => '=',
                            ),
                        ),
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $projects = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $projects[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $projects;
                },
            )
        );

        // Featured Services Query
        register_graphql_field(
            'RootQuery',
            'featuredServices',
            array(
                'type'        => array( 'list_of' => 'Service' ),
                'args'        => array(
                    'first' => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of services to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get featured services', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : -1;

                    $query_args = array(
                        'post_type'      => 'service',
                        'posts_per_page' => $first,
                        'orderby'        => array(
                            'meta_value_num' => 'ASC',
                            'post_date'      => 'DESC',
                        ),
                        'meta_query'     => array(
                            array(
                                'key'     => 'is_featured_service',
                                'value'   => '1',
                                'compare' => '=',
                            ),
                        ),
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $services = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $services[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $services;
                },
            )
        );

        // Featured Testimonials Query
        register_graphql_field(
            'RootQuery',
            'featuredTestimonials',
            array(
                'type'        => array( 'list_of' => 'Testimonial' ),
                'args'        => array(
                    'first' => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of testimonials to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get featured testimonials', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : -1;

                    $query_args = array(
                        'post_type'      => 'testimonial',
                        'posts_per_page' => $first,
                        'orderby'        => 'post_date',
                        'order'          => 'DESC',
                        'meta_query'     => array(
                            array(
                                'key'     => 'is_featured_testimonial',
                                'value'   => '1',
                                'compare' => '=',
                            ),
                        ),
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $testimonials = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $testimonials[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $testimonials;
                },
            )
        );

        // Projects by Technology Query
        register_graphql_field(
            'RootQuery',
            'projectsByTechnology',
            array(
                'type'        => array( 'list_of' => 'Project' ),
                'args'        => array(
                    'technology' => array(
                        'type'        => array( 'non_null' => 'String' ),
                        'description' => esc_html__( 'Technology slug or name', 'portfolio-headless-cms' ),
                    ),
                    'first'      => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of projects to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get projects by technology', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    if ( ! isset( $args['technology'] ) ) {
                        return array();
                    }

                    $technology = sanitize_text_field( $args['technology'] );
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : -1;

                    $query_args = array(
                        'post_type'      => 'project',
                        'posts_per_page' => $first,
                        'orderby'        => 'post_date',
                        'order'          => 'DESC',
                        'tax_query'      => array(
                            array(
                                'taxonomy' => 'tech_stack',
                                'field'    => 'slug',
                                'terms'    => $technology,
                            ),
                        ),
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $projects = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $projects[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $projects;
                },
            )
        );

        // Projects by Type Query
        register_graphql_field(
            'RootQuery',
            'projectsByType',
            array(
                'type'        => array( 'list_of' => 'Project' ),
                'args'        => array(
                    'type'  => array(
                        'type'        => array( 'non_null' => 'String' ),
                        'description' => esc_html__( 'Project type slug', 'portfolio-headless-cms' ),
                    ),
                    'first' => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of projects to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get projects by type', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    if ( ! isset( $args['type'] ) ) {
                        return array();
                    }

                    $project_type = sanitize_text_field( $args['type'] );
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : -1;

                    $query_args = array(
                        'post_type'      => 'project',
                        'posts_per_page' => $first,
                        'orderby'        => 'post_date',
                        'order'          => 'DESC',
                        'tax_query'      => array(
                            array(
                                'taxonomy' => 'project_type',
                                'field'    => 'slug',
                                'terms'    => $project_type,
                            ),
                        ),
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $projects = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $projects[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $projects;
                },
            )
        );

        // Recent Blog Posts Query
        register_graphql_field(
            'RootQuery',
            'recentBlogPosts',
            array(
                'type'        => array( 'list_of' => 'Post' ),
                'args'        => array(
                    'first' => array(
                        'type'        => 'Int',
                        'description' => esc_html__( 'Number of posts to return', 'portfolio-headless-cms' ),
                    ),
                ),
                'description' => esc_html__( 'Get recent blog posts', 'portfolio-headless-cms' ),
                'resolve'     => function( $root, $args ) {
                    $first = isset( $args['first'] ) ? intval( $args['first'] ) : 10;

                    $query_args = array(
                        'post_type'      => 'post',
                        'posts_per_page' => $first,
                        'orderby'        => 'post_date',
                        'order'          => 'DESC',
                        'post_status'    => 'publish',
                    );

                    $query = new \WP_Query( $query_args );

                    if ( ! $query->have_posts() ) {
                        return array();
                    }

                    $posts = array();
                    while ( $query->have_posts() ) {
                        $query->the_post();
                        $posts[] = get_post( get_the_ID() );
                    }
                    wp_reset_postdata();

                    return $posts;
                },
            )
        );
    }
}
