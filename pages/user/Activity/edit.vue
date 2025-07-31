<template>
	<PageScaffold customStyle="padding-bottom: 220rpx!important;">
	  <!-- 活动主图 -->
		<BizSection title="活动主图" icon="/static/user/main-pic.png" customStyle="margin-bottom: 20rpx!important;">
			<ImageUploader v-model="editData.photo" />
		</BizSection>

		<BizSection title="集章展示" icon="/static/user/collection-display.png" customStyle="margin-bottom: 20rpx!important;">
			<ImageUploader v-model="editData.collectImgs" />
		</BizSection>
  
		<BizSection title="活动介绍" icon="/static/user/activity-intro.png" customStyle="margin-bottom: 20rpx!important;">
			<textarea
				class="textarea"
				v-model="editData.introduction"
				placeholder="输入正文"
				maxlength="500"
				auto-height
			/>
		</BizSection>

		<BizSection title="活动详情" icon="/static/user/activity-detail.png" customStyle="margin-bottom: 20rpx!important;">	
			<ImageUploader v-model="editData.content" />
		</BizSection>
  
	  <!-- 保存按钮 -->
	  <FixedBottomButton
			text="保存"
			@click="save"
	  />
	</PageScaffold>
</template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import ImageUploader from '@/components/ImageUploader.vue'
  import BizSection from '@/components/BizSection.vue'
	import PageScaffold from '@/components/PageScaffold.vue'
	import FixedBottomButton from '@/components/FixedBottomButton.vue'
	import { eventEmitter, EVENT_TYPE } from '@/utils/eventEmitter'
	
	const editData = ref({
		photo: [],
		collectImgs: [],
		content: [],
		introduction: ''
	})

	onMounted(() => {
		eventEmitter.on(EVENT_TYPE.ACTIVITY_CONFIG_TRANSFER, (data) => {
			editData.value = data
		})
		eventEmitter.emit(EVENT_TYPE.ACTIVITY_CONFIG_GET)
	})
  
  function save() {
		if (!editData.value.photo.length) {
			uni.showToast({ title: '请上传活动主图', icon: 'none' })
			return
		}
		if (!editData.value.collectImgs.length) {
			uni.showToast({ title: '请上传集章展示', icon: 'none' })
			return
		}
		if (!editData.value.content.length) {
			uni.showToast({ title: '请上传活动详情', icon: 'none' })
			return
		}
		if (!editData.value.introduction?.trim()) {
			uni.showToast({ title: '请输入活动介绍', icon: 'none' })
			return
		}
		uni.showToast({ title: '保存成功', icon: 'success' })
		eventEmitter.emit(EVENT_TYPE.ACTIVITY_CONFIG_UPDATED, {
			photo: editData.value.photo,
			collectImgs: editData.value.collectImgs,
			content: editData.value.content,
			introduction: editData.value.introduction
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 2000)
	// 这里可对接后端API
  }
  </script>
  
<style scoped>
.textarea {
	width: 100%;
	min-height: 220rpx;
	font-size: 30rpx;
	color: #333;
	box-sizing: border-box;
	background: #f7f7f7;
	border-radius: 8rpx;
	padding: 12rpx 16rpx;
	border: none;
}
</style>