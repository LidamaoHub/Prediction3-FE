import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    web3: null,
    wallet_address: null,
    badChainId:false,
    allDone:false,
    predContract:null,
    factoryContract:null,
    showVModal:false,
    networkInfo:null,
    balance:0,
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
    },
    setPredContract(state,payload){
      state.predContract = payload.contract
    },
    setFactory(state,payload){
      state.factoryContract = payload.contract
    },
    setShowModal(state,payload){
      state.showVModal = payload.state

    },
    setNetworkInfo(state,payload){
      state.networkInfo = payload.network
    },
    updateBalance(state,payload){
      state.balance = payload.balance
    }

  },
});
export default store;
