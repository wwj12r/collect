"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "success",
  setup(__props) {
    function notifyMe() {
      common_vendor.index.showToast({ title: "已订阅通知", icon: "success" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(notifyMe)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aad7d755"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/success.js.map
