"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const popupRef = common_vendor.ref(null);
    const imgUrl = common_vendor.ref("");
    const showPopup = common_vendor.ref(false);
    const hidePopup = () => {
      popupRef.value.close();
    };
    const copyContent = () => {
      common_vendor.index.setClipboardData({
        data: "发布一篇活动介绍到小红书",
        success: () => {
          common_vendor.index.showToast({ title: "已复制", icon: "none" });
        }
      });
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          imgUrl.value = res.tempFilePaths[0];
        }
      });
    };
    const submit = () => {
      common_vendor.index.showToast({ title: "提交成功", icon: "success" });
      hidePopup();
    };
    return {
      stampImgs: [
        "https://your-image-url/stamp1.jpg",
        "https://your-image-url/stamp2.jpg",
        "https://your-image-url/stamp3.jpg"
      ],
      popupRef,
      imgUrl,
      showPopup,
      hidePopup,
      copyContent,
      chooseImage,
      submit
    };
  }
});
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f(_ctx.stampImgs, (img, idx, i0) => {
      return {
        a: img,
        b: idx
      };
    }),
    b: common_vendor.o(($event) => _ctx.showPopup = true),
    c: common_vendor.o((...args) => _ctx.copyContent && _ctx.copyContent(...args)),
    d: _ctx.imgUrl
  }, _ctx.imgUrl ? {
    e: _ctx.imgUrl
  } : {}, {
    f: common_vendor.o((...args) => _ctx.chooseImage && _ctx.chooseImage(...args)),
    g: !_ctx.imgUrl,
    h: common_vendor.o((...args) => _ctx.submit && _ctx.submit(...args)),
    i: common_vendor.o(($event) => _ctx.showPopup = false),
    j: common_vendor.o(($event) => _ctx.showPopup = true),
    k: common_vendor.p({
      show: _ctx.showPopup,
      ["mask-click"]: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e4af262"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
