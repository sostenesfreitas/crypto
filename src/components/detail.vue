<template>
  <q-layout>
      <div slot="header" class="toolbar dark shadow-2">
        <q-toolbar-title :padding="0">
          {{this.$route.params.coin}}
        </q-toolbar-title>
        {{ priceUSD | currency }}
          <button>
            <i>more_vert</i>
            <q-popover ref="popover1">
               <div class="text-center column justify-center" style="min-width: 100px; height: 50px;">
                 <div
                   class=""
                   @click="$refs.popover1.close()"
                 >
                   <router-link to="/sobre">
                     <h6>Sobre</h6>
                   </router-link>
                 </div>
               </div>
             </q-popover>
          </button>
      </div>
      <div class="c layout-view" style="padding: 1%">
        <div class="layout-view column">
          <div class="">
            <img :src="coin.logo" class="logo">
          </div>
          <div class="column text-white card layout-view">
            <h6>Total: {{coin.total}}</h6>
            <h6>Total Btc: {{totalBtc}}</h6>
            <h6>Last: {{t.last}}</h6>
            <h6>Lowest Ask: {{t.lowestAsk}}</h6>
            <h6>Highest Bid: {{t.highestBid}}</h6>
            <h6>Percent Change: {{t.percentChange | truncate(6)}}</h6>
            <h6>Base Volume: {{t.baseVolume}}</h6>
            <h6>Quote Volume: {{t.quoteVolume}}</h6>
            <h6>High 24hr: {{t.high24hr}}</h6>
            <h6>Low 24hr: {{t.low24hr}}</h6>
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
        coin: this.$route.query,
        t: '',
        totalBtc: '',
        priceUSD: '',
        finalprice: []
      }
    },
    mounted () {
      this.get()
    },
    methods: {
      get () {
        this.$http.get('https://poloniex.com/public?command=returnTicker').then(response => {
          var coin = response.body
          this.finalprice = [
            {'name': 'DASH', 'last': coin.BTC_DASH},
            {'name': 'BTCD', 'last': coin.BTC_BTCD},
            {'name': 'DCR', 'last': coin.BTC_DCR},
            {'name': 'FCT', 'last': coin.BTC_FCT},
            {'name': 'LSK', 'last': coin.BTC_LSK},
            {'name': 'STEEM', 'last': coin.BTC_STEEM},
            {'name': 'XRP', 'last': coin.BTC_XRP},
            {'name': 'XMR', 'last': coin.BTC_XMR},
            {'name': 'LTC', 'last': coin.BTC_LTC},
            {'name': 'BTC', 'last': coin.USDT_BTC}
          ]
          this.verify(this.finalprice)
          this.price(coin.USDT_BTC.last)
        }, response => {})
      },
      verify (final) {
        final.forEach(v => {
          if (v.name === this.$route.params.coin) {
            this.t = v.last
            this.totalBtc = v.last.last * this.$route.query.total
          }
        })
      },
      price (final) {
        this.priceUSD = this.totalBtc * final
      }
    }
  }
</script>
<style lang="styl" scoped>
  c
    width 100%
  .logo
    margin-left 25%
    width 50%
</style>
