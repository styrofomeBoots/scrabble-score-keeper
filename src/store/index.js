import Vuex from 'vuex';
import Vue from 'vue';
import scrabble from './modules/scrabble';

// Load Vuex
Vue.use(Vuex);

// Create Store
export default new Vuex.Store({
  modules: {
    scrabble
  }
})