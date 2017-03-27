<template>
  <div class="barChart">
    <bar-chart :chart-data="datasetsfull"></bar-chart>
  </div>
</template>

<script>
import BarChart from './charts/barChart.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hello',
  components: {BarChart},
  mounted () {
    this.$store.dispatch('FETCH_BAR_GRAPH') // upon mount call the action to be performed.
  },
  computed: {
    datasetsfull () { // The object that gets propogated to barChart.js
      return {
        labels: ['/processes/editor', '/data', '/analytics', '/processes', '/', '/player'],
        datasets: [
          {
            label: 'Crash Frequency',
            backgroundColor: '#f87979',
            data: this.GetBarGraphData // Getter from Vuex.
          }
        ]
      }
    },
    ...mapGetters([
      'GetBarGraphData'
    ])
  },
  methods: mapActions([
    'FETCH_BAR_GRAPH'
  ])
}
</script>

<style scoped>

</style>
