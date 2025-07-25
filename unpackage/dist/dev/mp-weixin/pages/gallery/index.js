"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
if (!Math) {
  StampPreviewPopup();
}
const StampPreviewPopup = () => "./components/preview.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const cards = common_vendor.ref([
      {
        img: "https://your-image-url/bruce-lee.jpg",
        title: "Be Water My friend"
      },
      {
        img: "https://your-image-url/jaychou.jpg",
        title: "咏叹不褪晓"
      },
      {
        img: "https://your-image-url/slamdunk.jpg",
        title: "SLAM DUNK"
      },
      {
        img: "https://your-image-url/canton-tower.jpg",
        title: "CANTON TOWER"
      },
      {
        img: "https://your-image-url/stephen-jay.jpg",
        title: "STEPHEN CHOW JAY CHOU"
      },
      {
        img: "https://your-image-url/stamp-collection.jpg",
        title: ""
      }
    ]);
    const onMenuClick = () => {
      common_vendor.index.showToast({ title: "菜单点击", icon: "none" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "more-filled",
          size: "32",
          color: "#333"
        }),
        b: common_vendor.o(onMenuClick),
        c: common_vendor.f(cards.value, (card, idx, i0) => {
          return {
            a: card.img,
            b: common_vendor.t(card.title),
            c: idx,
            d: common_vendor.o(($event) => showPopup.value = true, idx)
          };
        }),
        d: common_vendor.o(($event) => _ctx.uni.showToast({
          title: "分享",
          icon: "none"
        })),
        e: common_vendor.o(($event) => _ctx.uni.showToast({
          title: "点赞",
          icon: "none"
        })),
        f: common_vendor.o(($event) => showPopup.value = $event),
        g: common_vendor.p({
          imgUrl: _ctx.imgUrl,
          title: "Be Water My friend",
          desc: "",
          subDesc: "If you love life, don't waste time, for time is what life is made up of.",
          show: showPopup.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6683764"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gallery/index.js.map
