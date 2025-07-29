import { Ref, ref } from "vue"

interface UseActionPayload {
  successMessage: string
  failedMessage: string
  aciton: () => Promise<boolean>
}

export const useAction = (payload: UseActionPayload): [Ref<boolean>, () => void] => {
  const loading = ref(false)
  const exec = async () => {
    if (loading.value) return;
    
    loading.value = true
    try {
      const result = await payload.aciton()
      if (result) {
        uni.showToast({
          title: payload.successMessage,
          icon: 'success'
        })
      }
    } catch (err) {
      console.error(err)
      uni.showToast({
        title: payload.failedMessage,
        icon: 'none'
      })
    } finally {
      loading.value = false
    }
  }
  return [loading, exec]
}