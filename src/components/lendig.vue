<template>
  <div>
    <q-tabs class="dark">
      <q-tab> Lending </q-tab>
      <q-tab> Trade </q-tab>
    </q-tabs>
    <div class="conten">
      <div class="">
        <div class="column">
          <div class="column">
            <div class="row wrap justify-between">
              {{ moeda }}
              <input v-model="rate" placeholder="Rate" class="text-white">
              <input v-model="ammount" placeholder="Amount" class="text-white">
              <input v-model="duration" placeholder="Duration" class="text-white">
              <label class="lab">
                <q-checkbox v-model="checked"></q-checkbox>
                Auto-Renew
              </label>
            </div>
          </div>
          <div class="t">
            <q-progress-button
              class="positive btn"
              :percentage="progressBtn"
              @click.native="createLoanOffer()"
            >
              Offer
            </q-progress-button>
          </div>
        </div>
      </div>
      <div class="text-white text-center">
        Offer Loans
      </div>
      <div class="row justify-center">
        <div slot="slide" class="active bg-dark shadow-1" :max="2" v-for="l in loanOrders">
          <p v-on:click="rate = l.rate">Rate {{l.rate}}%</p>
          <p>Amount {{l.amount}}</p>
        </div>
      </div>
      <div class="text-white text-center">
        Active Loans
      </div>
      <div class="active bg-dark row shadow-1" v-for="p in activeLoans">
        <p>Coin {{p.currency}}</p>
        <p>Rate {{p.rate}}%</p>
        <p>Amount {{p.amount}}</p>
        <p>Fees {{p.fees}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'quasar'
let activeLoans = []
let loanOrders = []
let api // api fornecida pela poloniex
let segredo  // secret fornecido pela poloniex
let duration
let ammount
let rate
let ordem
export default {
  data () {
    this.activeLoans()
    this.returnLoanOrders()
    return {
      activeLoans,
      loanOrders,
      checked: true,
      duration,
      ammount,
      rate,
      progressBtn: 0
    }
  },
  methods: {
    activeLoans () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/activeLoans',
        params: {
          apiKey: api,
          secret: segredo
        }
      }).then(response => {
        activeLoans.length = 0
        response.data.provided.forEach(value => {
          activeLoans.push(value)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    createLoanOffer () {
      this.workButton()
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/createLoanOffer',
        params: {
          apiKey: api,
          secret: segredo,
          currency: this.$route.params.coin,
          duration: this.duration,
          amount: this.ammount,
          lendingRate: this.rate,
          autoRenew: this.checked === true ? 1 : 0
        }
      }).then(response => {
        this.progressBtn = 100
        response.data.error ? (this.stopWorkButton(-1), Toast.create(response.data.error))
        : (Toast.create(response.data.message), this.stopWorkButton())
        this.duration = ''
        this.ammount = ''
        this.rate = ''
      }).catch(error => {
        this.stopWorkButton(-1)
        Toast.create(error)
      })
    },
    workButton () {
      this.stopWorkButton()

      this.progressBtn = 15
      this.workingButton = setInterval(() => {
        this.progressBtn += parseInt(Math.random() * 12, 10)
      }, 200)
    },
    stopWorkButton (index) {
      if (this.workingButton) {
        clearInterval(this.workingButton)
        this.workingButton = null
      }
      if (typeof index !== 'undefined') {
        this.progressBtn = index
      }
    },
    cancelLoanOffer () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/cancelLoanOffer',
        params: {
          apiKey: api,
          secret: segredo,
          orderNumber: ordem
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    returnLoanOrders () {
      axios({
        method: 'post',
        url: 'https://poloniex.com/public?command=returnLoanOrders&currency=' + this.$route.params.coin,
        params: {
          apiKey: api,
          secret: segredo
        }
      }).then(response => {
        loanOrders.length = 0
        loanOrders.push(response.data.offers[0])
        loanOrders.push(response.data.offers[1])
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeDestroy () {
    this.stopWorkButton()
  }
}
</script>
<style lang="styl" scoped>
  .t
    color #FFFFFF
  .conten
    padding 0%
  .btn
    margin 2%
    width 95%
  .lab
    margin 4% 15% 0 0
    color #FFFFFF
  p, h5
    margin 1%
    color #FFFFFF
  .active
    margin 2%
    padding-top 1%
  .slide
    width 61%
    height 60px
    margin-left 20%
  input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
    border-bottom 1px solid #eee
</style>
