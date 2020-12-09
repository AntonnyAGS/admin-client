import { useNamespacedActions } from 'vuex-composition-helpers'
import { Actions } from '@/store/projects'
import { ref, onMounted } from '@nuxtjs/composition-api'

import { ProjectService } from '@/services'

export function useLoadProjects () {
  const { setProjects } = useNamespacedActions<Actions>('projects', ['setProjects'])

  const loading = ref()
  const result = ref()

  onMounted(() => {
    loading.value = true
    const service = new ProjectService()
    service.projects().then((res) => {
      result.value = res
      setProjects(res)
    }).finally(() => {
      loading.value = false
    })
  })

  return {
    result,
    loading
  }
}
