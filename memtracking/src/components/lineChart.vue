<template>
  <div class="lineChart">
    <line-chart :chart-data="obj" :options="options" :newData="datasetsfull"></line-chart>
  </div>
</template>

<script>
import lineChart from './charts/lineChart.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hello1',
  components: {lineChart},
  beforeCreate () {
    this.$store.dispatch('FETCH_LINE_GRAPH')
  },
  data () { // This is the inital entry data for the graph. We have to pass this as we have not received our API call data yet
    return {
      obj: {
        label: 'graph',
        type: 'line',
        datasets: [
          {
            label: '/',
            lineTention: 0.1,
            type: 'line',
            backgroundColor: '#DDB059',
            data: {
              x: 1,
              y: 2
            }
          },
          {
            label: '/player',
            lineTention: 0.1,
            type: 'line',
            backgroundColor: '#f87979',
            data: {
              x: 2,
              y: 3
            }
          },
          {
            label: '/processes',
            lineTention: 0.1,
            type: 'line',
            backgroundColor: '#ADF3FF',
            data: {
              x: 3,
              y: 4
            }
          },
          {
            label: '/analytics',
            lineTention: 0.1,
            type: 'line',
            backgroundColor: '#67C6AE',
            data: {
              x: 5,
              y: 5
            }

          },
          {
            label: '/data',
            lineTention: 0.1,
            type: 'line',
            backgroundColor: '#E1F5CA',
            data: {
              x: 6,
              y: 6
            }
          }
        ]
      },
      options: { // options for the graph.
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 90000000,
              max: 170000000
            }
          }],
          xAxes: [{
            position: 'bottom',
            ticks: {
              min: 1,
              max: 100000000
            }
          }]
        },
        title: {
          display: true,
          text: 'Memory Usage over Time',
          position: 'bottom'
        }
      }
    }
  },
  computed: {
    testing () {
      return this.GetLineGraphData1
    },
    datasetsfull () { // New data that will be propogated to the graph
      return {
        label: 'graph',
        type: 'line',
        datasets: [
          {
            label: '/',
            type: 'line',
            backgroundColor: '#DDB059',
            data: this.GetLineGraphData4
          },
          {
            label: '/player',
            type: 'line',
            backgroundColor: '#f87979',
            data: this.GetLineGraphData5
          },
          {
            label: '/processes',
            type: 'line',
            backgroundColor: '#ADF3FF',
            data: this.GetLineGraphData3
          },
          {
            label: '/analytics',
            type: 'line',
            backgroundColor: '#67C6AE',
            data: this.GetLineGraphData2
          },
          {
            label: '/data',
            type: 'line',
            backgroundColor: '#E1F5CA',
            data: this.GetLineGraphData1
          }
        ]
      }
    },
    ...mapGetters([
      'GetLineGraphData0', 'GetLineGraphData1', 'GetLineGraphData2', 'GetLineGraphData3', 'GetLineGraphData4', 'GetLineGraphData5'
    ])
  },
  methods: mapActions([
    'FETCH_LINE_GRAPH'
  ])

}
</script>

<style scoped>

</style>
