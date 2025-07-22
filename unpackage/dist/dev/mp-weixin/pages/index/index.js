"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const title = common_vendor.ref("ww12j");
    const handleClick = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:55", 112);
    };
    const imgs = common_vendor.ref(["/static/logo.png", "/static/logo.png", "/static/logo.png"]);
    const toDetail = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:59", 11);
      common_vendor.index.navigateTo({
        url: "/pages/detail/index?id=123"
      });
    };
    return {
      imgs,
      title,
      handleClick,
      toDetail
    };
  }
});
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_swiper2 + _easycom_u_button2)();
}
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      item
    }, s0, i0) => {
      return {
        a: item,
        b: i0,
        c: s0
      };
    }, {
      name: "d",
      path: "a",
      vueId: "1cf27b2a-0"
    }),
    b: common_vendor.p({
      list: _ctx.imgs,
      height: "1100rpx",
      keyName: "image",
      showTitle: true,
      autoplay: false,
      circular: true
    }),
    c: common_assets._imports_0,
    d: common_assets._imports_1,
    e: common_assets._imports_2,
    f: common_assets._imports_3,
    g: common_vendor.o((...args) => _ctx.toDetail && _ctx.toDetail(...args)),
    h: common_vendor.o(_ctx.handleClick),
    i: common_vendor.p({
      type: "primary"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
