<template>
<div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <img src="../../../assets/denied.png"/>
                <span class="display-3 d-block">401</span>
                <div class="mb-4 lead">Acesso restrito a usuários logados.</div>
                <router-link to="/login" class="navbar-brand">Entrar</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'acesso-negado'
}
</script>

<style lang="scss" scoped>
img {
  width: 200px;
}
</style>
