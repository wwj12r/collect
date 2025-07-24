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
  __name: "edit",
  setup(__props) {
    const mainImages = common_vendor.ref([
      "https://your-image-url/main1.jpg",
      "https://your-image-url/main2.jpg"
    ]);
    const stampImages = common_vendor.ref([
      "https://your-image-url/stamp1.jpg",
      "https://your-image-url/stamp2.jpg",
      "https://your-image-url/stamp3.jpg"
    ]);
    const detailImages = common_vendor.ref([
      "https://your-image-url/detail1.jpg"
    ]);
    const intro = common_vendor.ref("");
    function chooseMainImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          mainImages.value.push(res.tempFilePaths[0]);
        }
      });
    }
    function chooseStampImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          stampImages.value.push(res.tempFilePaths[0]);
        }
      });
    }
    function chooseDetailImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          detailImages.value.push(res.tempFilePaths[0]);
        }
      });
    }
    function save() {
      common_vendor.index.showToast({ title: "保存成功", icon: "success" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "email",
          size: "22",
          color: "#222"
        }),
        b: common_vendor.f(mainImages.value, (img, idx, i0) => {
          return {
            a: img,
            b: idx
          };
        }),
        c: common_vendor.p({
          type: "plusempty",
          size: "32",
          color: "#bbb"
        }),
        d: common_vendor.o(chooseMainImage),
        e: common_vendor.p({
          type: "medal",
          size: "22",
          color: "#222"
        }),
        f: common_vendor.f(stampImages.value, (img, idx, i0) => {
          return {
            a: img,
            b: idx
          };
        }),
        g: common_vendor.p({
          type: "plusempty",
          size: "32",
          color: "#bbb"
        }),
        h: common_vendor.o(chooseStampImage),
        i: common_vendor.p({
          type: "compose",
          size: "22",
          color: "#222"
        }),
        j: intro.value,
        k: common_vendor.o(($event) => intro.value = $event.detail.value),
        l: common_vendor.p({
          type: "chat",
          size: "22",
          color: "#222"
        }),
        m: common_vendor.f(detailImages.value, (img, idx, i0) => {
          return {
            a: img,
            b: idx
          };
        }),
        n: common_vendor.p({
          type: "plusempty",
          size: "32",
          color: "#bbb"
        }),
        o: common_vendor.o(chooseDetailImage),
        p: common_vendor.o(save)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-40faf9ea"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/Activity/edit.js.map
