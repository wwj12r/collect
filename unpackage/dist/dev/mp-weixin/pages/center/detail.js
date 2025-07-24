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
  __name: "detail",
  setup(__props) {
    const idea = {
      img: "https://your-image-url/idea-detail.jpg",
      likes: "3.2万",
      comments: 7812,
      shares: 3283,
      desc: "店里面的印章数量是我见过最多的，而且都很好看！",
      extra: "印章收集好打卡！南京夫子庙/周末来试试。儿童的印章数量是我见过最多的，而且都很好看！喜欢收藏的姐妹们快来看看~ #盖章 #集章 #集章地图 #文创产品 #文创设计 #推荐 南京夫子庙盖章南京集章 有南京感",
      date: "2025-07-21"
    };
    return (_ctx, _cache) => {
      return {
        a: idea.img,
        b: common_vendor.p({
          type: "hand-up",
          size: "32",
          color: "#fff"
        }),
        c: common_vendor.t(idea.likes),
        d: common_vendor.p({
          type: "chat",
          size: "32",
          color: "#fff"
        }),
        e: common_vendor.t(idea.comments),
        f: common_vendor.p({
          type: "paperplane",
          size: "32",
          color: "#fff"
        }),
        g: common_vendor.t(idea.shares),
        h: common_vendor.t(idea.desc),
        i: common_vendor.t(idea.extra),
        j: common_vendor.t(idea.date)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e87a6b2d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/center/detail.js.map
