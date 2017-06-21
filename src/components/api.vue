<template>
  <q-layout>
    <div class="card" v-touch-hold="() => { moreOptions(schedule) }">
      Test doi sakdjksajdksajdjas
      sadasdasdsadasdsadsadasd
    </div>
  </q-layout>
</template>
<script>
import { Dialog } from 'quasar'
export default {
  data () {
    return {
    }
  },
  methods: {
    moreOptions: function (schedule) {
      Dialog.create({
        title: 'Warning',
        message: 'You are about to run out of disk space.',
        buttons: [
          'Cancel',
          {
            label: 'Empty Trash Bin',
            handler () {
              // empty the trash bin, yo
            }
          }
        ]
      })
    }
  }
}
</script>
