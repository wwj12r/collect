"use strict";
const common_vendor = require("../../common/vendor.js");
const services_index = require("../../services/index.js");
const utils_enums = require("../../utils/enums.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_swiper2 + _easycom_u_popup2)();
}
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const popupRef = common_vendor.ref(null);
    const imgUrl = common_vendor.ref("");
    const showPopup = common_vendor.ref(false);
    const authorized = common_vendor.ref(common_vendor.index.getStorageSync("token"));
    const detail = common_vendor.ref({});
    common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      fetchData(option.id);
    });
    common_vendor.onMounted((e) => {
    });
    const fetchData = async (id) => {
      const res = await services_index.IndexApi.getActivitysignetDetail(id);
      common_vendor.index.__f__("log", "at pages/index/detail.vue:131", res);
      detail.value = res;
    };
    const hidePopup = () => {
      popupRef.value.close();
    };
    const copyContent = () => {
      common_vendor.index.setClipboardData({
        data: "发布一篇活动介绍到小红书",
        success: () => {
          common_vendor.index.showToast({ title: "已复制", icon: "none" });
        }
      });
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          imgUrl.value = res.tempFilePaths[0];
        }
      });
    };
    const getAuthorize = () => {
      common_vendor.index.getSetting({
        success: (res) => {
          common_vendor.index.showLoading({ title: "正在登录" });
          if (res.authSetting["scope.userInfo"]) {
            login();
          } else {
            common_vendor.index.authorize({
              scope: "scope.userInfo",
              success: (res2) => {
                common_vendor.index.__f__("log", "at pages/index/detail.vue:167", res2);
                login();
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/index/detail.vue:171", err);
                common_vendor.index.hideLoading();
              }
            });
          }
        }
      });
    };
    const login = () => {
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          getUserInfo(res.code);
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/index/detail.vue:186", err);
          common_vendor.index.hideLoading();
        }
      });
    };
    const getUserInfo = (code) => {
      common_vendor.index.getUserInfo({
        provider: "weixin",
        withCredentials: true,
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/index/detail.vue:196", code, JSON.stringify(res));
          getToken(code, res);
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/index/detail.vue:200", err);
          common_vendor.index.hideLoading();
        }
      });
    };
    const getToken = (code, userInfo) => {
      services_index.IndexApi.postLogin({ code, userInfo: JSON.stringify(userInfo) }).then((res) => {
        common_vendor.index.__f__("log", "at pages/index/detail.vue:207", res);
        common_vendor.index.setStorageSync("token", res.access_token);
        showPopup.value = true;
        common_vendor.index.hideLoading();
      }).catch((rej) => {
        common_vendor.index.hideLoading();
      });
    };
    const submit = () => {
      common_vendor.index.showToast({ title: "提交成功", icon: "success" });
      hidePopup();
    };
    const openPopUp = () => {
      if (!common_vendor.index.getStorageSync("token")) {
        common_vendor.index.navigateTo({ url: "/pages/login/index" });
      } else {
        showPopup.value = true;
      }
    };
    const stampImgs = [
      "https://your-image-url/stamp1.jpg",
      "https://your-image-url/stamp2.jpg",
      "https://your-image-url/stamp3.jpg"
    ];
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: (_a = detail.value.content) == null ? void 0 : _a.length
      }, ((_b = detail.value.content) == null ? void 0 : _b.length) ? {
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
          vueId: "9e4af262-0"
        }),
        c: common_vendor.o(_ctx.handleTouchStart),
        d: common_vendor.o(_ctx.onSwiperChange),
        e: common_vendor.p({
          list: detail.value.content,
          height: "1100rpx",
          keyName: "id",
          interval: "1500",
          showTitle: true,
          autoplay: _ctx.autoplay,
          circular: true
        })
      } : {}, {
        f: common_vendor.unref(utils_enums.imgBaseUrl) + ((_c = detail.value.content) == null ? void 0 : _c.headimg),
        g: common_vendor.o(copyContent),
        h: common_vendor.f(stampImgs, (img, idx, i0) => {
          return {
            a: img,
            b: idx
          };
        }),
        i: authorized.value
      }, authorized.value ? {
        j: common_vendor.o(openPopUp)
      } : {
        k: common_vendor.o(getAuthorize)
      }, {
        l: common_vendor.o(copyContent),
        m: imgUrl.value
      }, imgUrl.value ? {
        n: imgUrl.value
      } : {}, {
        o: common_vendor.o(chooseImage),
        p: !imgUrl.value,
        q: common_vendor.o(submit),
        r: common_vendor.o(($event) => showPopup.value = false),
        s: common_vendor.o(($event) => showPopup.value = true),
        t: common_vendor.p({
          show: showPopup.value,
          ["mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9e4af262"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/detail.js.map
