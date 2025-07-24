"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activities: [
        { icon: "grid", text: "全部" },
        { icon: "circle", text: "痕章楼" },
        { icon: "list", text: "痕楼捺" },
        { icon: "checkbox", text: "已完成" }
      ],
      tools: [
        { icon: "plusempty", text: "发布活动" },
        { icon: "chatboxes", text: "活动管理" },
        { icon: "scan", text: "扫码核销" },
        { icon: "personadd", text: "发布印章" }
      ]
    };
  },
  methods: {
    goSetting() {
      common_vendor.index.navigateTo({ url: "/pages/user/setting" });
    },
    onActivityClick(item) {
      common_vendor.index.__f__("log", "at pages/user/index.vue:61", item);
      common_vendor.index.navigateTo({ url: "/pages/user/Activity/index" });
    },
    onManageClick(item) {
      common_vendor.index.__f__("log", "at pages/user/index.vue:66", item);
      common_vendor.index.navigateTo({ url: "/pages/user/Activity/manage" });
    },
    onToolClick(tool) {
      common_vendor.index.showToast({ title: tool.text, icon: "none" });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "gear",
      size: "28",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.goSetting && $options.goSetting(...args)),
    c: common_vendor.f($data.activities, (item, k0, i0) => {
      return {
        a: "79e6a490-1-" + i0,
        b: common_vendor.p({
          type: item.icon,
          size: "32",
          color: "#222"
        }),
        c: common_vendor.t(item.text),
        d: item.text,
        e: common_vendor.o(($event) => $options.onManageClick(item), item.text)
      };
    }),
    d: common_vendor.f($data.tools, (tool, k0, i0) => {
      return {
        a: "79e6a490-2-" + i0,
        b: common_vendor.p({
          type: tool.icon,
          size: "32",
          color: "#222"
        }),
        c: common_vendor.t(tool.text),
        d: tool.text,
        e: common_vendor.o(($event) => $options.onActivityClick(tool), tool.text)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79e6a490"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map
