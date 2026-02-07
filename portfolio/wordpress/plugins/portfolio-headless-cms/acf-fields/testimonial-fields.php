<?php
/**
 * Testimonial ACF Field Group
 *
 * @package portfolio-headless-cms
 */

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    return;
}

acf_add_local_field_group( array(
    'key'                   => 'group_testimonial_details',
    'title'                 => esc_html__( 'Testimonial Details', 'portfolio-headless-cms' ),
    'fields'                => array(
        array(
            'key'               => 'field_testimonial_author_name',
            'label'             => esc_html__( 'Author Name', 'portfolio-headless-cms' ),
            'name'              => 'testimonial_author_name',
            'type'              => 'text',
            'instructions'      => '',
            'required'          => 1,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'John Doe',
        ),
        array(
            'key'               => 'field_testimonial_rating',
            'label'             => esc_html__( 'Rating', 'portfolio-headless-cms' ),
            'name'              => 'testimonial_rating',
            'type'              => 'number',
            'instructions'      => esc_html__( 'Rate from 1 to 5 stars', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'default_value'     => 5,
            'min'               => 1,
            'max'               => 5,
            'step'              => 1,
        ),
        array(
            'key'               => 'field_testimonial_author_role',
            'label'             => esc_html__( 'Author Role', 'portfolio-headless-cms' ),
            'name'              => 'testimonial_author_role',
            'type'              => 'text',
            'instructions'      => esc_html__( 'e.g., "CEO", "Founder", "Marketing Manager"', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'CEO',
        ),
        array(
            'key'               => 'field_testimonial_company',
            'label'             => esc_html__( 'Company', 'portfolio-headless-cms' ),
            'name'              => 'testimonial_company',
            'type'              => 'text',
            'instructions'      => '',
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'Company Name',
        ),
        array(
            'key'               => 'field_testimonial_company_url',
            'label'             => esc_html__( 'Company URL', 'portfolio-headless-cms' ),
            'name'              => 'testimonial_company_url',
            'type'              => 'url',
            'instructions'      => '',
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '100',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'https://example.com',
        ),
        array(
            'key'               => 'field_is_featured_testimonial',
            'label'             => esc_html__( 'Featured', 'portfolio-headless-cms' ),
            'name'              => 'is_featured_testimonial',
            'type'              => 'true_false',
            'instructions'      => esc_html__( 'Display this testimonial in the featured section', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '100',
                'class' => '',
                'id'    => '',
            ),
            'message'           => '',
            'default_value'     => 0,
            'ui'                => 1,
            'ui_on_text'        => 'Yes',
            'ui_off_text'       => 'No',
        ),
    ),
    'location'              => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'testimonial',
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
    'description'           => esc_html__( 'Fields for client testimonials', 'portfolio-headless-cms' ),
    'show_in_graphql'       => true,
    'graphql_field_name'    => 'testimonialDetails',
) );
