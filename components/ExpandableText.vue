<template>
	<view>
		<view class="text" :class="{ expanded }" @tap="toggle">
			{{ text }}
		</view>

		<view v-if="showToggle && text.length > 50" class="toggle-icon" @tap="toggle">
			<u-icon style="text-align: center;" class="icon" :name="expanded ? 'arrow-up' : 'arrow-down'" :size=12 :color=iconColor />
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	maxLines: {
		type: Number,
		default: 2,
	},
	iconSize: {
		type: [String, Number],
		default: 20,
	},
	iconColor: {
		type: String,
		default: '#999',
	}
})

const expanded = ref(false)
const toggle = () => (expanded.value = !expanded.value)

// 可选控制是否显示展开图标
const showToggle = ref(true)
</script>

<style lang="scss" scoped>
.text {
	font-size: 28rpx;
	color: #333;
	line-height: 1.6;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	/* 限制为2行 */
}

.text.expanded {
	display: block;
	overflow: visible;
	-webkit-line-clamp: unset;
}

.toggle-icon, .icon,.u-icon {
	justify-content: center;
	text-align: center;
}
</style>