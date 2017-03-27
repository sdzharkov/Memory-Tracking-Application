import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Bar.extend({
  mixins: [reactiveProp],
  props: ['chartData'],
  mounted () {
    if (this.chartData) { // initial chart render
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Count of Memory Overloading Issues',
          position: 'bottom'
        },
        scales: {
          xAxis: {
            barThickness: 25
          }
        }
      })
    }
  },
  watch: {
    reactiveProp: function () { // watches changes in the propogated data, re-render chart when called
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Count of Memory Overloading Issues',
          position: 'bottom'
        },
        scales: {
          xAxis: {
            barThickness: 25
          }
        }
      })
    }
  }
})
