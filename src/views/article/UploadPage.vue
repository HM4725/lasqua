<template>
  <div class="upload-page">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title"
        placeholder="프로젝트 제목" v-model="title" maxlength="20" focus/>
    </header>
    <section class="images">
      <upload-images ref="images"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="upload-content"
        placeholder="프로젝트 설명글" v-model="content"/>
    </section>
    <footer class="submit">
      <default-button class="button" value="취소" @click="cancel"/>
      <default-button class="button" value="완료" @click="upload"/>
    </footer>
  </div>
</template>

<script>
import UploadImages from '@/components/article/upload/UploadImages.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import TextareaBox from '@/components/form/TextareaBox.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'article.upload.page',
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
    // Event
    cancel() {
      this.$refs.images.rollback()
      this.$router.go(-1)
    },
    async upload() {
      if(this.title.trim().length === 0) {
        alert('프로젝트의 제목을 입력해주세요.')
      } else if(this.content.trim().length === 0) {
        alert('프로젝트의 설명글을 입력하세요.')
      } else if(this.$refs.images.isEmpty()){
        alert('프로젝트의 이미지를 업로드해주세요.')
      } else {
        try {
          const data = {
            title: this.title,
            images: this.$refs.images.commit(),
            content: this.content
          }
          await this.$api("POST", "/article", data)
          this.$router.push(`/artist/${this.$store.getters.userId}`)
        } catch(error) {
          console.error(error)
        }
      }
    },
  },
}
</script>

<style scoped>
  .upload-page {
    width: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .upload-page > .images {
    padding: 32px 0;
  }
  .upload-page > .content > .content-box{
    height: 80px;
  }
  .upload-page > footer.submit {
    text-align: right;
    margin: 16px 0;
  }
  .upload-page > footer.submit > .button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    .upload-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>