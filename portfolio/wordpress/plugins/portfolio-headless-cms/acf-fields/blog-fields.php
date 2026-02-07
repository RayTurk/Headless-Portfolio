<?php
/**
 * Blog Post ACF Field Group
 *
 * @package portfolio-headless-cms
 */

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    return;
}

acf_add_local_field_group( array(
    'key'                   => 'group_blog_settings',
    'title'                 => esc_html__( 'Blog Post Settings', 'portfolio-headless-cms' ),
    'fields'                => array(
        array(
            'key'               => 'field_post_subtitle',
            'label'             => esc_html__( 'Subtitle', 'portfolio-headless-cms' ),
            'name'              => 'post_subtitle',
            'type'              => 'text',
            'instructions'      => esc_html__( 'A short subtitle or excerpt for the post', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '100',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => '',
        ),
        array(
            'key'               => 'field_reading_time_override',
            'label'             => esc_html__( 'Reading Time Override', 'portfolio-headless-cms' ),
            'name'              => 'reading_time_override',
            'type'              => 'number',
            'instructions'      => esc_html__( 'Override the calculated reading time in minutes. Leave blank to auto-calculate.', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'default_value'     => '',
            'min'               => 1,
            'max'               => '',
            'step'              => 1,
        ),
        array(
            'key'               => 'field_show_toc',
            'label'             => esc_html__( 'Show Table of Contents', 'portfolio-headless-cms' ),
            'name'              => 'show_toc',
            'type'              => 'true_false',
            'instructions'      => esc_html__( 'Display a table of contents on this post', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'message'           => '',
            'default_value'     => 1,
            'ui'                => 1,
            'ui_on_text'        => 'Yes',
            'ui_off_text'       => 'No',
        ),
        array(
            'key'               => 'field_related_posts',
            'label'             => esc_html__( 'Related Posts', 'portfolio-headless-cms' ),
            'name'              => 'related_posts',
            'type'              => 'relationship',
            'instructions'      => esc_html__( 'Select up to 3 related posts to display at the bottom', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '100',
                'class' => '',
                'id'    => '',
            ),
            'post_type'         => array( 'post' ),
            'taxonomy'          => '',
            'filters'           => array( 'search', 'post_type', 'taxonomy' ),
            'elements'          => array( 'featured_image', 'post_title' ),
            'min'               => '',
            'max'               => 3,
            'return_format'     => 'array',
        ),
        array(
            'key'               => 'field_cta_text',
            'label'             => esc_html__( 'CTA Text', 'portfolio-headless-cms' ),
            'name'              => 'cta_text',
            'type'              => 'text',
            'instructions'      => esc_html__( 'Call-to-action text to display at the end of the post', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'default_value'     => esc_html__( 'Need help with your WordPress site?', 'portfolio-headless-cms' ),
            'placeholder'       => '',
        ),
        array(
            'key'               => 'field_cta_url',
            'label'             => esc_html__( 'CTA URL', 'portfolio-headless-cms' ),
            'name'              => 'cta_url',
            'type'              => 'url',
            'instructions'      => esc_html__( 'Where should the CTA button link to?', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'https://example.com/contact',
        ),
    ),
    'location'              => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'post',
            ),
        ),
    ),
    'menu_order'            => 0,
    'position'              => 'normal',
    'style'                 => 'default',
    'label_placement'       => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen'        => '',
    'active'                => true,
    'description'           => esc_html__( 'Settings for blog posts', 'portfolio-headless-cms' ),
    'show_in_graphql'       => true,
    'graphql_field_name'    => 'blogPostSettings',
) );
