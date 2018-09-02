import store from './store'
import axios from 'axios'

// Está é a ação que iremos utilizar para pegar todas as pessoas
export const getUsuarios = () => {
  // Requisição
  return store.state.usuario.usuarios
}

export const getUsuarioLogado = () => {
  // Requisição
  if (store.state.usuario.logado) {
    const usuario = store.state.usuario.usuario
    const logado = true
    const token = store.state.usuario.token
    return {logado: logado, usuario: usuario, token: token}
  } else {
    return {logado: false}
  }
}

export const setUsuario = async (usuario) => {
  try {
    if (!usuario.deslogar) {
      const res = await axios.post('http://localhost:3000/usuarios/logar', usuario)
      if (res.data.token) {
        const token = res.data.token
        const usuarioData = res.data.usuario
        window.console.log(res.data)
        const payload = {token: token, usuario: usuarioData, logado: true}
        store.commit('SET_USUARIO', payload)
      }
      return 'Logado com sucesso!'
    } else {
      const payload = {token: '', usuario: '', logado: false}
      store.commit('SET_USUARIO', payload)
      return 'Deslogado com sucesso!'
    }
  } catch (error) {
    return 'Não foi possivel logar, verifique os dados informados.'
  }
}

export const getFuncionarios = () => {
  // Requisição
  return store.state.funcionario.funcionarios
}

export const setFuncionarios = async () => {
  const token = store.state.usuario.token
  const res = await axios.get('http://localhost:3000/funcionarios', {headers: {
    'x-access-token': token
  }})
  const payload = await res.data
  store.commit('SET_FUNCIONARIOS', payload)
}
