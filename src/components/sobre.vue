<template>
  <q-layout>
    <div class="error-page window-height window-width bg-light column items-center layout-view">
      <div>
        <div class="error-card card bg-white column items-center justify-center">
          <div class="" >
            <p class="caption text-center">Sóstenes Freitas</p>
            <p class="caption text-center">Donation</p>
            <p class="caption text-center">BTC: 1LESkkWa131rAJpFsdHdRmUT8PT63Yis1R</p>
            <p class="caption text-center">DASH: XuSPFTaHjr1qVM2UQyDrhLFkkzW4RY4AXh</p>
            <p class="caption text-center">LTC: LRHQNcXPK8UnXBTTT3giWfZJzwyrhBbP4d</p>
            <a href="https://github.com/sostenesfreitas/">
              <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-256.png" style="margin-left:42%;" class="avatar">
            </a>
            <router-link to="/">
              <button class="grey push small" style="margin: 6% 0 0 32% ;">
                Go home
                <i class="on-right">home</i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <q-tabs slot="footer" class="bg-dark ">

    </q-tabs>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
  .error-card
    margin-top 25px
    width 90vw
    max-width 600px
    padding 40px
    i
      font-size 5rem

</style>
