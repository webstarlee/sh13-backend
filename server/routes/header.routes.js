/*
Header Routes
Authored by Lee
Created At 2023/3/17
*/
import i18next from "../modules/i18next";
export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/language/:lng", (req, res) => {
    const language = req.params.lng;
    console.log(language);
    req.i18n.changeLanguage(language);
    console.log(i18next.language);
    res.status(200).json({ message: "done" });
  });
}
