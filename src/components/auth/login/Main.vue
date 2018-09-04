<template>
    <div class="login-form">
      <transition name="fade">
      <div v-if="this.erro" class="alert alert-dismissible alert-danger">
  <button type="button" v-on:click="close()" class="close" data-dismiss="alert">&times;</button>
  <strong>Erro!</strong> Login ou senha inválidos.
</div>
      </transition>
  <form class="px-4 py-3" @submit.prevent="submit" action="#" method="post">
    <div class="form-group">
      <label for="exampleDropdownFormEmail1">Login</label>
      <input v-model="auth.login" v-bind:class="[$v.auth.login.$invalid ? 'is-invalid' : 'is-valid']" type="text" class="form-control" id="exampleDropdownFormEmail1" placeholder="Login">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Informe o login!</div>
    </div>
    <div class="form-group">
      <label for="exampleDropdownFormPassword1">Senha</label>
      <input v-model="auth.senha" v-bind:class="[$v.auth.senha.$invalid ? 'is-invalid' : 'is-valid']" type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Senha">
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Informe a senha!</div>
    </div>
    <div class="form-check">
      <input v-model="auth.lembreme" type="checkbox" class="form-check-input" id="dropdownCheck">
      <label class="form-check-label" for="dropdownCheck">
        Lembre me
      </label>
      |
      <label>
        <router-link to="/cadastro">Criar conta</router-link>
      </label>
    </div>
    <button v-bind:disabled="!isValid" type="submit" class="btn btn-primary btn-block">Entrar</button>
  </form>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
// Importa a ação de logar
import { setUsuario } from '@/vuex/actions.js'

export default {
  name: 'auth',
  data () {
    return {
      auth: {
        login: '',
        senha: '',
        lembreme: false
      },
      erro: false
    }
  },
  methods: {
    submit () {
      if (this.isValid) {
        // Enviando dados para o main, criando copia do objeto
        setUsuario(this.auth).then((result) => {
          if (this.$store.state.usuario.logado) {
            this.erro = false
            this.$router.push('/')
          } else {
            this.reset()
            this.erro = true
          }
        })
      }
    },
    reset () {
      this.auth.login = ''
      this.auth.senha = ''
    },
    close () {
      this.erro = false
    }
  },
  computed: {
    isValid () {
      return !this.$v.auth.login.$invalid &&
      !this.$v.auth.senha.$invalid
    }
  },
  validations: {
    auth: {
      login: {
        required
      },
      senha: {
        required
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form {
  width: 300px;
  margin: 35px auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
