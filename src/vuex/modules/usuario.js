const SET_USUARIO = 'SET_USUARIO'

const state = {
  logado: false,
  token: String,
  usuarios: [{}],
  usuario: {
    nome: '',
    email: '',
    login: '',
    senha: ''
  }
}

// Define as possíveis mutações do estado
const mutations = {
  //
  [SET_USUARIO] (state, payload) {
    // Put it into the state
    state.usuario = payload.usuario
    state.token = payload.token
    state.logado = payload.logado
  }
}

// Exporta tudo
export default {
  state,
  mutations
}
