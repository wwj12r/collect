"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "idea",
  setup(__props) {
    const imgUrl = common_vendor.ref("");
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          imgUrl.value = res.tempFilePaths[0];
        }
      });
    }
    function submit() {
      if (!imgUrl.value) {
        common_vendor.index.showToast({ title: "请上传图片", icon: "none" });
        return;
      }
      if (!title.value) {
        common_vendor.index.showToast({ title: "请输入标题", icon: "none" });
        return;
      }
      if (!content.value) {
        common_vendor.index.showToast({ title: "请输入正文", icon: "none" });
        return;
      }
      common_vendor.index.showToast({ title: "发布成功", icon: "success" });
      common_vendor.index.navigateTo({ url: "/pages/index/success" });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: imgUrl.value
      }, imgUrl.value ? {
        b: imgUrl.value
      } : {
        c: common_vendor.p({
          type: "plusempty",
          size: "36",
          color: "#bbb"
        })
      }, {
        d: common_vendor.o(chooseImage),
        e: title.value,
        f: common_vendor.o(($event) => title.value = $event.detail.value),
        g: content.value,
        h: common_vendor.o(($event) => content.value = $event.detail.value),
        i: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f8206321"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/center/idea.js.map
