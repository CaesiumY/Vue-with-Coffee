import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import states from "./states";

Vue.use(Vuex);

export default new Vuex.Store({
  states,
  getters,
  mutations,
  actions
});
