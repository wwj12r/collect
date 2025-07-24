"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/detail.js";
  "./pages/index/success.js";
  "./pages/center/index.js";
  "./pages/center/idea.js";
  "./pages/center/detail.js";
  "./pages/gallery/index.js";
  "./pages/user/index.js";
  "./pages/user/Activity/index.js";
  "./pages/user/Activity/manage.js";
  "./pages/user/Activity/verify.js";
  "./pages/user/Activity/publish.js";
  "./pages/user/Activity/edit.js";
  "./pages/user/setting.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
