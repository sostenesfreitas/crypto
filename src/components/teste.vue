<template>
  <div class="">
    <div slot="header" class="toolbar dark shadow-2">
      <q-toolbar-title :padding="0">
        Adicionar Coin
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
    <div class="cont">
      <div class="column">
        Coin:
         <q-select type="radio" v-model="select" :options="selectOptions"></q-select>
         <div class="floating-label">
           <input required class="full-width text-white" v-model="total">
           <label class="text-white">Total</label>
        </div>
        <div class="floating-label">
          <input required class="full-width text-white" v-model="buyPrice">
          <label class="text-white">Buy Price 0.09776196</label>
       </div>
        <button class="primary push" style="margin: 2% 0 2% 0" @click="inserir()">OK</button>
      </div>
      <div class="row wrap justify-between" v-for="m in moeda">
        <p>{{m.name}}</p>
        <p>{{m.buyPrice}}</p>
        <p>{{m.total}}</p>
        <button class="negative" v-on:click="del(m.idmoeda)">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
let moeda = []
let total
let buyPrice
import { Toast } from 'quasar'
export default {
  data () {
    return {
      select: {
        label: 'Dash',
        value: ['DASH', 'https://i.imgur.com/qiIMHZr.png']
      },
      moeda,
      total,
      buyPrice,
      selectOptions: [
        {
          label: 'Dash',
          value: ['DASH', 'https://i.imgur.com/qiIMHZr.png']
        },
        {
          label: 'BitcoinDark',
          value: ['BTCD', 'http://bitbillions.net/wp-content/uploads/2014/07/BITCOINDARK2.jpg']
        },
        {
          label: 'Decred',
          value: ['DCR', 'http://www.altcoinwatch.com/wp-content/uploads/2016/07/decred-logo.png']
        },
        {
          label: 'Factom',
          value: ['FCT', 'https://pbs.twimg.com/profile_images/848526728708239360/5hC-ie8r.jpg']
        },
        {
          label: 'Lisk',
          value: ['LSK', 'https://pbs.twimg.com/profile_images/693005622267269121/WCttamlO.png']
        },
        {
          label: 'STEEM',
          value: ['STEEM', 'http://cryptocoinview.com/coinicons/steem.jpg']
        },
        {
          label: 'Ripple',
          value: ['XRP', 'https://ripple.com/wp-content/uploads/2014/10/mark.png']
        },
        {
          label: 'Monero',
          value: ['XMR', 'https://pbs.twimg.com/profile_images/473825289630257152/PzHu2yli.png']
        },
        {
          label: 'LiteCoin',
          value: ['LTC', 'http://2.bp.blogspot.com/-TfzvgtdVFEs/VSBQPTfBOpI/AAAAAAAAEL4/_NDG_jfdX6I/s1600/litecoin.png']
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    del (id) {
      Toast.create('teste' + id)
      require('./../db/delete')(require('./../db/db'), id)
      this.init()
    },
    inserir () {
      Toast.create('Inserido com sucesso!!!' + this.select[0])
      require('./../db/database')(require('./../db/db'), this.select[0], this.total, this.buyPrice, this.select[1])
      this.init()
    },
    init () {
      moeda.length = 0
      var database = require('./../db/db')
      require('./../db/init')
      var q = 'SELECT * FROM moeda'
      database.transaction(transaction => {
        transaction.executeSql(q, [], (tx, resultSet) => {
          for (var x = 0; x < resultSet.rows.length; x++) {
            moeda.push(resultSet.rows.item(x))
          }
        })
      })
    }
  }
}
</script>
<style lang="styl" scoped>
  .cont
    color #ffffff
    padding 1%
  input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
    border-bottom 1px solid #eee
</style>
