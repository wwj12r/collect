"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const services_index = require("../../services/index.js");
const utils_enums = require("../../utils/enums.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  _easycom_u_swiper2();
}
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
if (!Math) {
  _easycom_u_swiper();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const content = common_vendor.ref([]);
    const currentIndex = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      services_index.IndexApi.getActivitysignet().then((res) => {
        content.value = res.content;
      });
    });
    const onSwiperChange = (e) => {
      currentIndex.value = e.current;
    };
    const autoplay = common_vendor.ref(true);
    const handleTouchStart = () => {
      autoplay.value = false;
    };
    const toDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/index/detail?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: content.value.length
      }, content.value.length ? {
        b: common_vendor.w(({
          item
        }, s0, i0) => {
          return {
            a: common_vendor.unref(utils_enums.imgBaseUrl) + item.headimg,
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "b",
          vueId: "1cf27b2a-0"
        }),
        c: common_vendor.o(handleTouchStart),
        d: common_vendor.o(onSwiperChange),
        e: common_vendor.p({
          list: content.value,
          height: "1100rpx",
          keyName: "id",
          interval: "1500",
          showTitle: true,
          autoplay: autoplay.value,
          circular: true
        })
      } : {}, {
        f: common_vendor.t(["", "待报名", "报名中", "已结束"][content.value[currentIndex.value].state]),
        g: common_vendor.t(content.value[currentIndex.value].title),
        h: common_vendor.unref(utils_enums.imgBaseUrl) + content.value[currentIndex.value].headimg,
        i: common_vendor.t(content.value[currentIndex.value].nickname),
        j: common_assets._imports_0,
        k: common_vendor.t(content.value[currentIndex.value].startTime),
        l: common_assets._imports_1,
        m: common_vendor.t(content.value[currentIndex.value].address),
        n: common_vendor.t(content.value[currentIndex.value].num),
        o: common_assets._imports_2,
        p: common_vendor.o(($event) => toDetail(content.value[currentIndex.value].id))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
