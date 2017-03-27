import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['newData', 'options'],
  mounted () { // If the chartData has been propogated, render the chart.
    if (this.chartData) {
      this.renderChart(this.obj, this.options)
    }
  },
  watch: {
    newData: function () { // once new data has been propogated, render the chart.
      this.renderChart(this.newData, this.options)
    }
  }
})
