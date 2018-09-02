import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AuthLogin from '@/components/auth/login/Main'
import AuthCadastro from '@/components/auth/cadastro/Main'
import AcessoNegado from '@/components/auth/negado/Main'

import Funcionarios from '@/components/funcionarios/crud/Main'

import { getUsuarioLogado } from '@/vuex/actions.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Main
    },
    {
      path: '/401',
      name: 'AcessoNegado',
      component: AcessoNegado
    },
    {
      path: '/login',
      name: 'AuthLogin',
      component: AuthLogin,
      beforeEnter: (to, from, next) => {
        if (!getUsuarioLogado().logado) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/cadastro',
      name: 'AuthCadastro',
      component: AuthCadastro,
      beforeEnter: (to, from, next) => {
        if (!getUsuarioLogado().logado) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/funcionarios',
      name: 'Funcionarios',
      component: Funcionarios,
      beforeEnter: (to, from, next) => {
        if (getUsuarioLogado().logado) {
          next()
        } else {
          next('/401')
        }
      }
    }
  ]
})
