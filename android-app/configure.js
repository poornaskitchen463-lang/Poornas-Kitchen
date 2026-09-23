// Writes capacitor.config.json. Uses the hosted app link from ../app-settings.json if set
// (the Android app then always shows the latest version); otherwise bundles ./www.
const fs = require("fs");
let appUrl = "";
try { appUrl = JSON.parse(fs.readFileSync("../app-settings.json", "utf8")).appUrl || ""; } catch (e) {}
const config = {
  appId: "in.poornaskitchen.app",
  appName: "Poorna's Kitchen",
  webDir: "www",
  backgroundColor: "#FBF3E1",
  android: { allowMixedContent: false },
  server: appUrl ? { url: appUrl, cleartext: false } : { androidScheme: "https" }
};
fs.writeFileSync("capacitor.config.json", JSON.stringify(config, null, 2));
console.log("capacitor.config.json written", appUrl ? "(loads " + appUrl + ")" : "(bundled app)");
