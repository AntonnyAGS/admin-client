import { useNamespacedActions } from 'vuex-composition-helpers'
import { Actions } from '@/store/groups'
import { ref, onMounted } from '@nuxtjs/composition-api'

import { GroupService } from '@/services'

export function useLoadGroups () {
  const { setGroups } = useNamespacedActions<Actions>('groups', ['setGroups'])

  const loading = ref()
  const result = ref()

  onMounted(() => {
    loading.value = true
    const service = new GroupService()
    service.groups().then((res) => {
      result.value = res
      setGroups(res)
    }).finally(() => {
      loading.value = false
    })
  })

  return {
    result,
    loading
  }
}
