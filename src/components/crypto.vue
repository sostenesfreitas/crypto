<template>
  <q-pull-to-refresh :handler="refresher">
    <div class="cont row wrap justify-between">
      <div class="inner">
        <div class="logo column" v-for="c in jSon">
          <div class="row">
            <div class="">
              <img :src="c.logo" class="avatar">
            </div>
            <div class="column">
              <h6>{{c.name}}</h6>
              <h6>{{c.total}}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="innerPercent justify-end">
        <div v-for="l in lucro">
          <span class="percent label shadow-1 text-white" :style="l < 0 ? 'background-color: #DB2828' : 'background-color: #21BA45'">{{l}}%</span>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>
<script>
let criptoMoedas = require('./myCrypto.json')
let percentual = ultimoPreco => {
  criptoMoedas.moeda.forEach(value => {
    ultimoPreco.forEach(up => {
      if (value.coin === up.name) {
        let diferenca = up.last - value.buyPrice
        diferenca = diferenca / value.buyPrice
        diferenca = diferenca * 100
        lucro.push(parseFloat(diferenca).toFixed(2))
      }
    })
  })
}

let lucro = []
let mo = []
let coin = []
let price
export default {
  data () {
    this.get()
    return {
      jSon: criptoMoedas.moeda,
      mo,
      lucro,
      price
    }
  },
  methods: {
    get () {
      this.$http.get('https://poloniex.com/public?command=returnTicker').then(response => {
        mo.push(response.body)
        coin = response.body
        let finalprice = [
          {'name': 'BTC_DASH', 'last': coin.BTC_DASH.last},
          {'name': 'BTC_BTCD', 'last': coin.BTC_BTCD.last},
          {'name': 'BTC_DCR', 'last': coin.BTC_DCR.last},
          {'name': 'BTC_FCT', 'last': coin.BTC_FCT.last},
          {'name': 'BTC_LSK', 'last': coin.BTC_LSK.last},
          {'name': 'BTC_STEEM', 'last': coin.BTC_STEEM.last},
          {'name': 'BTC_XRP', 'last': coin.BTC_XRP.last},
          {'name': 'BTC_XMR', 'last': coin.BTC_XMR.last},
          {'name': 'BTC_LTC', 'last': coin.BTC_LTC.last}
        ]
        percentual(finalprice)
        this.btcPrice(finalprice)
      }, response => {})
    },
    btcPrice (total) {
      criptoMoedas.moeda.forEach(value => {
        total.forEach(t => {
          if (value.coin === t.name) {
            price += parseFloat(value.total * t.last).toFixed(2)
          }
        })
      })
      return price
    },
    refresher (done) {
      setTimeout(() => {
        done()
        lucro = []
        this.get()
      }, 2000)
    }
  }
}
</script>
<style lang="styl">
  .cont
    width 100%
  .logo
    margin 5%
  h6
    margin 5%
    color #4f4f4f
  .innerPercent
    width 30%
  .percent
    margin 17%
    width 75px
  .price
    margin 30%
</style>
