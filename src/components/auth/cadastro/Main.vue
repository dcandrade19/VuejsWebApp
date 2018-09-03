<template>
<div class="container">
    <div class="login-form">
      <transition name="fade">
      <div v-if="this.erro" class="alert alert-dismissible alert-danger">
  <button type="button" v-on:click="close()" class="close" data-dismiss="alert">&times;</button>
  <strong>Erro!</strong> Não foi possivel cadastrar, tente novamente mais tarde.
</div>
      </transition>
  <form class="form" @submit.prevent="submit" action="#" method="post">
    <h3>Crie sua conta</h3>
    <div class="row">
      <div class="form-group col-md-6">
      <label for="nome">Nome</label>
      <input v-model="auth.nome" v-bind:class="[$v.auth.nome.$invalid ? 'is-invalid' : 'is-valid']" type="text" class="form-control" id="nome" placeholder="Nome">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Imforme o nome!</div>
    </div>
    <div class="form-group col-md-6">
      <label for="login">Login</label>
      <input v-model="auth.login" v-bind:class="[$v.auth.login.$invalid ? 'is-invalid' : 'is-valid']" type="text" class="form-control" id="login" placeholder="Login">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Informe o login!</div>
    </div>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="auth.email" v-bind:class="[$v.auth.email.$invalid ? 'is-invalid' : 'is-valid']" type="email" class="form-control" id="email" placeholder="Email">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Informe um email valido!</div>
    </div>
    <div class="form-group">
      <label for="senha">Senha</label>
      <input v-model="auth.senha" v-bind:class="[$v.auth.senha.$invalid ? 'is-invalid' : 'is-valid']" type="password" class="form-control" id="senha" placeholder="Senha">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">A senha deve possuir no minimo 6 digitos!</div>
    </div>
    <div class="form-group">
      <label for="repetirsenha">Repita a senha</label>
      <input v-model="auth.repetirSenha" v-bind:class="[$v.auth.repetirSenha.$invalid ? 'is-invalid' : 'is-valid']" type="password" class="form-control" id="repetirsenha" placeholder="Senha">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">A senha não confere!</div>
    </div>
    <button v-bind:disabled="!isValid" type="submit" class="btn btn-primary btn-block">Salvar</button>
  </form>
</div>
</div>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
// Importa a ação de logar
import { setUsuario } from '@/vuex/actions.js'

import axios from 'axios'

export default {
  name: 'authcadastro',
  data () {
    return {
      auth: {
        nome: '',
        email: '',
        login: '',
        senha: '',
        repetirSenha: ''
      },
      erro: false
    }
  },
  methods: {
    async submit () {
      if (this.isValid) {
        // Enviando dados para api post/cadastro
        try {
          const data = this.auth
          const res = await axios.post('http://localhost:3000/usuarios', data)
          if (res) {
            setUsuario(this.auth).then((result) => {
              if (this.$store.state.usuario.logado) {
                this.erro = false
                this.$router.push('/')
              }
            })
          }
        } catch (error) {
          this.erro = true
        }
      }
    },
    close () {
      this.erro = false
    }
  },
  computed: {
    isValid () {
      return !this.$v.auth.login.$invalid &&
      !this.$v.auth.senha.$invalid &&
      !this.$v.auth.email.$invalid &&
      !this.$v.auth.nome.$invalid &&
      !this.$v.auth.repetirSenha.$invalid
    }
  },
  validations: {
    auth: {
      nome: {
        required
      },
      email: {
        required,
        email
      },
      login: {
        required
      },
      senha: {
        required,
        minLength: minLength(6)
      },
      repetirSenha: {
        required,
        sameAsPassword: sameAs('senha')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 400px;
  margin: 35px auto;
}
</style>
