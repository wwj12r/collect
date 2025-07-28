<template>
	<PageScaffold customStyle="padding-bottom: 220rpx!important;">
	  <!-- 活动主图 -->
		<BizSection title="活动主图" icon="/static/user/main-pic.png" customStyle="margin-bottom: 20rpx!important;">
			<ImageUploader v-model="mainImages" />
		</BizSection>

		<BizSection title="集章展示" icon="/static/user/collection-display.png" customStyle="margin-bottom: 20rpx!important;">
			<ImageUploader v-model="stampImages" />
		</BizSection>
  
		<BizSection title="活动介绍" icon="/static/user/activity-intro.png" customStyle="margin-bottom: 20rpx!important;">
			<textarea
				class="textarea"
				v-model="intro"
				placeholder="输入正文"
				maxlength="500"
				auto-height
			/>
		</BizSection>

		<BizSection title="活动详情" icon="/static/user/activity-detail.png" customStyle="margin-bottom: 20rpx!important;">	
			<ImageUploader v-model="detailImages" />
		</BizSection>
  
	  <!-- 保存按钮 -->
	  <FixedBottomButton
			text="保存"
			@click="save"
	  />
	</PageScaffold>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import ImageUploader from '@/components/ImageUploader.vue'
  import BizSection from '@/components/BizSection.vue'
	import PageScaffold from '@/components/PageScaffold.vue'
	import FixedBottomButton from '@/components/FixedBottomButton.vue'
	import { eventEmitter, EVENT_TYPE } from '@/utils/eventEmitter'
	
  const mainImages = ref([])
  const stampImages = ref([])
  const detailImages = ref([
  ])
  const intro = ref('')
  
  function save() {
		uni.showToast({ title: '保存成功', icon: 'success' })
		eventEmitter.emit(EVENT_TYPE.ACTIVITY_CONFIG_UPDATED, {
			mainImages: mainImages.value,
			stampImages: stampImages.value,
			detailImages: detailImages.value,
			intro: intro.value
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