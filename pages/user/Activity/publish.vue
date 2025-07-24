<template>
	<view class="publish-page">
		<!-- 基础信息 -->
		<view class="section">
			<view class="section-title">
				<u-icon name="email" size="22" color="#222" />
				<text>基础信息</text>
			</view>
			<view class="form-row">
				<text class="label required">*活动名称</text>
				<input class="input" v-model="form.title" placeholder="请输入" />
				<u-icon type="compose" size="18" color="#bbb" />
			</view>
			<view class="form-row">
				<text class="label">*活动地址</text>
				<input class="input" v-model="form.address" placeholder="请输入" />
				<u-icon type="compose" size="18" color="#bbb" />
			</view>
			<view class="form-row">
				<text class="label">*活动时间</text>
				<picker mode="date" :value="form.date" @change="onDateChange">
					<view class="input">{{ form.date ? form.date : '请选择日期' }}</view>
				</picker>
				<u-icon type="calendar" size="18" color="#bbb" />
			</view>
		</view>

		<!-- 活动配置 -->
		<view class="section">
			<view class="section-title">
				<u-icon type="gear" size="22" color="#222" />
				<text>活动配置</text>
			</view>
			<view class="form-row">
				<text class="label">*活动详情配置</text>
				<navigator url="/pages/activity/detailConfig">
					<view class="input" @click="onToEdit">请选择</view>
				</navigator>
				<u-icon type="right" size="18" color="#bbb" />
			</view>
			<view class="form-row">
				<text class="label">*活动参与人数</text>
				<input class="input" v-model="form.people" type="number" placeholder="请输入" />
			</view>
			<view class="form-row">
				<text class="label">*报名费用</text>
				<input class="input" v-model="form.fee" type="number" placeholder="输入0元即为免费" />
				<u-icon type="compose" size="18" color="#bbb" />
			</view>
			<view class="form-row">
				<text class="label">*报名方式</text>
				<radio-group :value="form.signupType" @change="onSignupTypeChange" class="radio-group">
					<label class="radio-label">
						<radio value="apply" :checked="form.signupType === 'apply'" />需提交申请
					</label>
					<label class="radio-label">
						<radio value="direct" :checked="form.signupType === 'direct'" />直接报名
					</label>
				</radio-group>
			</view>
			<view class="form-row column">
				<text class="label">*报名条件</text>
				<input class="input" v-model="form.condition" placeholder="填写用户须输入的内容" />
				<textarea class="textarea" v-model="form.conditionDetail" placeholder="输入正文" />
				<u-icon type="compose" size="18" color="#bbb" style="position:absolute;right:20rpx;top:20rpx;" />
			</view>
		</view>

		<!-- 发布按钮 -->
		<button class="submit-btn" @click="submit">发布活动</button>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
	title: '',
	address: '',
	date: '',
	people: 50,
	fee: '',
	signupType: 'direct',
	condition: '',
	conditionDetail: ''
})

function onDateChange(e) {
	form.value.date = e.detail.value
}
function onSignupTypeChange(e) {
	form.value.signupType = e.detail.value
}
function submit() {
	console.log(form.value)
	// uni.showToast({ title: '发布成功', icon: 'success' })
}

function onToEdit() {
	uni.navigateTo({ url: '/pages/user/Activity/edit' })
}
</script>

<style scoped>
.publish-page {
	background: #f7f7f7;
	min-height: 100vh;
	padding-bottom: 40rpx;
}

.section {
	background: #fff;
	border-radius: 18rpx;
	margin: 24rpx 18rpx 0 18rpx;
	padding: 18rpx 0 0 0;
}

.section-title {
	font-size: 26rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
	margin-bottom: 18rpx;
	padding-left: 24rpx;
}

.section-title u-icon {
	margin-right: 8rpx;
}

.form-row {
	display: flex;
	align-items: center;
	padding: 0 24rpx 18rpx 24rpx;
	position: relative;
}

.form-row.column {
	flex-direction: column;
	align-items: flex-start;
}

.label {
	font-size: 22rpx;
	color: #222;
	width: 180rpx;
	flex-shrink: 0;
}

.required {
	color: #ff6600;
}

.input {
	flex: 1;
	font-size: 22rpx;
	color: #333;
	background: #f7f7f7;
	border-radius: 8rpx;
	padding: 12rpx 16rpx;
	margin-left: 8rpx;
	border: none;
}

.textarea {
	width: 100%;
	min-height: 80rpx;
	font-size: 22rpx;
	color: #333;
	background: #f7f7f7;
	border-radius: 8rpx;
	padding: 12rpx 16rpx;
	margin-top: 8rpx;
	border: none;
}

.radio-group {
	display: flex;
	align-items: center;
	margin-left: 8rpx;
}

.radio-label {
	margin-right: 24rpx;
	font-size: 22rpx;
	color: #333;
	display: flex;
	align-items: center;
}

.submit-btn {
	width: 90%;
	background: #222;
	color: #fff;
	font-size: 32rpx;
	border-radius: 50rpx;
	padding: 20rpx 0;
	font-weight: bold;
	margin: 40rpx auto;
	display: block;
}
</style>
