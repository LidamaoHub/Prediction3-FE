import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    web3: null,
    wallet_address: null,
    badChainId:false,
    allDone:false
  },

  action: {},

  mutations: {
    setWeb3(state, payload) {
      // 变更状态
      state.web3 = payload.web3;
    },
    setAddress(state, payload) {
      // 变更状态
      state.wallet_address = payload.address;
    },
    setNetwork(state, payload) {
      // 变更状态
      state.badChainId = payload.badChainId;
    },
    setAllDone(state, payload) {
      // 变更状态
      state.allDone = payload.type;
    }

  },
});
export default store;
