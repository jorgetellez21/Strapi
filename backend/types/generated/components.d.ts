import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_menu_links';
  info: {
    displayName: 'MenuLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface LayoutSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_links';
  info: {
    displayName: 'SocialLink';
  };
  attributes: {
    icono: Schema.Attribute.Media<'images' | 'files'>;
    plataforma: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    boton: Schema.Attribute.Component<'shared.boton', true>;
    descripcion: Schema.Attribute.Blocks;
    imagen_fondo: Schema.Attribute.Media<'images' | 'files'>;
    titulo: Schema.Attribute.String;
  };
}

export interface SectionsSeccionFormulario extends Struct.ComponentSchema {
  collectionName: 'components_sections_seccion_formularios';
  info: {
    displayName: 'Seccion Formulario';
  };
  attributes: {
    subtitulo: Schema.Attribute.Text;
    titulo: Schema.Attribute.String;
  };
}

export interface SectionsSeccionTextoImagen extends Struct.ComponentSchema {
  collectionName: 'components_sections_seccion_texto_imagens';
  info: {
    displayName: 'Seccion Texto Imagen';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    imagen: Schema.Attribute.Media<'images' | 'files'>;
    posicion_imagen: Schema.Attribute.Enumeration<['izquierda', 'derecha']>;
    texto_boton: Schema.Attribute.String;
    titulo: Schema.Attribute.String;
  };
}

export interface SectionsServicios extends Struct.ComponentSchema {
  collectionName: 'components_sections_servicios';
  info: {
    displayName: 'Servicios';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.cards', true>;
    descripcion: Schema.Attribute.Text;
    titulo: Schema.Attribute.String;
  };
}

export interface SectionsSliderPersonalizable extends Struct.ComponentSchema {
  collectionName: 'components_sections_slider_personalizables';
  info: {
    displayName: 'Slider Personalizable';
  };
  attributes: {
    Slides: Schema.Attribute.Component<'shared.slide-item', true>;
  };
}

export interface SharedBoton extends Struct.ComponentSchema {
  collectionName: 'components_shared_botons';
  info: {
    displayName: 'Boton';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    tipo: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'texto', 'acento']
    >;
    URL: Schema.Attribute.String;
  };
}

export interface SharedCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Cards';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    icono: Schema.Attribute.Media<'images' | 'files'>;
    titulo: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlideItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_slide_items';
  info: {
    displayName: 'SlideItem';
  };
  attributes: {
    boton: Schema.Attribute.Component<'shared.boton', true>;
    descripcion: Schema.Attribute.Blocks;
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titulo: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.menu-link': LayoutMenuLink;
      'layout.social-link': LayoutSocialLink;
      'sections.hero': SectionsHero;
      'sections.seccion-formulario': SectionsSeccionFormulario;
      'sections.seccion-texto-imagen': SectionsSeccionTextoImagen;
      'sections.servicios': SectionsServicios;
      'sections.slider-personalizable': SectionsSliderPersonalizable;
      'shared.boton': SharedBoton;
      'shared.cards': SharedCards;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slide-item': SharedSlideItem;
      'shared.slider': SharedSlider;
    }
  }
}
