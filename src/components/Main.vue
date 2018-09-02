<template>
<div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div v-if="!this.$store.state.usuario.logado" class="col-md-12 text-center">
                <img src="../assets/logo.png"/>
                <span class="display-3 d-block">WebApp em Vuejs</span>
                <div class="mb-4 lead">Faça login para acessar as funções.</div>
                <router-link to="/login" class="navbar-brand">Entrar</router-link>
                <router-link to="/cadastro" class="navbar-brand">Criar conta</router-link>
            </div>
        </div>
        <div v-if="this.$store.state.usuario.logado" class="col-md-12 text-center">
                <img src="../assets/logo.png"/>
                <span class="display-4 d-block">WebApp em Vuejs</span>
                <div class="mb-4 lead">Bem vindo, {{ this.$store.state.usuario.usuario.nome }}.</div>
                <hr/>
                <span>Definições da API.</span>
                <div class="table-responsive">
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Rota</th>
                    <th scope="col">Parametro</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>usuarios/logar</td>
                    <td>login, senha</td>
                    <td>post</td>
                    <td>Envia os dados de login para autenticação na API</td>
                  </tr>
                </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
img {
  width: 100px;
}
</style>
