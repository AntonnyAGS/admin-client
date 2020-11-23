<template>
  <div>
    <v-data-table
      v-bind="$props"
      class="data-table"
      :header-props="{ sortByText: 'Ordene por...' }"
      :items-per-page="limitSelect"
      hide-default-footer
      v-on="$listeners"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <template v-for="(_, slot) of $slots">
        <slot :name="slot" />
      </template>
    </v-data-table>
    <div class="data-table__footer">
      <div class="data-table__footer__left">
        <v-autocomplete
          v-model="limitSelect"
          color="primary"
          hide-details
          :items="limitList"
          item-color="secondary"
          item-text="text"
          item-value="value"
          class="ma-0 pa-0"
          style="width:120px"
        />
        <div style="width:100%" class="data-table__footer__left__text d-flex align-center">
          {{ getFooterText }}
        </div>
      </div>
      <div class="data_table__footer__center d-flex align-center justify-center">
        <v-pagination
          v-model="pagination"
          rounded
          total-visible="5"
          color="primary text--white"
          :length="getFooterLenght"
        />
      </div>
    </div>
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
