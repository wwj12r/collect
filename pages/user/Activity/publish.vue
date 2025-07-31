<template>
	<PageScaffold customStyle="padding-bottom: 220rpx!important;">
		<uni-forms 
			ref="formRef" 
			:model="form" 
			:rules="rules"
			label-position="left"
			label-width="200rpx"
		>
			<!-- 基础信息 -->
			<BizSection 
				title="基础信息" 
				icon="/static/user/basic-info.png"
				customStyle="margin-bottom: 20rpx!important;"
			>
				
				<uni-forms-item 
					label="活动名称" 
					name="title" 
					required
				>
					<uni-easyinput 
						v-model="form.title" 
						placeholder="请输入"
						:clearable="true"
						suffix-icon="compose"
						suffix-icon-style="color: #1a1a1a;"
						placeholder-style="color: #999;"
						:inputBorder="false"
					/>
				</uni-forms-item>
				
				<uni-forms-item 
					label="活动地址" 
					name="address" 
					required
				>
					<uni-easyinput 
						v-model="form.address" 
						placeholder="请输入"
						:clearable="true"
						suffix-icon="compose"
						suffix-icon-style="color: #1a1a1a;"
						placeholder-style="color: #999;"
						:inputBorder="false"
					/>
				</uni-forms-item>
				
				<uni-forms-item 
					label="活动时间" 
					name="date" 
					required
				>
					<uni-datetime-picker 
						v-model="form.date"
						type="datetimerange"
						:clear-icon="false"
						placeholder="请选择日期"
						@change="onDateChange"
						return-type="timestamp"
					>
						<view class="date-text" :class="{ active: !!form.formatDate }">
							{{ form.formatDate || '请选择日期' }}
							<uni-icons type="compose" size="22" color="#999" />
						</view>
					</uni-datetime-picker>
				</uni-forms-item>
			</BizSection>

			<!-- 活动配置 -->
			<BizSection 
				title="活动配置" 
				icon="/static/user/active-config.png"
			>
				
				<uni-forms-item 
					label="活动详情配置" 
					name="detailConfig" 
					required
					labelWidth="260rpx"
				>
					<view @click="onToEdit" class="edit-config" :class="{ selected: !!activityConfig }">
						{{ activityConfig ? '已配置' : '请选择' }}
						<uni-icons type="right" size="22" color="#bbb" />
					</view>
				</uni-forms-item>
				
				<uni-forms-item 
					label="活动参与人数" 
					name="limitNum" 
					required
					labelWidth="260rpx"
				>
					<uni-easyinput 
						v-model="form.limitNum" 
						placeholder="请输入"
						type="number"
						:inputBorder="false"
						suffix-icon="compose"
						suffix-icon-style="color: #1a1a1a;"
						placeholder-style="color: #999;"
					/>
				</uni-forms-item>
				
				<!-- <uni-forms-item 
					label="报名费用" 
					name="registrationFee" 
					required
				>
					<uni-easyinput 
						v-model="form.registrationFee" 
						placeholder="输入0元即为免费  请输入"
						type="number"
						:clearable="true"
						suffix-icon="compose"
						suffix-icon-style="color: #bbb"
						:inputBorder="false"
					/>
				</uni-forms-item> -->
				
				<uni-forms-item 
					label="报名方式" 
					name="type" 
					required
				>
					<uni-data-checkbox 
						v-model="form.type"
						:localdata="signupTypeOptions"
						selectedColor="#1a1a1a"
					/>
				</uni-forms-item>
				
				<uni-forms-item 
					label="报名条件" 
					name="condition" 
					required
				>
					<uni-easyinput 
						v-model="form.condition" 
						placeholder="填写用户须输入的内容"
						:clearable="true"
						:inputBorder="false"
						suffix-icon="compose"
						suffix-icon-style="color: #1a1a1a;"
					/>
				</uni-forms-item>
				
				<uni-forms-item 
					name="conditionDetail"
					class="condition-detail"
					labelWidth="0"
					style="padding: 0;"
				>
					<uni-easyinput 
						v-model="form.conditionDetail" 
						type="textarea"
						placeholder="输入分享内容"
						:auto-height="true"
						maxlength="500"
						:inputBorder="false"
						class="condition-detail-input"
					/>
				</uni-forms-item>
			</BizSection>
		</uni-forms>

		<!-- 发布按钮 -->
		<FixedBottomButton
			:text="activityId ? '编辑活动' : '发布活动'"
			:loading="submitLoading"
			:loading-text="activityId ? '编辑中...' : '发布中...'"
			@click="submit"
		/>
	</PageScaffold>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import BizSection from '@/components/BizSection.vue'
import PageScaffold from '@/components/PageScaffold.vue'
import FixedBottomButton from '@/components/FixedBottomButton.vue'
import { eventEmitter, EVENT_TYPE } from '@/utils/eventEmitter'
import { ActivityApi } from '../../../services/activity'

const activityConfig = ref(null)

const onActivityConfigUpdated = (data) => {
	activityConfig.value = data
}

const onActivityConfigGet = () => {
	if (activityConfig.value) {
		eventEmitter.emit(EVENT_TYPE.ACTIVITY_CONFIG_TRANSFER, activityConfig.value)
	}
}

onMounted(() => {
	eventEmitter.on(EVENT_TYPE.ACTIVITY_CONFIG_UPDATED, onActivityConfigUpdated)
	eventEmitter.on(EVENT_TYPE.ACTIVITY_CONFIG_GET, onActivityConfigGet)
})
onUnmounted(() => {
	eventEmitter.off(EVENT_TYPE.ACTIVITY_CONFIG_UPDATED, onActivityConfigUpdated)
	eventEmitter.off(EVENT_TYPE.ACTIVITY_CONFIG_GET, onActivityConfigGet)
})

// 表单数据
const form = ref({
	title: '',
	address: '',
	date: '',
	formatDate: '',
	detailConfig: '',
	limitNum: '',
	// registrationFee: '',
	type: 1,
	condition: '',
	conditionDetail: ''
})

const activityId = ref()
onLoad(async (query) => {
	if (!query.id) {
		return
	}
	activityId.value = query.id
	const res = await ActivityApi.fetchActivityDetail(query.id)
	const dateRange = [dayjs(res.content.startTime, 'YYYY-MM-DD HH:mm:ss').valueOf(), dayjs(res.content.endTime, 'YYYY-MM-DD HH:mm:ss').valueOf()]
	form.value = {
		title: res.content.title,
		address: res.content.address,
		date: dateRange,
		limitNum: res.content.limitNum,
		type: Number(res.content.type),
		condition: res.content.condition,
		// registrationFee: res.content.registrationFee,
	}

	activityConfig.value = {
		photo: res.content.photo?.split(','),
		content: res.content.content?.split(','),
		collectImgs: res.content.collectImgs?.split(','),
		introduction: res.content.introduction,
	}


	onDateChange(dateRange)
})

// 表单引用
const formRef = ref(null)

// 提交状态
const submitLoading = ref(false)

// 报名方式选项
const signupTypeOptions = ref([
	{
		value: 1,
		text: '需提交申请'
	},
	{
		value: 2,
		text: '直接报名'
	}
])

// 表单验证规则
const rules = ref({
	title: {
		rules: [
			{
				required: true,
				errorMessage: '请输入活动名称'
			},
			{
				minLength: 2,
				maxLength: 50,
				errorMessage: '活动名称长度应为2-50个字符'
			}
		]
	},
	address: {
		rules: [
			{
				required: true,
				errorMessage: '请输入活动地址'
			}
		]
	},
	date: {
		rules: [
			{
				required: true,
				errorMessage: '请选择活动时间'
			}
		]
	},
	limitNum: {
		rules: [
			{
				required: true,
				errorMessage: '请输入参与人数'
			},
			{
				format: 'number',
				errorMessage: '参与人数必须为数字'
			}
		]
	},
	// registrationFee: {
	// 	rules: [
	// 		{
	// 			required: true,
	// 			errorMessage: '请输入报名费用'
	// 		},
	// 		{
	// 			format: 'number',
	// 			errorMessage: '报名费用必须为数字'
	// 		}
	// 	]
	// },
	type: {
		rules: [
			{
				required: true,
				errorMessage: '请选择报名方式'
			}
		]
	},
	condition: {
		rules: [
			{
				required: true,
				errorMessage: '请输入报名条件'
			}
		]
	}
})

// 日期变化
function onDateChange(value) {
	const [start, end] = value
	const startDate = dayjs(start);
	const endDate = dayjs(end);
	const mapDayToChn = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	if (endDate.isSame(startDate, 'day') && endDate.isSame(startDate, 'year') && endDate.isSame(dayjs(), 'year')){
		form.value.formatDate = `${startDate.format('MM月DD日')} ${mapDayToChn[startDate.day()]} ${startDate.format('hh:mm')} ~ ${endDate.format('hh:mm')}`;
		return;
	}
	
	if (endDate.isSame(startDate, 'month') && endDate.isSame(startDate, 'year') && endDate.isSame(dayjs(), 'year')){
		form.value.formatDate = `${startDate.format('MM月')}${startDate.format('DD日')} ${startDate.format('hh:mm')} ~ ${endDate.format('DD日')} ${endDate.format('hh:mm')}`;
		return;
	}

	if (endDate.isSame(startDate, 'year') && endDate.isSame(dayjs(), 'year')) {
		form.value.formatDate = `${startDate.format('MM月DD日 hh:mm')} ~ ${endDate.format('MM月DD日 hh:mm')}`;
		return
	}
	
	form.value.formatDate = `${startDate.format('YYYY年MM月DD日 hh:mm')} ~ ${endDate.format('YYYY年MM月DD日 hh:mm')}`;
}

// 跳转到编辑页面
function onToEdit(event) {
	event.preventDefault();
	uni.navigateTo({ 
		url: '/pages/user/Activity/edit' 
	})
}

// 提交表单
async function submit() {
	try {
		// 表单验证
		const result = await formRef.value.validate()
		if (!result) {
			return
		}

		if (!activityConfig.value) {
			uni.showToast({
				title: '请先配置活动详情',
				icon: 'none',
				duration: 2000
			})
			return;
		}

		submitLoading.value = true

		// 构造提交数据
		const submitData = {
			title: form.value.title,
			address: form.value.address,
			startTime: dayjs(form.value.date[0]).format('YYYY-MM-DD HH:mm:ss'),
			endTime: dayjs(form.value.date[1]).format('YYYY-MM-DD HH:mm:ss'),
			photo: activityConfig.value.photo.join(','),
			content: activityConfig.value.content.join(','),
			collectImgs: activityConfig.value.collectImgs.join(','),
			introduction: activityConfig.value.introduction,
			type: form.value.type,
			limitNum: Number(form.value.limitNum),
			condition: form.value.condition,
		}

		if (activityId.value) {
			const res = await ActivityApi.republishActivity(submitData, activityId.value)
			console.log(res)
			if (res.ret === 0) {
				uni.showToast({
					title: '编辑成功',
					icon: 'success',
					duration: 2000
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				})
			}
		} else {
			const res = await ActivityApi.publishActivity(submitData)
			console.log(res)
			if (res.ret === 0) {
				uni.showToast({
					title: '发布成功',
					icon: 'success',
					duration: 2000
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				})
			}
		}

		// 延迟跳转
		setTimeout(() => {
			uni.navigateBack()
		}, 2000)

	} catch (error) {
		console.error('发布失败:', error)
		
		uni.showToast({
			title: error.message || '发布失败，请重试',
			icon: 'none',
			duration: 2000
		})
	} finally {
		submitLoading.value = false
	}
}
</script>

<style scoped>
:deep(.uni-forms-item__label) {
	font-size: 30rpx!important;
	color: #1A1A1A!important;
}

:deep(.uni-easyinput__content-input) {
	text-align: right;
}

:deep(.uni-forms-item__label .is-required) {
	font-size: 30rpx!important;
	color: #1A1A1A!important;
}

:deep(.uniui-compose) {
	color: #1A1A1A!important;
}

:deep(.uni-easyinput__content-input) {
	color: #1A1A1A!important;
	font-weight: bold;
	font-size: 28rpx!important;
}

.date-text {
	text-align: right;
	color: #999;
	padding-right: 20rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10rpx;
	font-size: 22rpx;
	white-space: break-spaces;
}

.date-text.active {
	font-weight: bold; 
	color: #1A1A1A;
	font-size: 28rpx;
}

.edit-config {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10rpx;
	font-size: 22rpx;
	color: #999;
	padding: 24rpx 12rpx 24rpx 0;
}

.edit-config.selected {
	color: #1A1A1A;
}

:deep(.uni-forms-item) {
	align-items: center;
	margin-bottom: 12rpx!important;
	padding: 12rpx 0!important;
}

:deep(.checklist-group) {
	display: flex!important;
	flex-direction: row!important;
	justify-content: flex-end;
	padding: 24rpx 12rpx 24rpx 0 !important;
	gap: 24rpx!important;
}

:deep(.checklist-box) {
	margin: 0!important;
}

:deep(.checklist-content) {
	margin: 0!important;
	padding: 0!important;
	border: none!important;
}


:deep(.uni-easyinput__content-textarea) {
	background: #F2F2F2;
	margin: 0!important;
	padding: 24rpx!important;
	border-radius: 12rpx!important;
}

/* uni-forms-item 组件样式定制 */
:deep(.uni-forms-item) {
	margin-bottom: 18rpx;
	padding: 0;
	border-bottom: 1rpx solid #f0f0f0;
}

:deep(.uni-forms-item:last-child) {
	border-bottom: none;
}

:deep(.uni-forms-item__label) {
	font-size: 22rpx;
	color: #222;
	font-weight: normal;
	width: 180rpx;
	flex-shrink: 0;
}

:deep(.uni-forms-item__label.required::before) {
	content: '*';
	color: #ff6600;
	margin-right: 4rpx;
}

:deep(.uni-forms-item__content) {
	flex: 1;
}

/* uni-easyinput 组件样式定制 - 参考原设计 */
:deep(.uni-easyinput) {
	background: #f7f7f7;
	border-radius: 8rpx;
	border: none;
}

:deep(.uni-easyinput__content) {
	padding: 12rpx 16rpx;
	font-size: 22rpx;
	background: transparent;
}

:deep(.uni-easyinput__content-input) {
	color: #333;
	font-size: 22rpx;
}

:deep(.uni-easyinput__placeholder) {
	color: #999;
	font-size: 22rpx;
}

/* 聚焦状态 */
:deep(.uni-easyinput--focus) {
	background: #fff;
	border: 1rpx solid #ddd;
}

/* 禁用状态 */
:deep(.uni-easyinput--disabled) {
	background: #f7f7f7;
	color: #999;
}

/* uni-datetime-picker 组件样式 */
:deep(.uni-datetime-picker) {
	background: #f7f7f7;
	border-radius: 8rpx;
	border: none;
	margin-left: 8rpx;
}

:deep(.uni-datetime-picker__container) {
	padding: 12rpx 16rpx;
	font-size: 22rpx;
}

/* uni-data-checkbox 组件样式 - 参考原设计 */
:deep(.uni-data-checklist) {
	background: transparent;
	margin-left: 8rpx;
}

:deep(.checklist-group) {
	flex-direction: row;
	flex-wrap: wrap;
	gap: 24rpx;
}

:deep(.checklist-box) {
	margin-right: 0;
	margin-bottom: 0;
}

:deep(.checklist-content) {
	padding: 8rpx 16rpx;
	background: transparent;
	border-radius: 4rpx;
	border: 1rpx solid #ddd;
	font-size: 22rpx;
	color: #333;
}

:deep(.checklist-content--selected) {
	background: #222;
	color: #fff;
	border-color: #222;
}

/* 错误状态样式 */
/* :deep(.uni-forms-item--error .uni-easyinput) {
	border-color: #ff6600;
	background: #fff5f5;
}

:deep(.uni-forms-item--error .uni-datetime-picker) {
	border-color: #ff6600;
	background: #fff5f5;
} */


:deep(.uni-button-primary) {
	background: #222;
	color: #fff;
}


/* 后缀图标样式 */
:deep(.uni-easyinput__suffix-icon) {
	color: #bbb;
	font-size: 18rpx;
}

:deep(.uni-forms-item__error) {
	z-index: 10;
}

</style>
