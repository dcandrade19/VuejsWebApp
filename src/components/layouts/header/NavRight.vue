<template>
<div>
<div class="form-inline my-2 my-lg-0">
    <router-link v-if="!this.$store.state.usuario.logado" to="/login" class="btn btn-outline-success"><i class="fa fa-sign-in"></i> Entrar</router-link>
    <ul v-if="this.$store.state.usuario.logado" class="navbar-nav mt-2 mt-lg-0">
      <li>
        <div class="user">
          Usuário: {{ this.$store.state.usuario.usuario.nome }}
        </div>
      </li>
    </ul>
    <button v-if="this.$store.state.usuario.logado" @click="showModal = true" class="btn btn-outline-danger"><i class="fa fa-sign-out"></i> Sair</button>
</div>
<div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Deslogar {{ this.$store.state.usuario.usuario.nome }} ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Deseja deslogar do sistema?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
                    <button type="button" class="btn btn-danger" v-on:click="deslogar()">Sim</button>
                </div>
            </div>
        </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import { setUsuario } from '@/vuex/actions.js'

export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    deslogar () {
      this.showModal = false
      setUsuario({ deslogar: true }).then(result => {
        if (!this.$store.state.usuario.logado) {
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding: 5px;
  margin-right: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  cursor: default;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
