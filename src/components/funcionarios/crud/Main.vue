<template>
<div class="container">
    <h2>Funcionarios</h2>
<div class="row">
  <transition name="fade">
    <div class="col-md-3">
    <form  @submit.prevent="submit" action="#" method="post">
    <input type="text" v-model="funcionario.id" style="display: none"/>
  <div class="form-group">
    <div class="col">
      <label for="validationServer01">Nome</label>
      <input v-model="funcionario.nome"  v-bind:class="[$v.funcionario.nome.$invalid ? 'is-invalid' : 'is-valid']" type="text" class="form-control" id="validationServer01" placeholder="Nome" value="" required>
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Nome inválido!</div>
    </div>
    <div class="col">
      <label for="validationServer02">CPF</label>
      <input v-model="funcionario.cpf"  v-bind:class="[$v.funcionario.cpf.$invalid ? 'is-invalid' : 'is-valid']" type="text" class="form-control" id="validationServer02" placeholder="000.000.000-00" value="" required>
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">CPF em formato inválido!</div>
    </div>
    <div class="col">
    <label for="selectsetor">Setor</label>
    <select v-model="funcionario.setor"  v-bind:class="[$v.funcionario.setor.$invalid ? 'is-invalid' : 'is-valid']" id="selectsetor" class="custom-select" required>
      <option value="">Selecione...</option>
      <option value="Juridico">Juridico</option>
      <option value="Financeiro">Financeiro</option>
      <option value="TI">TI</option>
    </select>
    <div class="valid-feedback">OK!</div>
    <div class="invalid-feedback">Selecione um setor!</div>
  </div>
    <div class="col">
      <label for="validationServer05">Data da Contratacão</label>
      <input v-model="funcionario.datacontratacao"  v-bind:class="[$v.funcionario.datacontratacao.$invalid ? 'is-invalid' : 'is-valid']" type="date" class="form-control" id="validationServer05" required>
      <div class="valid-feedback">OK!</div>
      <div class="invalid-feedback">Data inválida!</div>
    </div>
    <br/>
    <div class="col">
        <button v-bind:disabled="!isValid" class="btn btn-primary" type="submit">Salvar</button>
        <button v-bind:disabled="!selecionado" class="btn btn-danger" v-on:click="$event.preventDefault(), showModal = true">Deletar</button>
        <button class="btn btn-default limpar" v-on:click="reset($event)">Limpar</button>
    </div>
  </div>
</form>
</div>
</transition>

    <div class="col">
      <transition name="fade">
      <div v-if="erro" class="alert alert-dismissible alert-danger">
  <button @click="erro = false" type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Erro!</strong> Não foi possivel realizar a operação!.
</div>
      <div v-if="deletado" class="alert alert-dismissible alert-success">
  <button @click="deletado = false" type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>OK!</strong> O funcionário foi deletado com sucesso!.
</div>
<div v-if="adicionado" class="alert alert-dismissible alert-success">
  <button @click="adicionado = false" type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>OK!</strong> O funcionário foi salvo com sucesso!.
</div>
      </transition>
      <div class="table-responsive">
        <table v-if="funcionarios" class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome</th>
      <th scope="col">CPF</th>
      <th scope="col">Setor</th>
      <th scope="col">Data da Contratação</th>
    </tr>
  </thead>
  <tbody v-for="funcionario in funcionarios" :key="funcionario.id" v-on:mouseover="seleciona(funcionario)">
    <tr class='clickable-row'  v-bind:class="[funcionario.id == getSelecionado ? 'table-active' : '']">
      <th>{{ funcionario.id }}</th>
      <td>{{ funcionario.nome }}</td>
      <td>{{ funcionario.cpf }}</td>
      <td>{{ funcionario.setor }}</td>
      <td>{{ funcionario.datacontratacao }}</td>
    </tr>
  </tbody>
</table>
<div v-if="!funcionarios" class="alert alert-danger">
  Nenhum funcionario cadastrado.
</div>
</div>
    </div>
</div>
<div v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Deletar {{ this.funcionario.nome }} ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Deseja deletar este funcionário?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
                    <button type="button" class="btn btn-danger" v-on:click="deletar($event)">Sim</button>
                </div>
            </div>
        </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  helpers
} from 'vuelidate/lib/validators'

import axios from 'axios'

const cpfValido = helpers.regex(
  'cpfValido',
  // eslint-disable-next-line
  /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/
)

export default {
  name: 'crud-main',
  data () {
    return {
      funcionario: {
        nome: '',
        cpf: '',
        setor: '',
        datacontratacao: ''
      },
      funcionarios: Array,
      selecionado: 0,
      qtdFuncionarios: 0,
      showModal: false,
      adicionado: false,
      deletado: false,
      erro: false
    }
  },
  mounted () {
    this.getFuncionarios()
  },
  methods: {
    async submit (event) {
      if (this.isValid) {
        // Enviando dados para o main, criando copia do objeto
        try {
          const token = this.$store.state.usuario.token
          const funcionario = this.funcionario
          window.console.log(funcionario)
          var res
          if (funcionario.id > 0) {
            const id = funcionario.id
            funcionario.createdAt = null
            funcionario.updatedAt = null
            res = await axios.put(
              'http://localhost:3000/funcionarios/' + id,
              funcionario,
              { headers: { 'x-access-token': token } }
            )
          } else {
            res = await axios.post(
              'http://localhost:3000/funcionarios',
              funcionario,
              { headers: { 'x-access-token': token } }
            )
          }
          if (res.data) {
            this.erro = false
            this.adicionado = true
            this.getFuncionarios()
            this.reset(event)
          }
        } catch (error) {
          window.console.log(error)
          this.erro = true
          this.adicionado = false
        }
      }
    },
    async deletar (event) {
      this.showModal = false
      event.preventDefault()
      try {
        const token = this.$store.state.usuario.token
        const funcionario = this.funcionario
        const id = funcionario.id
        const res = await axios.delete(
          'http://localhost:3000/funcionarios/' + id,
          { headers: { 'x-access-token': token } }
        )
        if (res.data) {
          this.deletado = true
          this.erro = false
          this.getFuncionarios()
          this.reset(event)
        }
      } catch (error) {
        window.console.log(error)
        this.erro = true
        this.deletado = false
      }
    },
    reset (event) {
      event.preventDefault()
      this.funcionario.nome = ''
      this.funcionario.cpf = ''
      this.funcionario.setor = ''
      this.funcionario.datacontratacao = ''
      this.funcionario.id = ''
      this.selecionado = 0
    },
    async getFuncionarios () {
      try {
        const token = this.$store.state.usuario.token
        const res = await axios.get('http://localhost:3000/funcionarios', {
          headers: { 'x-access-token': token }
        })
        this.funcionarios = res.data
        window.console.log(res.data)
      } catch (error) {
        window.console.log(error)
        this.funcionarios = null
      }
    },
    seleciona (funcionario) {
      this.funcionario = { ...funcionario }
      this.selecionado = this.funcionario.id
      window.console.log(this.funcionario.id)
    }
  },
  computed: {
    isValid () {
      return (
        !this.$v.funcionario.nome.$invalid &&
        !this.$v.funcionario.cpf.$invalid &&
        !this.$v.funcionario.setor.$invalid &&
        !this.$v.funcionario.datacontratacao.$invalid
      )
    },
    getSelecionado () {
      return this.selecionado
    }
  },
  validations: {
    funcionario: {
      nome: {
        required,
        maxLength: maxLength(32)
      },
      cpf: {
        required,
        maxLength: maxLength(14),
        minLength: minLength(14),
        cpfValido
      },
      setor: {
        maxLength: maxLength(80),
        required
      },
      datacontratacao: {
        required
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.clickable-row {
  cursor: pointer;
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
