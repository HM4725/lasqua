<template>
  <div class="upload-wrapper">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title" placeholder="프로젝트 제목" @input="v=>title=v" maxlength="20" ref="title" focus/>
    </header>
    <section class="images">
      <upload-images ref="images"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="upload-content" placeholder="프로젝트 설명글" @input="v=>content=v" ref="content"/>
    </section>
    <footer class="submit">
      <default-button value="수정하기" @click="modify"/>
    </footer>
  </div>
</template>

<script>
import UploadImages from '@/components/article/UploadImages.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import TextareaBox from '@/components/form/TextareaBox.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  components: {
    UploadImages,
    DefaultButton,
    TextareaBox,
    InputBox
  },
  props: {
    no: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      title: '',
      images: [],
      content: '',
    }
  },
  methods: {
    // Event
    async modify() {
      try {
        const data = {
          no: this.no,
          id: this.id,
          title: this.title,
          images: this.$refs.images.getValues(),
          content: this.content
        }
        console.log(data)
        if(data.title != '' && data.images.length > 0 && data.content != '') {
          await this.$api("PUT", "/article", data)
          this.$router.push(`/article/view?no=${this.no}`)
        }
      } catch(error) {
        console.error(error)
      }
    },
    // Private
    async loadArticle() {
      try {
        const response = await this.$api("GET", `/article/${this.no}`)
        const data = response.data
        if(data.id === this.id) {
          this.images = data.images.sort((a, b) => a.orderNo - b.orderNo)
          this.$refs.title.typing(data.title)
          this.$refs.images.push(this.images)
          this.$refs.content.typing(data.content)
        } else {
          this.$router.replace('/error')
        }
      } catch(error) {
        console.error(error)
      }
    },
  },
  beforeMount() {
    if(this.id !== this.$store.getters.getUserId) {
      this.$router.replace('/error')
    }
  },
  mounted() {
    this.loadArticle()
  }
}
</script>

<style scoped>
  .upload-wrapper {
    width: 100%;
  }
  .upload-wrapper > .title {
    padding: 0 3rem;
  }
  .upload-wrapper > .images {
    margin: 3rem 0;
  }
  .upload-wrapper > .content {
    padding: 0 3rem;
    width: 100%;
  }
  .upload-wrapper > .content > .content-box{
    height: 5rem;
  }
  .upload-wrapper > .submit {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 3rem;
  }
</style>