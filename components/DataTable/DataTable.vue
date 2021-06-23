<template>
  <div>
    <v-data-table
      v-bind="$props"
      class="data-table"
      :header-props="{ sortByText: 'Ordene por...' }"
      :footer-props="{
        itemsPerPageText: '',
        itemsPerPageOptions: [ ...Array.from({ length: 10 }, (_, i) => (i + 1) * 5) ]
      }"
      locale="pt"
      v-on="$listeners"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <template v-for="(_, slot) of $slots">
        <slot :name="slot" />
      </template>
      <template v-slot:[`footer.page-text`]="item">
        {{ formatNumber(item.pageStart, 2) }} - {{ formatNumber(item.pageStop, 2) }} de {{ formatNumber(item.itemsLength, 2) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref, computed } from '@vue/composition-api'
import { VDataTable } from 'vuetify/lib'

import { formatNumber } from '@/helpers'

export default defineComponent({
  name: 'Table',
  extends: VDataTable,
  props: {
    footerTotalItems: {
      type: Number,
      default: 0
    }
  },
  setup: (props) => {
    const limitSelect = ref(10)
    const getFooterLenght = computed(() => Math.ceil(props.footerTotalItems / limitSelect.value))

    return {
      limitSelect,
      getFooterLenght,
      props,
      formatNumber
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
