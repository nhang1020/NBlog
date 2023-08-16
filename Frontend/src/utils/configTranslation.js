import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viTranslation from '../languages/vi.json';
import enTranslation from '../languages/en.json';

const resources = {
    vi: { translation: viTranslation },
    en: { translation: enTranslation },
};
const defaultLanguage = localStorage.getItem('language');
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLanguage ? defaultLanguage : 'vi', // Ngôn ngữ mặc định
        fallbackLng: 'vi', // Ngôn ngữ dự phòng
        interpolation: {
            escapeValue: false, // Cho phép sử dụng các biểu thức trong chuỗi ngôn ngữ
        },
    });

export default i18n;