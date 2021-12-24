import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import turkish from './turkish.json';
import english from './english.json';
import spanish from './spanish.json';

i18n.use(initReactI18next).init({
  resources: {
    en: english,
    tr: turkish,
    sp: spanish,
  },
  lng: 'en',
  react: {
    useSuspense: false,
  },
});

export default i18n;
