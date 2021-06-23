import { inject } from '@nuxtjs/composition-api'
import { NotificationOptions } from 'vue-notification'

type Notify = (options: NotificationOptions | string) => void;

export function useNotify () {
  const notify = inject<Notify>('notify')

  if (!notify) {
    throw new Error('Notify dont exist')
  }

  return notify
}
