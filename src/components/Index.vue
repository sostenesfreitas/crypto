<template>
<q-layout>
  <div slot="header" class="toolbar bg-dark shadow-2">
    <q-toolbar-title :padding="0">
      Meus Rendimentos
    </q-toolbar-title>
      <button>
        <i>more_vert</i>
        <q-popover ref="popover1">
           <div class="text-center column justify-center" style="min-width: 150px; height: 80px;">
             <div
               class=""
               @click="$refs.popover1.close()"
             >
             <router-link to="/tutorial">
               <h6>Criar API</h6>
             </router-link>
               <hr>
               <router-link to="/sobre">
                 <h6>Sobre</h6>
               </router-link>
             </div>
           </div>
         </q-popover>
      </button>
  </div>
  <div class="body">
    <q-pull-to-refresh :handler="refresher">
      <div class="row wrap justify-between">
        <div class="inner">
          <div class="logo column " v-for="c in criptoMoedas">
            <div class="row">
              <div class="logo ">
                <!---<router-link :to="{path: '/currency/'+c.name}">-->
                  <img :src="c.logo" class="avatar">
                <!--</router-link>-->
              </div>
              <div class="coin">
                <h6>{{c.name}}</h6>
                <h6>{{c.total}}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="innerPercent column justify-around">
          <div v-for="l in lucro">
            <span class="percent label shadow-1 text-white" :style="l < 0 ? 'background-color: #DB2828' : 'background-color: #21BA45'">{{l}}%</span>
          </div>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>
  <router-link to="/teste"><q-fab
    class="absolute-bottom-right"
    classNames="dark"
    active-icon="alarm"
    style="right: 18px; bottom: 18px;"
  ></q-fab></router-link>
  </div>
</q-layout>
</template>
  <script>
let criptoMoedas = []

let percentual = ultimoPreco => {
  criptoMoedas.forEach(value => {
    ultimoPreco.forEach(up => {
      if (value.name === up.name) {
        let diferenca = up.last - value.buyPrice
        diferenca = diferenca / value.buyPrice
        diferenca = diferenca * 100
        lucro.push(parseFloat(diferenca).toFixed(2))
      }
    })
  })
}

let lucro = []
let coin = []
let price = []
export default {
  data () {
    return {
      criptoMoedas,
      lucro,
      price
    }
  },
  mounted () {
    this.clean()
    this.init()
    this.get()
  },
  methods: {
    init () {
      criptoMoedas.length = 0
      var database = require('./../db/db')
      require('./../db/init')
      var q = 'SELECT * FROM moeda'
      database.transaction(transaction => {
        transaction.executeSql(q, [], (tx, resultSet) => {
          for (var x = 0; x < resultSet.rows.length; x++) {
            criptoMoedas.push(resultSet.rows.item(x))
          }
        })
      })
    },
    get () {
      this.$http.get('https://poloniex.com/public?command=returnTicker').then(response => {
        coin = response.body
        let finalprice = [
          {'name': 'DASH', 'last': coin.BTC_DASH.last},
          {'name': 'BTCD', 'last': coin.BTC_BTCD.last},
          {'name': 'DCR', 'last': coin.BTC_DCR.last},
          {'name': 'FCT', 'last': coin.BTC_FCT.last},
          {'name': 'LSK', 'last': coin.BTC_LSK.last},
          {'name': 'STEEM', 'last': coin.BTC_STEEM.last},
          {'name': 'XRP', 'last': coin.BTC_XRP.last},
          {'name': 'XMR', 'last': coin.BTC_XMR.last},
          {'name': 'LTC', 'last': coin.BTC_LTC.last}
        ]
        percentual(finalprice)
        this.btcPrice(finalprice)
      }, response => {})
    },
    btcPrice (total) {
      criptoMoedas.forEach(value => {
        total.forEach(t => {
          if (value.coin === t.name) {
            price.push(value.total * t.last)
          }
        })
      })
      return price
    },
    refresher (done) {
      setTimeout(() => {
        done()
        this.clean()
        this.get()
      }, 2000)
    },
    clean () {
      lucro.length = 0
      criptoMoedas.length = 0
    }
  }
}
</script>
  <style lang="styl" scoped>
    .pop
      width 40%
      height 50px
    .body
      width 100%
      padding 1%
    h6
      margin-left 4%
    .coin
      color #ffffff
    .innerPercent
      width 30%
    .percent
      width 75px
  </style>
