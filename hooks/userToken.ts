import { ref, watch } from 'vue'

const tokenRef = ref(uni.getStorageSync('token') || '')

watch(tokenRef, (newVal) => {
	uni.setStorageSync('token', newVal)
})

export function useToken() {
	return {
		tokenRef,
		setToken: (val: string) => (tokenRef.value = val),
		clearToken: () => (tokenRef.value = '')
	}
}
