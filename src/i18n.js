import i18n from "i18next"
import detector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

//import translationEn from "./locales/en/translation.json"
//import translationCz from "./locales/cz/translation.json"
import translationSk from "./locales/sk/translation.json"

// the translations
const resources = {
  en: {
    translation: {},
  },
  cz: {
    translation: {},
  },
  sk: {
    translation: translationSk,
  }
}

const language = localStorage.getItem("I18N_LANGUAGE")
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "sk")
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "sk",
    fallbackLng: "en", // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
