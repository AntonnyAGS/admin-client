<template>
  <v-card v-if="user" class="user fill-height">
    <div class="user__breadcrumbs">
      Você está aqui:
      <v-breadcrumbs
        class="pa-0"
        :items="breadcrumbItems"
        style="margin-left: 15px;"
        divider=">"
      />
    </div>
    <v-divider />
    <user-header :user="user" />
    <v-divider />
    <groups
      v-if="user.role === UserRole.STUDENT"
      :groups="groups.filter(g => g.users.map(u => u._id).includes(user._id))"
    />
    <v-divider v-if="user.role === UserRole.STUDENT" />
    <projects
      v-if="user.role !== UserRole.ADMIN"
      :projects="getUserProjects"
    />
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

import { UserService } from '@/services'

import { User } from '@/types'

import { Header as UserHeader, Groups, Projects } from '@/components/Users'

import { useLoadGroups, useLoadProjects } from '@/hooks'
import { useNamespacedState } from 'vuex-composition-helpers'

import { State as GroupsState } from '@/store/groups'
import { State as ProjectsState } from '@/store/projects'

import { UserRole } from '@/enums'

export default defineComponent({
  components: {
    UserHeader,
    Groups,
    Projects
  },

  setup (_, { root: { $route } }) {
    const { groups } = useNamespacedState<GroupsState>('groups', ['groups'])
    const { projects } = useNamespacedState<ProjectsState>('projects', ['projects'])
    const { id } = $route.params

    const user = ref<User>()

    const getUser = async () => {
      try {
        const service = new UserService()
        user.value = await service.user(id)
      } catch (error) {
        console.log(error)
      }
    }

    useLoadGroups()
    useLoadProjects()
    getUser()

    const breadcrumbItems = computed(() => {
      return [
        { text: 'Usuários', disabled: false, link: true, exact: true, to: '/users' },
        { text: user.value?.name, disabled: true }
      ]
    })

    const getUserProjects = computed(() => {
      return projects.value.filter((p) => {
        const isClient = p.clientId === user.value?._id

        // @ts-ignore
        const _groups = p.groupsId.map(g => groups.value.find(({ _id }) => _id === g))
        // @ts-ignore
        const isMemberOfGroups = _groups.map(g => g.users.map(({ _id }) => _id).includes(user.value?._id))

        return isClient || isMemberOfGroups
      })
    })

    return {
      user,
      breadcrumbItems,
      groups,
      projects,
      UserRole,
      getUserProjects
    }
  }
})

</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
