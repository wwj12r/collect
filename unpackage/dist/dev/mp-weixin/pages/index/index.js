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
    const toDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/detail?id=123"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          item
        }, s0, i0) => {
          return {
            a: common_vendor.unref(utils_enums.imgBaseUrl) + item.headimg,
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "1cf27b2a-0"
        }),
        b: common_vendor.o(onSwiperChange),
        c: common_vendor.p({
          list: content.value,
          height: "1100rpx",
          keyName: "id",
          showTitle: true,
          autoplay: false,
          circular: true
        }),
        d: common_vendor.t(["", "待报名", "报名中", "已结束"][content.value[currentIndex.value].state]),
        e: common_vendor.t(content.value[currentIndex.value].title),
        f: common_vendor.unref(utils_enums.imgBaseUrl) + content.value[currentIndex.value].headimg,
        g: common_vendor.t(content.value[currentIndex.value].nickname),
        h: common_assets._imports_0,
        i: common_vendor.t(content.value[currentIndex.value].startTime),
        j: common_assets._imports_1,
        k: common_vendor.t(content.value[currentIndex.value].address),
        l: common_vendor.t(content.value[currentIndex.value].num),
        m: common_assets._imports_2,
        n: common_vendor.o(toDetail)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
