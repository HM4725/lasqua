<template>
  <div class="upload-wrapper">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title" placeholder="프로젝트 제목" v-model="title" focus/>
    </header>
    <section class="images">
      <upload-images ref="images"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="details" placeholder="프로젝트 설명글" v-model="content"/>
    </section>
    <footer class="submit">
      <default-button value="업로드" @click="uploadArticle"/>
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
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async uploadArticle() {
      try {
        const data = {
          title: this.title,
          images: this.$refs.images.getValues(),
          content: this.content
        }
        await this.$api("POST", "/article", data)
        this.$router.push({name: 'message', params: {message: "업로드 성공", redirect: "/"}})
      } catch(error) {
        console.error(error)
      }
    },
  },
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