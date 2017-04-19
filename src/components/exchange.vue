<script>
import axios from 'axios'
let activeLoans = []
let returnOpenLoanOffers = []
let api
let segredo
let duration
let ammount
let rate
let ordem
export default {
  data () {
    return {
      activeLoans,
      returnOpenLoanOffers,
      checked: true,
      duration,
      ammount,
      rate
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
          if (value.currency === this.$route.params.coin) activeLoans.push(value)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    buy () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/buy',
        params: {
          apiKey: api,
          secret: segredo,
          currencyA: this.$route.params.coin,
          currencyB: 'BTC',
          amount: this.amount,
          rate: this.rate
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    sell () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/sell',
        params: {
          apiKey: api,
          secret: segredo,
          currencyA: this.$route.params.coin,
          currencyB: 'BTC',
          amount: this.amount,
          rate: this.rate
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    cancelOrder () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/cancelOrder',
        params: {
          apiKey: api,
          secret: segredo,
          currencyA: this.$route.params.coin,
          currencyB: 'BTC',
          orderNumber: ordem
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    moveOrder () {
      axios({
        method: 'post',
        url: 'https://poloniex-crypto.herokuapp.com/moveOrder',
        params: {
          apiKey: api,
          secret: segredo,
          amount: ammount,
          currencyA: this.$route.params.coin,
          currencyB: 'BTC',
          orderNumber: ordem,
          rate: rate
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
