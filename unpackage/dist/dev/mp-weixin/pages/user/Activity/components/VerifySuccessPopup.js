"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "VerifySuccessPopup",
  props: {
    show: Boolean,
    orderNo: String,
    initiator: String,
    initiatorAvatar: String
  },
  emits: ["update:show", "continue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function close() {
      emit("update:show", false);
    }
    function onContinue() {
      emit("continue");
      close();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? {
        b: common_vendor.o(close)
      } : {}, {
        c: __props.show
      }, __props.show ? {
        d: common_vendor.o(close),
        e: common_vendor.p({
          type: "closeempty",
          size: "32",
          color: "#888"
        }),
        f: common_vendor.o(onContinue)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86c1ab98"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/user/Activity/components/VerifySuccessPopup.js.map
