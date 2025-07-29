import { onMounted, ref } from "vue"

type Fetch<T> = (page: number, pageSize: number) => Promise<T[]>

export const useList = <T>(fetch: Fetch<T>, pageSize = 10) => {
  const data = ref<T[]>([])
  const status = ref<'more' | 'loading' | 'no-more'>('more')
  const page = ref(1)
  const loading = ref(false)
  const hasMore = ref(true)

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return
    
    loading.value = true
    status.value = 'loading'
    
    try {
      const newData = await fetch(page.value, pageSize)
      
      if (newData.length === pageSize) {
        (data.value as any).push(...newData)
        page.value++
        status.value = 'more'
      } else if (newData.length > 0) {
        (data.value as any).push(...newData)
        page.value++
        status.value = 'no-more'
      } else {
        status.value = 'no-more'
      }
    } catch (error) {
      console.error('Load more failed:', error)
      status.value = 'more'
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    loading.value = true
    status.value = 'loading'
    page.value = 1
    hasMore.value = true
    data.value = []
    
    try {
      const newData = await fetch(1)
      
      if (newData && newData.length > 0) {
        data.value = newData
        page.value = 2
        status.value = 'more'
      } else {
        hasMore.value = false
        status.value = 'no-more'
      }
    } catch (error) {
      console.error('Refresh failed:', error)
      status.value = 'more'
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = []
    status.value = 'more'
    page.value = 1
    loading.value = false
    hasMore.value = true
  }

  onMounted(loadMore)

  return {
    data,
    status,
    loading,
    hasMore,
    page,
    loadMore,
    refresh,
    reset
  }
}