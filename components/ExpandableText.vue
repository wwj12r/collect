<template>
	<view>
		<view class="text" :class="{ expanded }" @tap="toggle" :style="{ fontSize: typeof iconSize === 'number' ? iconSize + 'rpx' : iconSize, '-webkit-line-clamp': maxLines }">
			{{ text }}
		</view>

		<view v-if="showToggleControl && showToggle && text.length > 50" class="toggle-icon" @tap="toggle">
			<u-icon style="text-align: center;" class="icon" :name="expanded ? 'arrow-up' : 'arrow-down'" :size="iconSize" :color="iconColor" />
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle'])
const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	maxLines: {
		type: [String, Number],
		default: 2,
	},
	iconSize: {
		type: [String, Number],
		default: 20,
	},
	iconColor: {
		type: String,
		default: '#999',
	},
	showToggleControl: {
		type: Boolean,
		default: true,
	}
})

const expanded = ref(false)
const toggle = () => {
	expanded.value = !expanded.value
	emit('toggle', expanded.value)
}

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

.toggle-icon, .icon, .u-icon {
	justify-content: center;
	text-align: center;
}
</style>