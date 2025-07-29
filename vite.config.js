import path from "path";
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from "weapp-tailwindcss/vite";
// 注意： 打包成 h5 和 app 都不需要开启插件配置
const isWeapp = process.env.UNI_PLATFORM === "mp-weixin";

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

export default defineConfig({
  plugins: [
    uni(), 
    // 只在微信小程序环境下启用 weapp-tailwindcss 插件
    ...(isWeapp ? [uvwt({
      rem2rpx: true,
      disabled: false,
      // 由于 hbuilderx 会改变 process.cwd 所以这里必须传入当前目录的绝对路径
      tailwindcssBasedir: __dirname
    })] : [])
  ],
  css: {
    postcss: {
      plugins: [
        require("tailwindcss")({
          config: resolve("./tailwind.config.js"),
        }),
        require("autoprefixer"),
      ],
    },
  },
});