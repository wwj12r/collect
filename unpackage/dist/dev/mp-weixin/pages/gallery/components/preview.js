"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "preview",
  props: {
    show: Boolean,
    imgUrl: String,
    title: {
      type: String,
      default: "Be Water My friend"
    },
    desc: {
      type: String,
      default: ""
    },
    subDesc: {
      type: String,
      default: "If you love life, don't waste time, for time is what life is made up of."
    }
  },
  emits: ["update:show", "share", "like"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function close() {
      emit("update:show", false);
    }
    function onShare() {
      emit("share");
    }
    function onLike() {
      emit("like");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? {
        b: common_vendor.o(close),
        c: common_vendor.p({
          type: "closeempty",
          size: "32",
          color: "#888"
        }),
        d: __props.imgUrl,
        e: common_vendor.t(__props.title),
        f: common_vendor.t(__props.desc),
        g: common_vendor.t(__props.subDesc),
        h: common_vendor.o(onShare),
        i: common_vendor.p({
          type: "hand-up",
          size: "22",
          color: "#fff"
        }),
        j: common_vendor.o(onLike),
        k: common_vendor.o(close)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7e05c582"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/gallery/components/preview.js.map
