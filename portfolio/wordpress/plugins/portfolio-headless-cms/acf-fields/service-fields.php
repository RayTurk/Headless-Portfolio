<?php
/**
 * Service ACF Field Group
 *
 * @package portfolio-headless-cms
 */

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    return;
}

acf_add_local_field_group( array(
    'key'                   => 'group_service_details',
    'title'                 => esc_html__( 'Service Details', 'portfolio-headless-cms' ),
    'fields'                => array(
        array(
            'key'               => 'field_service_icon',
            'label'             => esc_html__( 'Icon Name', 'portfolio-headless-cms' ),
            'name'              => 'service_icon',
            'type'              => 'text',
            'instructions'      => esc_html__( 'Lucide icon name (e.g., "code", "palette", "zap")', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'code',
        ),
        array(
            'key'               => 'field_service_order',
            'label'             => esc_html__( 'Display Order', 'portfolio-headless-cms' ),
            'name'              => 'service_order',
            'type'              => 'number',
            'instructions'      => esc_html__( 'Lower numbers appear first', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'default_value'     => 0,
            'min'               => 0,
            'max'               => '',
            'step'              => 1,
        ),
        array(
            'key'               => 'field_service_features',
            'label'             => esc_html__( 'Key Features', 'portfolio-headless-cms' ),
            'name'              => 'service_features',
            'type'              => 'repeater',
            'instructions'      => esc_html__( 'Add key features for this service', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '100',
                'class' => '',
                'id'    => '',
            ),
            'collapsed'         => '',
            'min'               => 0,
            'max'               => '',
            'layout'            => 'table',
            'button_label'      => esc_html__( 'Add Feature', 'portfolio-headless-cms' ),
            'sub_fields'        => array(
                array(
                    'key'               => 'field_feature_text',
                    'label'             => esc_html__( 'Feature', 'portfolio-headless-cms' ),
                    'name'              => 'feature_text',
                    'type'              => 'text',
                    'instructions'      => '',
                    'required'          => 0,
                    'conditional_logic' => 0,
                    'wrapper'           => array(
                        'width' => '100',
                        'class' => '',
                        'id'    => '',
                    ),
                    'placeholder'       => 'Feature description',
                ),
            ),
        ),
        array(
            'key'               => 'field_service_pricing_text',
            'label'             => esc_html__( 'Starting Price Text', 'portfolio-headless-cms' ),
            'name'              => 'service_pricing_text',
            'type'              => 'text',
            'instructions'      => esc_html__( 'e.g., "Starting at $99/mo"', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'placeholder'       => 'Starting at $99/mo',
        ),
        array(
            'key'               => 'field_is_featured_service',
            'label'             => esc_html__( 'Featured on Homepage', 'portfolio-headless-cms' ),
            'name'              => 'is_featured_service',
            'type'              => 'true_false',
            'instructions'      => esc_html__( 'Show this service on the homepage', 'portfolio-headless-cms' ),
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'message'           => '',
            'default_value'     => 0,
            'ui'                => 1,
            'ui_on_text'        => 'Yes',
            'ui_off_text'       => 'No',
        ),
        array(
            'key'               => 'field_service_cta_text',
            'label'             => esc_html__( 'CTA Button Text', 'portfolio-headless-cms' ),
            'name'              => 'service_cta_text',
            'type'              => 'text',
            'instructions'      => '',
            'required'          => 0,
            'conditional_logic' => 0,
            'wrapper'           => array(
                'width' => '50',
                'class' => '',
                'id'    => '',
            ),
            'default_value'     => esc_html__( 'Get Started', 'portfolio-headless-cms' ),
            'placeholder'       => '',
        ),
        array(
            'key'               => 'field_service_cta_url',
            'label'             => esc_html__( 'CTA URL', 'portfolio-headless-cms' ),
            'name'              => 'service_cta_url',
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
                'value'    => 'service',
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
    'description'           => esc_html__( 'Fields for portfolio services', 'portfolio-headless-cms' ),
    'show_in_graphql'       => true,
    'graphql_field_name'    => 'serviceDetails',
) );
