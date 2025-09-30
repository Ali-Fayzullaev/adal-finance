// utils/tracking.ts

// Типы событий
export type TrackingEvent = 
  | 'form_view'           // Просмотр формы
  | 'form_start'          // Начало заполнения
  | 'form_submit'         // Отправка формы
  | 'lead'                // Лид
  | 'button_click'        // Клик по кнопке
  | 'phone_click'         // Клик по телефону
  | 'whatsapp_click';     // Клик по WhatsApp

interface TrackingParams {
  event: TrackingEvent;
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  [key: string]: any;
}

// Проверка загрузки пикселей
const isPixelLoaded = (pixelName: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  switch(pixelName) {
    case 'fbq':
      return typeof window.fbq === 'function';
    case 'ym':
      return typeof window.ym === 'function';
    case 'ttq':
      return typeof window.ttq !== 'undefined';
    default:
      return false;
  }
};

// Главная функция отслеживания
export const trackEvent = (params: TrackingParams): void => {
  const { event, value, currency = 'KZT', ...otherParams } = params;

  console.log('🎯 Tracking Event:', event, params); // DEBUG

  // Facebook Pixel
  if (isPixelLoaded('fbq')) {
    try {
      switch(event) {
        case 'form_view':
          window.fbq('track', 'ViewContent', {
            content_name: params.content_name || 'Form',
            ...otherParams
          });
          break;
        
        case 'form_start':
          window.fbq('track', 'InitiateCheckout', otherParams);
          break;
        
        case 'form_submit':
        case 'lead':
          window.fbq('track', 'Lead', {
            value: value || 0,
            currency,
            ...otherParams
          });
          break;
        
        case 'button_click':
          window.fbq('trackCustom', 'ButtonClick', otherParams);
          break;
        
        case 'phone_click':
          window.fbq('track', 'Contact', { contact_type: 'phone', ...otherParams });
          break;
        
        case 'whatsapp_click':
          window.fbq('track', 'Contact', { contact_type: 'whatsapp', ...otherParams });
          break;
      }
      console.log('✅ Meta Pixel tracked:', event);
    } catch (error) {
      console.error('❌ Meta Pixel error:', error);
    }
  } else {
    console.warn('⚠️ Meta Pixel not loaded');
  }

  // Yandex Metrika
  if (isPixelLoaded('ym')) {
    try {
      const ymEvent = event.toUpperCase();
      window.ym(104202860, 'reachGoal', ymEvent, {
        value,
        currency,
        ...otherParams
      });
      console.log('✅ Yandex Metrika tracked:', ymEvent);
    } catch (error) {
      console.error('❌ Yandex Metrika error:', error);
    }
  } else {
    console.warn('⚠️ Yandex Metrika not loaded');
  }

  // TikTok Pixel
  if (isPixelLoaded('ttq')) {
    try {
      switch(event) {
        case 'form_view':
          window.ttq.track('ViewContent', {
            content_name: params.content_name || 'Form',
            ...otherParams
          });
          break;
        
        case 'form_start':
          window.ttq.track('InitiateCheckout', otherParams);
          break;
        
        case 'form_submit':
        case 'lead':
          window.ttq.track('SubmitForm', {
            value: value || 0,
            currency,
            ...otherParams
          });
          break;
        
        case 'button_click':
          window.ttq.track('ClickButton', otherParams);
          break;
        
        case 'phone_click':
        case 'whatsapp_click':
          window.ttq.track('Contact', otherParams);
          break;
      }
      console.log('✅ TikTok Pixel tracked:', event);
    } catch (error) {
      console.error('❌ TikTok Pixel error:', error);
    }
  } else {
    console.warn('⚠️ TikTok Pixel not loaded');
  }
};

// Специфичные функции для удобства
export const trackFormView = (formName?: string) => {
  trackEvent({
    event: 'form_view',
    content_name: formName || 'Contact Form'
  });
};

export const trackFormStart = (formName?: string) => {
  trackEvent({
    event: 'form_start',
    content_name: formName || 'Contact Form'
  });
};

export const trackFormSubmit = (formName?: string, value?: number) => {
  trackEvent({
    event: 'form_submit',
    content_name: formName || 'Contact Form',
    value: value || 0
  });
};

export const trackLead = (value?: number, source?: string) => {
  trackEvent({
    event: 'lead',
    value: value || 0,
    source: source || 'website'
  });
};

// Типизация для window
declare global {
  interface Window {
    fbq: any;
    ym: any;
    ttq: any;
    fbPixelReady?: boolean;
    yaMetrikaReady?: boolean;
    ttqReady?: boolean;
  }
}