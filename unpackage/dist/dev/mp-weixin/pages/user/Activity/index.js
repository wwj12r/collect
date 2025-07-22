"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabs = ["全部", "待审核", "待核销", "已完成"];
    const activeTab = common_vendor.ref(0);
    const list = [
      {
        orderNo: "241234585456452510082",
        signupTime: "2025-07-12 13:21",
        img: "https://your-image-url/act1.jpg",
        title: "见珠水.荔路繁花Hallo Pandas熊猫主题市集",
        statusText: "待审核",
        statusType: "pending",
        time: "2025-07-30 11:30",
        address: "广州市越秀区文德路西场东街一巷285:05"
      },
      {
        orderNo: "241234585456452510083",
        signupTime: "2025-07-12 13:25",
        img: "https://your-image-url/act2.jpg",
        title: "书店盖章活动「1200x幸运无限联名套色章」",
        statusText: "",
        statusType: "",
        time: "2025-08-15 14:30",
        address: "广州市越秀区1200bookshop北京路店"
      },
      {
        orderNo: "241234585456452510084",
        signupTime: "2025-07-12 13:29",
        img: "https://your-image-url/act3.jpg",
        title: "见珠水.荔路繁花Hallo Pandas熊猫主题市集",
        statusText: "核销码",
        statusType: "verify",
        time: "2025-07-30 11:30",
        address: "广州市越秀区文德路西场东街一巷285:05"
      },
      {
        orderNo: "24123458545695210087",
        signupTime: "2025-07-12 11:25",
        img: "https://your-image-url/act4.jpg",
        title: "北京路套色章上线Hallo Pandas熊猫主题市集",
        statusText: "",
        statusType: "",
        time: "2025-08-01 10:00",
        address: "广州市越秀区北京路步行街"
      }
    ];
    const filteredList = common_vendor.computed(() => {
      if (activeTab.value === 0)
        return list;
      if (activeTab.value === 1)
        return list.filter((i) => i.statusText === "待审核");
      if (activeTab.value === 2)
        return list.filter((i) => i.statusText === "核销码");
      if (activeTab.value === 3)
        return list.filter((i) => i.statusText === "");
      return list;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, idx, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.n({
              active: idx === activeTab.value
            }),
            d: common_vendor.o(($event) => activeTab.value = idx, tab)
          };
        }),
        b: common_vendor.f(filteredList.value, (item, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.orderNo),
            b: common_vendor.t(item.signupTime),
            c: item.img,
            d: common_vendor.t(item.title),
            e: item.statusText
          }, item.statusText ? {
            f: common_vendor.t(item.statusText),
            g: common_vendor.n(item.statusType)
          } : {}, {
            h: common_vendor.t(item.time),
            i: common_vendor.t(item.address),
            j: "619b9af0-0-" + i0,
            k: item.orderNo
          });
        }),
        c: common_vendor.p({
          type: "right",
          size: "24",
          color: "#bbb"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-619b9af0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/Activity/index.js.map
