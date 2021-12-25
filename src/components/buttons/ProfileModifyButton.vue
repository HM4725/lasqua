<template>
  <div class="profile-modify-button">
    <default-button class="main-button" value="프로필 수정" @click="open"/>
    <modal-slot ref="profileModal">
      <template v-slot:header>
        프로필 수정
      </template>
      <template v-slot:body>
        <div class="banner">
          <span>배너</span><span class="delete-image"><a @click="modified.banner=''">[삭제]</a></span>
          <file-slot id="banner" @upload="uploadBanner">
            <img-component :src="modified.banner" class="image" ratio="9/1"/>
          </file-slot>
        </div>
        <div class="middle">
          <div class="profile">
            <span>프로필</span><span class="delete-image"><a @click="modified.profile=''">[삭제]</a></span>
            <file-slot id="profile" @upload="uploadProfile">
              <img-component :src="modified.profile" class="image" ratio="3/4"/>
            </file-slot>
          </div>
          <div class="sns">
            <span>SNS</span>
            <input-box id="modify-facebook" :value="modified.facebook" placeholder="facebook" @input="v=>{modified.facebook=v}"/>
            <input-box id="modify-instagram" :value="modified.instagram" placeholder="instagram" @input="v=>{modified.instagram=v}"/>
            <input-box id="modify-twitter" :value="modified.twitter" placeholder="twitter" @input="v=>{modified.twitter=v}"/>            
          </div>
        </div>
        <div class="info">
          <input-box id="modify-info" :value="modified.info" placeholder="자기소개" @input="v=>{modified.info=v}"/>
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
    artist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modified: {
        banner: '',
        profile: '',
        facebook: '',
        instagram: '',
        twitter: '',
        info: ''
      }
    }
  },
  methods: {
    open() {
      this.modified.banner = this.artist.bannerImage
      this.modified.profile = this.artist.profileImage
      this.modified.facebook = this.artist.facebook
      this.modified.instagram = this.artist.instagram
      this.modified.twitter = this.artist.twitter
      this.modified.info = this.artist.info
      this.$refs.profileModal.show()
    },
    modify() {
      const payload = {}
      this.artist.bannerImage !== this.modified.banner && (payload.bannerImage = this.modified.banner)
      this.artist.profileImage !== this.modified.profile && (payload.profileImage = this.modified.profile)
      this.artist.facebook !== this.modified.facebook && (payload.facebook = this.modified.facebook)
      this.artist.instagram !== this.modified.instagram && (payload.instagram = this.modified.instagram)
      this.artist.twitter !== this.modified.twitter && (payload.twitter = this.modified.twitter)
      this.artist.info !== this.modified.info && (payload.info = this.modified.info)
      this.$emit('modify', payload)
      this.$refs.profileModal.close()
    },
    async cancle() {
      this.modified.banner !== this.artist.bannerImage &&
        this.$api("DELETE", `/image?link=${this.modified.banner}`)
      this.modified.profile !== this.artist.profileImage &&
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
        prev !== this.artist.bannerImage && this.$api("DELETE", `/image?link=${prev}`)
      } catch(error) {
        console.error(error)
      }
    },
    async uploadProfile(formData) {
      try {
        const profile = await this.upload(formData)
        const prev = this.modified.profile
        this.modified.profile = profile
        prev !== this.artist.profileImage && this.$api("DELETE", `/image?link=${prev}`)
      } catch(error) {
        console.error(error)
      }
    },
  }
}
</script>

<style scoped>
  span {
    padding-left: .5rem;
  }
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
  .middle {
    display: flex;
    flex-direction: row;
    margin-bottom: .5rem;
    text-align: left;
  }
  .middle > div {
    flex: 1;
  }
  .middle > .sns {
    margin-left: 1rem;
  }
  .footer-button {
    margin-left: .5rem;
  }
  span.delete-image {
    font-size: .8rem;
  }
</style>