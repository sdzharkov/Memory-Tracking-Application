import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

const state = {
  barGraphData: null,
  lineGraphData0: [
    {
      x: 4,
      y: 5
    },
    {
      x: 6,
      y: 7
    },
    {
      x: 7,
      y: 8
    },
    {
      x: 9,
      y: 10
    }
  ],
  lineGraphData1: [
    {
      x: 4,
      y: 5
    },
    {
      x: 6,
      y: 7
    },
    {
      x: 7,
      y: 8
    },
    {
      x: 9,
      y: 10
    }
  ],
  lineGraphData2: [
    {
      x: 4,
      y: 5
    },
    {
      x: 6,
      y: 7
    },
    {
      x: 70,
      y: 8
    },
    {
      x: 9,
      y: 1
    }
  ],
  lineGraphData3: [
    {
      x: 4,
      y: 52
    },
    {
      x: 6,
      y: 74
    },
    {
      x: 7,
      y: 80
    },
    {
      x: 9,
      y: 100
    }
  ],
  lineGraphData4: [
    {
      x: 4,
      y: 5
    },
    {
      x: 6,
      y: 7
    },
    {
      x: 7,
      y: 8
    },
    {
      x: 9,
      y: 10
    }
  ],
  lineGraphData5: [
    {
      x: 2,
      y: 3
    },
    {
      x: 22,
      y: 7
    },
    {
      x: 7,
      y: 42
    },
    {
      x: 9,
      y: 100
    }
  ]
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
