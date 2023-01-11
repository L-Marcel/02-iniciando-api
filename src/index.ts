import { getApp } from "app";

getApp().then(({ app }) => {
  app.listen(3333);
});
