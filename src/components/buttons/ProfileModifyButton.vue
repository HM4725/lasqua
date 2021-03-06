<template>
  <div class="profile-modify-button">
    <tooltip-slot v-if="focus" text="클릭하여 프로필을 편집하세요." :focus="focus" hover>
      <default-button class="main-button" value="프로필 편집" @click="open" ref="button"/>
    </tooltip-slot>
    <default-button v-else class="main-button" value="프로필 편집" @click="open" ref="button"/>
    <modal-slot ref="profileModal">
      <template v-slot:header>
        프로필 편집
      </template>
      <template v-slot:body>
        <div class="banner">
          <span>배너</span>
          <span class="delete-image"><a @click="modified.banner=null">[삭제]</a></span>
          <file-slot id="banner" @upload="uploadBanner">
            <img-component :src="modified.banner" class="image" ratio="9/1"/>
          </file-slot>
        </div>
        <div class="middle">
          <div class="profile">
            <span>프로필</span>
            <span class="delete-image"><a @click="modified.profile=null">[삭제]</a></span>
            <file-slot id="profile" @upload="uploadProfile">
              <img-component :src="profileImage" class="image" ratio="3/4"/>
            </file-slot>
          </div>
          <div class="sns">
            <span>SNS 링크</span>
            <input-box id="modify-facebook" v-model="modified.facebook" placeholder="facebook"/>
            <input-box id="modify-instagram" v-model="modified.instagram" placeholder="instagram"/>
            <input-box id="modify-twitter" v-model="modified.twitter" placeholder="twitter"/>            
          </div>
        </div>
        <div class="info">
          <textarea-box id="modify-info" v-model="modified.info" placeholder="자기소개"/>
        </div>
      </template>
      <template v-slot:footer>
        <default-button value="취소" class="footer-button" @click="cancel"/>
        <default-button value="변경" class="footer-button" @click="modify"/>
      </template>
    </modal-slot>
  </div>
</template>

<script>
import DefaultButton from './DefaultButton.vue'
import ModalSlot from '../utils/ModalSlot.vue'
import InputBox from '../form/InputBox.vue'
import TextareaBox from '../form/TextareaBox.vue'
import FileSlot from '../form/FileSlot.vue'
import ImgComponent from '../utils/ImgComponent.vue'
import TooltipSlot from '../utils/TooltipSlot.vue'

export default{
  name: 'components.buttons.profile.modify',
  emits: [
    'modify'
  ],
  components: {
    DefaultButton,
    ModalSlot,
    InputBox,
    TextareaBox,
    FileSlot,
    ImgComponent,
    TooltipSlot
  },
  props: {
    artist: {
      type: Object,
      required: true
    },
    focus: {
      type: Boolean
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
  computed: {
    profileImage() {
      return this.modified.profile || require('@/assets/img/default-profile.png')
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
      this.artist.info !== this.modified.info && (payload.info = this.modified.info.trim())
      this.$emit('modify', payload)
      this.$refs.profileModal.close()
    },
    async cancel() {
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
  },
}
</script>

<style scoped>
  span {
    padding-left: 8px;
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
    margin-bottom: 8px;
    text-align: left;
  }
  .middle {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    text-align: left;
  }
  .middle > div {
    flex: 1;
  }
  .middle > .sns {
    margin-left: 16px;
  }
  .footer-button {
    margin-left: 16px;
  }
  span.delete-image {
    font-size: .8em;
  }
</style>