<template>
  <div class="t">
    <div class="layout-padding">
      <q-transition name="slide">
        <q-stepper @finish="finish()" ref="stepper" v-show="!finished">
          <q-step title="Criando Sua API">
            <img class="full-width" src="../assets/api.png" alt="">
          </q-step>
          <q-step title="So clica em">
            <img class="full-width" src="../assets/create.png" alt="">
            <br><br>
            <img class="full-width" src="../assets/email.png" alt="">
          </q-step>
          <q-step title="Pronto">
            É so ir no email e clicar no link que você ja vai ser redirecionado para a pagina com usa api criada
            <br><br>
            <img class="full-width" src="../assets/apisecret.png" alt="">
          </q-step>
        </q-stepper>
      </q-transition>

      <div v-show="finished" class="items-center column justify-center full-width full-height">
        <p class="caption">
          <i class="text-primary" style="font-size: 2rem; margin-right: 1rem;">check</i>
          <span>Finished. Well done!</span>
        </p>
        <router-link to="/">
          <button class="primary" @click="reset()">done</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ready: false,
      finished: false
    }
  },
  methods: {
    finish () {
      this.finished = true
    },
    reset () {
      this.$refs.stepper.reset()
      this.finished = false
    }
  }
}
</script>
<style lang="styl" scoped>
  .t
    color #FFFFFF
</style>
