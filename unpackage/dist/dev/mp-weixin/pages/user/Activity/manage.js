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
  __name: "manage",
  setup(__props) {
    const activities = [
      {
        createTime: "2025-07-12 11:25",
        status: "已发布",
        img: "https://your-image-url/act1.jpg",
        title: "见珠水.荔路繁花Hallo Pandas熊猫主题市集",
        time: "2025-07-30 11:30",
        address: "广州市越秀区文德路西场东街一巷285:05",
        stats: {
          joined: 2318,
          liked: 285,
          verified: 245,
          unverified: 25
        }
      },
      {
        createTime: "2025-07-12 11:25",
        status: "未发布",
        img: "https://your-image-url/act1.jpg",
        title: "见珠水.荔路繁花Hallo Pandas熊猫主题市集",
        time: "2025-07-30 11:30",
        address: "广州市越秀区文德路西场东街一巷285:05",
        stats: {
          joined: 2318,
          liked: 285,
          verified: 245,
          unverified: 25
        }
      },
      {
        createTime: "2025-07-12 11:25",
        status: "已发布",
        img: "https://your-image-url/act1.jpg",
        title: "见珠水.荔路繁花Hallo Pandas熊猫主题市集",
        time: "2025-07-30 11:30",
        address: "广州市越秀区文德路西场东街一巷285:05",
        stats: {
          joined: 2318,
          liked: 285,
          verified: 245,
          unverified: 25
        }
      }
    ];
    function onScan(item) {
      common_vendor.index.navigateTo({ url: "/pages/user/Activity/verify" });
    }
    function onCode(item) {
      common_vendor.index.showToast({ title: "生成核销码", icon: "none" });
    }
    function onDown(item) {
      common_vendor.index.showToast({ title: "下架", icon: "none" });
    }
    function onEdit(item) {
      common_vendor.index.showToast({ title: "重新编辑", icon: "none" });
    }
    function onUp(item) {
      common_vendor.index.showToast({ title: "上架", icon: "none" });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(activities, (item, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.createTime),
            b: common_vendor.t(item.status),
            c: item.status === "已发布" ? 1 : "",
            d: item.status === "未发布" ? 1 : "",
            e: item.img,
            f: common_vendor.t(item.title),
            g: common_vendor.t(item.time),
            h: common_vendor.t(item.address),
            i: "5507137a-0-" + i0,
            j: common_vendor.t(item.stats.joined),
            k: "5507137a-1-" + i0,
            l: common_vendor.t(item.stats.liked),
            m: "5507137a-2-" + i0,
            n: common_vendor.t(item.stats.verified),
            o: "5507137a-3-" + i0,
            p: common_vendor.t(item.stats.unverified),
            q: item.status === "已发布"
          }, item.status === "已发布" ? {
            r: common_vendor.o(($event) => onScan(), idx),
            s: common_vendor.o(($event) => onCode(), idx),
            t: common_vendor.o(($event) => onDown(), idx)
          } : {
            v: common_vendor.o(($event) => onEdit(), idx),
            w: common_vendor.o(($event) => onUp(), idx)
          }, {
            x: idx
          });
        }),
        b: common_vendor.p({
          type: "person",
          size: "20",
          color: "#bbb"
        }),
        c: common_vendor.p({
          type: "heart",
          size: "20",
          color: "#bbb"
        }),
        d: common_vendor.p({
          type: "checkbox",
          size: "20",
          color: "#bbb"
        }),
        e: common_vendor.p({
          type: "close",
          size: "20",
          color: "#bbb"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5507137a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/Activity/manage.js.map
