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
  __name: "setting",
  setup(__props) {
    const user = common_vendor.ref({
      avatar: "https://your-image-url/avatar.jpg",
      id: "831024",
      name: "Momo大锤子",
      phone: ""
    });
    function changeAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          user.value.avatar = res.tempFilePaths[0];
        }
      });
    }
    function copyId() {
      common_vendor.index.setClipboardData({
        data: user.value.id,
        success: () => {
          common_vendor.index.showToast({ title: "已复制", icon: "none" });
        }
      });
    }
    function editName() {
      common_vendor.index.showModal({
        title: "修改用户名",
        editable: true,
        placeholderText: "请输入新用户名",
        success: (res) => {
          if (res.confirm && res.content) {
            user.value.name = res.content;
          }
        }
      });
    }
    function getPhone() {
      if (user.value.phone)
        return;
      user.value.phone = "138****8888";
      common_vendor.index.showToast({ title: "获取成功", icon: "success" });
    }
    function logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "已退出", icon: "none" });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: user.value.avatar,
        b: common_vendor.p({
          type: "right",
          size: "20",
          color: "#bbb"
        }),
        c: common_vendor.o(changeAvatar),
        d: common_vendor.t(user.value.id),
        e: common_vendor.o(copyId),
        f: common_vendor.p({
          type: "copy",
          size: "18",
          color: "#bbb"
        }),
        g: common_vendor.t(user.value.name),
        h: common_vendor.o(editName),
        i: common_vendor.p({
          type: "compose",
          size: "18",
          color: "#bbb"
        }),
        j: common_vendor.t(user.value.phone ? user.value.phone : "点击获取手机号"),
        k: common_vendor.o(getPhone),
        l: common_vendor.o(logout)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-806b15dc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/setting.js.map
