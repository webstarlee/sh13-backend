import i18next from "i18next";
import middleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";

console.log(__dirname);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + "/../../public/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: 'en',
    preload: ["en", 'ru'],
    removeLngFromUrl: false
  });


  export default i18next;