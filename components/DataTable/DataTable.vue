<template>
  <div>
    <v-data-table
      v-bind="$props"
      class="data-table"
      :header-props="{ sortByText: 'Ordene por...' }"
      :footer-props="{
        itemsPerPageAllText: 'Todos',
        itemsPerPageText: 'Itens por página:'
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
        {{ item.pageStart }} - {{ item.pageStop }} de {{ item.itemsLength }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
// Libs
import { defineComponent, ref, computed } from '@vue/composition-api'
import { VDataTable } from 'vuetify/lib'

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
    const limitList = [
      { text: '5 itens', value: 5 },
      { text: '10 itens', value: 10 },
      { text: '15 itens', value: 15 }
    ]
    const getFooterLenght = computed(() => Math.ceil(props.footerTotalItems / limitSelect.value))
    const pagination = ref(1)
    const getFooterText = computed(() => {
      const min = limitSelect.value * (pagination.value - 1) + 1
      const max = limitSelect.value * pagination.value
      if (max > props.footerTotalItems) {
        return `Mostrando ${props.footerTotalItems === 0 ? '0' : min} - ${props.footerTotalItems} de ${props.footerTotalItems} itens`
      } else {
        return `Mostrando ${props.footerTotalItems === 0 ? '0' : min} - ${max} de ${props.footerTotalItems} itens`
      }
    })

    return {
      limitList,
      limitSelect,
      getFooterLenght,
      props,
      pagination,
      getFooterText
    }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
