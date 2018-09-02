const SET_FUNCIONARIOS = 'SET_FUNCIONARIOS'
// Definindo state
const state = {
  funcionarios: [{}],
  funcionario: {
    nome: '',
    cpf: '',
    setor: '',
    datacontratacao: ''
  }
}

// Define as possíveis mutações do estado
const mutations = {
  //
  [SET_FUNCIONARIOS] (state, payload) {
    // Put it into the state
    state.funcionarios = payload
  }
}

// Exporta tudo
export default {
  state,
  mutations
}
