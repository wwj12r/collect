"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      cards: [
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
      ]
    };
  },
  methods: {
    onMenuClick() {
      common_vendor.index.showToast({ title: "菜单点击", icon: "none" });
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "more-filled",
      size: "32",
      color: "#333"
    }),
    b: common_vendor.o((...args) => $options.onMenuClick && $options.onMenuClick(...args)),
    c: common_vendor.f($data.cards, (card, idx, i0) => {
      return {
        a: card.img,
        b: common_vendor.t(card.title),
        c: idx
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d6683764"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gallery/index.js.map
