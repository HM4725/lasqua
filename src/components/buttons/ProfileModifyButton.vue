<template>
  <div class="profile-modify-button">
    <default-button class="main-button" value="프로필 수정" @click="open"/>
    <modal-slot ref="profileModal">
      <template v-slot:header>
        프로필 수정
      </template>
      <template v-slot:body>
        <div class="banner">
          <span>배너 이미지</span>
          <file-slot id="banner" @upload="uploadBanner">
            <img-component :src="modified.banner" class="image" ratio="9/1"/>
          </file-slot>
        </div>
        <div class="profile">
          <span>프로필 이미지</span>
          <file-slot id="profile" @upload="uploadProfile">
            <img-component :src="modified.profile" class="image" ratio="3/4"/>
          </file-slot>
        </div>
        <div class="info">
          <input-box id="profile-modify-info" :value="modified.info" placeholder="자기소개" @input="v=>{modified.info=v}"/>
        </div>
      </template>
      <template v-slot:footer>
        <default-button value="취소" class="footer-button" @click="cancle"/>
        <default-button value="변경" class="footer-button" @click="modify"/>
      </template>
    </modal-slot>
  </div>
</template>

<script>
import DefaultButton from './DefaultButton.vue'
import ModalSlot from '../utils/ModalSlot.vue'
import InputBox from '../form/InputBox.vue'
import FileSlot from '../form/FileSlot.vue'
import ImgComponent from '../utils/ImgComponent.vue'

export default{
  emits: [
    'modify'
  ],
  components: {
    DefaultButton,
    ModalSlot,
    InputBox,
    FileSlot,
    ImgComponent
  },
  props: {
    banner: {
      type: String,
      default: ''
    },
    profile: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modified: {
        banner: '',
        profile: '',
        info: ''
      }
    }
  },
  methods: {
    open() {
      this.modified.banner = this.banner
      this.modified.info = this.info
      this.modified.profile = this.profile
      this.$refs.profileModal.show()
    },
    modify() {
      const payload = {}
      this.banner !== this.modified.banner && (payload.bannerImage = this.modified.banner)
      this.profile !== this.modified.profile && (payload.profileImage = this.modified.profile)
      this.info !== this.modified.info && (payload.info = this.modified.info)
      this.$emit('modify', payload)
      this.$refs.profileModal.close()
    },
    async cancle() {
      this.modified.banner !== this.banner &&
        this.$api("DELETE", `/image?link=${this.modified.banner}`)
      this.modified.profile !== this.profile &&
        this.$api("DELETE", `/image?link=${this.modified.profile}`)
      this.$refs.profileModal.close()
    },
    async upload(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        return response.data.link
      } catch(error) {
        console.error(error)
      }
    },
    async uploadBanner(formData) {
      try {
        const banner = await this.upload(formData)
        const prev = this.modified.banner
        this.modified.banner = banner
        prev !== this.banner && this.$api("DELETE", `/image?link=${prev}`)
      } catch(error) {
        console.error(error)
      }
    },
    async uploadProfile(formData) {
      try {
        const profile = await this.upload(formData)
        const prev = this.modified.profile
        this.modified.profile = profile
        prev !== this.profile && this.$api("DELETE", `/image?link=${prev}`)
      } catch(error) {
        console.error(error)
      }
    },
  }
}
</script>

<style scoped>
  .profile-modify-button {
    width: fit-content;
  }
  .main-button {
    width: 100%;
  }
  .image {
    border: 1px solid var(--base-color);
    cursor: pointer;
    transition: all .25s ease-in-out;
  }
  .image:hover {
    border-color: var(--active-color);
    opacity: 0.7;
  }
  .banner {
    margin-bottom: .5rem;
    text-align: left;
  }
  .banner > span {
    padding-left: .5rem;
  }
  .profile {
    margin-bottom: .5rem;
    text-align: left;
  }
  .profile > span {
    margin-left: .5rem;
  }
  .footer-button {
    margin-left: .5rem;
  }
</style>