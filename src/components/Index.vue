<template>
<q-layout>
  <div slot="header" class="toolbar bg-dark shadow-2">
    <q-toolbar-title :padding="0">
      My Crypto Holding
    </q-toolbar-title>
     Btc: {{price | currency }}
      <button>
        <i>more_vert</i>
        <q-popover ref="popover1">
           <div class="text-center column justify-center" style="min-width: 100px; height: 50px;">
             <div
               class=""
               @click="$refs.popover1.close()"
             >
             <!--
             <router-link to="/tutorial">
               <h6>Criar API</h6>
             </router-link>
               <hr> -->
             <router-link to="/sobre">
                 <h6>Sobre</h6>
               </router-link>
             </div>
           </div>
         </q-popover>
      </button>
  </div>

  <div class="body layout-view">
    <q-pull-to-refresh :handler="refresher">
      <div class="row wrap justify-between">
        <div class="inner">
          <div class="logo column " v-for="c in criptoMoedas">
            <div class="row">
              <div class="logo " v-touch-hold="() => { moreOptions(c.name) }">
                <router-link :to="{path: '/currency/'+c.name, query: {logo: c.logo ,total: c.total}}">
                  <img :src="c.logo" class="avatar">
                </router-link>
              </div>
              <div class="text-white">
                <h6>{{c.name}}</h6>
                <h6>{{c.total}}</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="innerPercent column justify-around">
          <div v-for="l in lucro" class="text-white">
            <span class="percent label " :style="l < 0 ? 'background-color: #DB2828' : 'background-color: #21BA45'">{{l}}%</span>
          </div>
        </div>
      </div>
    </q-pull-to-refresh>
  </div>
  <router-link to="/teste"><q-fab
    class="absolute-bottom-right"
    classNames="dark"
    active-icon="alarm"
    style="right: 5px; bottom: 40px;"
  ></q-fab></router-link>
  </div>
  <q-tabs slot="footer" class="bg-dark ">
  </q-tabs>
</q-layout>
</template>
  <script>
/* eslint-disable */
import { Dialog } from 'quasar'
// import criptoMoedas from './myCrypto.json'
export default {
  data () {
    return {
      total: [],
      criptoMoedas: [],
      lucro: [],
      price: ''
    }
  },
  mounted () {
    require('./../admob/init')
    this.clean()
    this.init()
    this.get()
  },
  methods: {
    percentual (ultimoPreco) {
      this.criptoMoedas.forEach(value => {
        ultimoPreco.forEach(up => {
          if (value.name === up.name) {
            let diferenca = up.last - value.buyPrice
            diferenca = diferenca / value.buyPrice
            diferenca = diferenca * 100
            this.lucro.push(parseFloat(diferenca).toFixed(1))
          }
        })
      })
    },
    moreOptions (schedule) {
      Dialog.create({
        title: 'Warning',
        message: 'Do you really want to delete.',
        buttons: [
          'Cancel',
          {
            label: 'Yes',
            handler: () => {
              this.test(schedule)
            }
          }
        ]
      })
    },
    test (n) {
      console.log('removed' + n)
    },
    init () {
      this.criptoMoedas.length = 0
      var database = require('./../db/db')
      require('./../db/init')
      var q = 'SELECT * FROM moeda'
      database.transaction(transaction => {
        transaction.executeSql(q, [], (tx, resultSet) => {
          for (var x = 0; x < resultSet.rows.length; x++) {
            this.criptoMoedas.push(resultSet.rows.item(x))
          }
        })
      })
    },
    get () {
      this.$http.get('https://poloniex.com/public?command=returnTicker').then(response => {
        var coin = response.body
        let finalprice = [
          {'name': 'DASH', 'last': coin.BTC_DASH.last},
          {'name': 'BTCD', 'last': coin.BTC_BTCD.last},
          {'name': 'DCR', 'last': coin.BTC_DCR.last},
          {'name': 'FCT', 'last': coin.BTC_FCT.last},
          {'name': 'LSK', 'last': coin.BTC_LSK.last},
          {'name': 'STEEM', 'last': coin.BTC_STEEM.last},
          {'name': 'XRP', 'last': coin.BTC_XRP.last},
          {'name': 'XMR', 'last': coin.BTC_XMR.last},
          {'name': 'LTC', 'last': coin.BTC_LTC.last},
          {'name': 'BTC', 'last': coin.USDT_BTC.last}
        ]
        this.percentual(finalprice)
        this.price = parseInt(coin.USDT_BTC.last)
        console.log(this.price)
      }, response => {})
    },
    refresher (done) {
      setTimeout(() => {
        done()
        this.clean()
        this.init()
        this.get()
      }, 2000)
    },
    clean () {
      this.lucro.length = 0
      this.criptoMoedas.length = 0
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
    .innerPercent
      width auto
      margin-right 5%
    .percent
      width 75px
  </style>
