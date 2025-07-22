"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const categories = ["热门", "覆卤", "覆新"];
    const activeCategory = common_vendor.ref(0);
    const stamps = [
      { img: "https://your-image-url/shanghai.jpg", name: "上海" },
      { img: "https://your-image-url/suzhou.jpg", name: "苏州" },
      { img: "https://your-image-url/guangzhou.jpg", name: "广州" }
    ];
    const topics = [
      {
        img: "https://your-image-url/topic1.jpg",
        desc: "活里面的印章数量是我见过最多的，而且都很好看！喜欢...",
        avatar: "https://your-image-url/avatar1.jpg",
        user: "酸辣贩奶",
        likes: 32917
      },
      {
        img: "https://your-image-url/topic2.jpg",
        desc: "来了南京的印章来了，可单色可套色，明天再整一下套色...",
        avatar: "https://your-image-url/avatar2.jpg",
        user: "Doi比企谷",
        likes: 51082
      },
      {
        img: "https://your-image-url/topic3.jpg",
        desc: "",
        avatar: "https://your-image-url/avatar3.jpg",
        user: "",
        likes: 0
      },
      {
        img: "https://your-image-url/topic4.jpg",
        desc: "",
        avatar: "https://your-image-url/avatar4.jpg",
        user: "",
        likes: 0
      }
    ];
    function onSearch() {
      common_vendor.index.showToast({ title: "搜索: " + searchText.value, icon: "none" });
    }
    function onPublish() {
      common_vendor.index.showToast({ title: "发布", icon: "none" });
    }
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_vendor.o(onSearch),
        d: common_vendor.p({
          type: "more-filled",
          size: "28",
          color: "#333"
        }),
        e: common_vendor.f(categories, (cat, idx, i0) => {
          return {
            a: common_vendor.t(cat),
            b: cat,
            c: common_vendor.n({
              active: idx === activeCategory.value
            }),
            d: common_vendor.o(($event) => activeCategory.value = idx, cat)
          };
        }),
        f: common_vendor.f(stamps, (stamp, idx, i0) => {
          return {
            a: stamp.img,
            b: common_vendor.t(stamp.name),
            c: idx
          };
        }),
        g: common_vendor.f(topics, (topic, idx, i0) => {
          return {
            a: topic.img,
            b: common_vendor.t(topic.desc),
            c: topic.avatar,
            d: common_vendor.t(topic.user),
            e: "3edf87c6-1-" + i0,
            f: common_vendor.t(topic.likes),
            g: idx
          };
        }),
        h: common_vendor.p({
          type: "heart",
          size: "20",
          color: "#f56c6c"
        }),
        i: common_vendor.p({
          type: "plusempty",
          size: "32",
          color: "#fff"
        }),
        j: common_vendor.o(onPublish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3edf87c6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/center/index.js.map
