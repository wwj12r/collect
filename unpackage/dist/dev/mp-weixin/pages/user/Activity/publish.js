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
  __name: "publish",
  setup(__props) {
    const form = common_vendor.ref({
      title: "",
      address: "",
      date: "",
      people: 50,
      fee: "",
      signupType: "direct",
      condition: "",
      conditionDetail: ""
    });
    function onDateChange(e) {
      form.value.date = e.detail.value;
    }
    function onSignupTypeChange(e) {
      form.value.signupType = e.detail.value;
    }
    function submit() {
      common_vendor.index.__f__("log", "at pages/user/Activity/publish.vue:95", form.value);
    }
    function onToEdit() {
      common_vendor.index.navigateTo({ url: "/pages/user/Activity/edit" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "email",
          size: "22",
          color: "#222"
        }),
        b: form.value.title,
        c: common_vendor.o(($event) => form.value.title = $event.detail.value),
        d: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#bbb"
        }),
        e: form.value.address,
        f: common_vendor.o(($event) => form.value.address = $event.detail.value),
        g: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#bbb"
        }),
        h: common_vendor.t(form.value.date ? form.value.date : "请选择日期"),
        i: form.value.date,
        j: common_vendor.o(onDateChange),
        k: common_vendor.p({
          type: "calendar",
          size: "18",
          color: "#bbb"
        }),
        l: common_vendor.p({
          type: "gear",
          size: "22",
          color: "#222"
        }),
        m: common_vendor.o(onToEdit),
        n: common_vendor.p({
          type: "right",
          size: "18",
          color: "#bbb"
        }),
        o: form.value.people,
        p: common_vendor.o(($event) => form.value.people = $event.detail.value),
        q: form.value.fee,
        r: common_vendor.o(($event) => form.value.fee = $event.detail.value),
        s: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#bbb"
        }),
        t: form.value.signupType === "apply",
        v: form.value.signupType === "direct",
        w: form.value.signupType,
        x: common_vendor.o(onSignupTypeChange),
        y: form.value.condition,
        z: common_vendor.o(($event) => form.value.condition = $event.detail.value),
        A: form.value.conditionDetail,
        B: common_vendor.o(($event) => form.value.conditionDetail = $event.detail.value),
        C: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#bbb"
        }),
        D: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5dd4c3d6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/Activity/publish.js.map
