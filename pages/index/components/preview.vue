<template>
    <view v-if="show" class="preview-mask">
        <!-- 图片轮播 -->
        <swiper class="preview-swiper" :current="current" @change="onChange">
            <swiper-item v-for="(item, idx) in imgs" :key="idx">
                <image :src="item" mode="aspectFit" class="preview-img" />
            </swiper-item>
        </swiper>

        <!-- 底部按钮 -->
        <view class="preview-footer">
            <button class="btn" @click="collect">收集电子章</button>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { CenterApi } from '../../../services/center'

// 是否显示
const show = ref(false)
// 当前预览下标
const current = ref(0)
// 预览的图片数组
const imgs = ref([])

function openPreview(options) {
    imgs.value = options.urls || []
    current.value = options.current || 0
    show.value = true
}

function onChange(e) {
    current.value = e.detail.current
}


const collect = async () => {
    const res = await CenterApi.postContentjoin({ id: imgs.value[current.value].id })
    if (res.ret == 1) {
        uni.showToast({ title: res.msg, icon: 'error' })
    } else if (!res) {
        uni.showToast({ title: '收集成功！' })
        setTimeout(() => {
            uni.navigateTo({ url: '/page/gallery/index' })
        }, 500);
    }
}

function onClose() {
    show.value = false
}

// 暴露方法给外部使用
defineExpose({ openPreview })
</script>

<style>
.preview-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    z-index: 9999;
}

.preview-swiper {
    width: 100%;
    height: 100%;
}

.preview-img {
    width: 100%;
    height: 100%;
}

.preview-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 0, 0, 0.6);
    padding: 20rpx 0 50rpx;
}

.btn {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 10rpx;
    padding: 10rpx 30rpx;
}
</style>