"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_icon + VerifySuccessPopup)();
}
const VerifySuccessPopup = () => "./components/VerifySuccessPopup.js";
const useTime = "2025-05-12 09:52:10";
const qrcodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=活动凭证示例";
const _sfc_main = {
  __name: "verify",
  setup(__props) {
    const event = {
      img: "https://your-image-url/event.jpg",
      title: "广州东山口第一届集章大会，8月8日 正式启动",
      time: "08-08 周日 13:00-18:00",
      address: "广州市越秀区文德路西场东街一巷285-05"
    };
    const showPopup = common_vendor.ref(false);
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function save() {
      common_vendor.index.showToast({ title: "保存到相册", icon: "none" });
    }
    function shareImg() {
      common_vendor.index.showToast({ title: "分享图片版", icon: "none" });
    }
    function shareText() {
      common_vendor.index.showToast({ title: "分享文字版", icon: "none" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          type: "back",
          size: "22",
          color: "#222"
        }),
        c: common_vendor.t(useTime),
        d: event.img,
        e: common_vendor.t(event.title),
        f: qrcodeUrl,
        g: common_vendor.o(($event) => showPopup.value = true),
        h: common_vendor.p({
          type: "calendar",
          size: "18",
          color: "#bbb"
        }),
        i: common_vendor.t(event.time),
        j: common_vendor.p({
          type: "location",
          size: "18",
          color: "#bbb"
        }),
        k: common_vendor.t(event.address),
        l: common_vendor.o(save),
        m: common_vendor.o(shareImg),
        n: common_vendor.o(shareText),
        o: common_vendor.o(_ctx.handleContinue),
        p: common_vendor.o(($event) => showPopup.value = $event),
        q: common_vendor.p({
          orderNo: "44123458545695210087",
          initiator: "Starshine-js",
          initiatorAvatar: "https://your-image-url/avatar.png",
          show: showPopup.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-91f0c59a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/Activity/verify.js.map
