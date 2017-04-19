<template>
  <div class="error-page window-height window-width bg-light column items-center">
    <div class="error-code bg-dark items-center justify-center column">
      <div class="" v-for="c in user">
          <img :src="c.avatar_url" style="margin-left:25%;width:50%; height: 170px" class="avatar">
      </div>
    </div>
    <div>
      <div class="error-card card bg-white column items-center justify-center">
        <div class="" v-for="c in user">
          <p class="caption text-center">{{c.name}}</p>
          <p class="text-center group">{{c.email}}
          </p>
          <a href="https://github.com/sostenesfreitas/">
            <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-256.png" style="margin-left:35%;" class="avatar">
          </a>
          <router-link to="/">
            <button class="grey push small" style="margin: 6% 0 0 22% ;">
              Go home
              <i class="on-right">home</i>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let user = []
export default {
  data () {
    return {
      user
    }
  },
  mounted () {
    this.getGit()
  },
  methods: {
    getGit () {
      user.length = 0
      axios({
        method: 'get',
        url: 'https://api.github.com/users/sostenesfreitas'
      }).then(response => {
        user.push(response.data)
      }).catch(error => {
        console.log(error)
      })
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
    margin-top -25px
    width 90vw
    max-width 600px
    padding 50px
    i
      font-size 5rem

</style>
