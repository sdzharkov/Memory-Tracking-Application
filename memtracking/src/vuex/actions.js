// import api from './api.js'
import axios from 'axios'

export const FETCH_BAR_GRAPH = ({commit}, e) => {
  var countArray = []
  // var currentArray = []
  return axios.get('http://127.0.0.1:3000/error_count')
    .then((response) => {
      var obj = response.data
      for (var i = 0; i < obj.length; i++) {
        countArray.push(obj[i].count)
      }
      commit('addBarGraphData', countArray)
    })
    .catch(function (error) {
      if (error) {
        console.log(error)
      }
    })
}

function getLine0 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/processes/editor')
}
function getLine1 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/data')
}
function getLine2 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/analytics')
}
function getLine3 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/processes')
}
function getLine4 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/')
}
function getLine5 () {
  return axios.get('http://127.0.0.1:3000/get_line_chart?id=/player')
}

export const FETCH_LINE_GRAPH = ({commit}, e) => {
  return axios.all([getLine0(), getLine1(), getLine2(), getLine3(), getLine4(), getLine5()])
    .then(axios.spread(function (line0, line1, line2, line3, line4, line5) {
      var ar = []
      for (var i = 0; i < line0.data.length; i++) {
        ar.push(line1.data[i])
      }
      commit('addLineGraphData0', line0.data)
      commit('addLineGraphData1', line1.data)
      commit('addLineGraphData2', line2.data)
      commit('addLineGraphData3', line3.data)
      commit('addLineGraphData4', line4.data)
      commit('addLineGraphData5', line5.data)
    }))
    .catch(function (error) {
      if (error) {
        console.log(error)
      }
    })
}

// var createBarArray = (countArray, currentArray) => {
//   return {
//     labels: currentArray,
//     datasets: [
//       {
//         label: 'Count of things',
//         backgroundColor: '#f87979',
//         data: countArray
//       }
//     ]
//   }
// }

