import Vue from 'vue'
import Vuex from 'Vuex'

import usuario from './modules/usuario'
import funcionario from './modules/funcionario'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usuario,
    funcionario
  }
})
