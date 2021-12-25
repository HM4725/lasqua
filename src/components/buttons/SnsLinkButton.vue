<template>
  <a class="sns-link" @click="openSns">
    <facebook-icon :size="24" v-if="type==='facebook'" ref="sns"/>
    <instagram-icon :size="24" v-else-if="type==='instagram'" ref="sns"/>
    <twitter-icon :size="24" v-else-if="type==='twitter'" ref="sns"/>
    <sns-etc-icon :size="24" v-else ref="sns"/>
  </a>
</template>

<script>
import FacebookIcon from '../icons/FacebookIcon.vue'
import InstagramIcon from '../icons/InstagramIcon.vue'
import TwitterIcon from '../icons/TwitterIcon.vue'
import SnsEtcIcon from '../icons/SnsEtcIcon.vue'

export default{
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    SnsEtcIcon
  },
  props: {
    type: {
      type: String,
      validator: v => ['facebook', 'instagram', 'twitter', 'etc'].indexOf(v) !== -1
    },
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    openSns() {
      window.open(this.link, '_blank')
    }
  }
}
</script>