<template>
  <div class="upload-wrapper">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title" placeholder="프로젝트 제목" @input="v=>title=v" maxlength="20" focus/>
    </header>
    <section class="images">
      <upload-images ref="images"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="details" placeholder="프로젝트 설명글" @input="v=>content=v"/>
    </section>
    <footer class="submit">
      <default-button class="button" value="완료" @click="upload"/>
      <default-button class="button" value="취소" @click="cancle"/>
    </footer>
  </div>
</template>

<script>
import UploadImages from '@/components/article/upload/UploadImages.vue'
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
    // Event
    cancle() {
      this.$refs.images.rollback()
      this.$router.go(-1)
    },
    async upload() {
      try {
        const data = {
          title: this.title,
          images: this.$refs.images.commit(),
          content: this.content
        }
        if(data.title != '' && data.images.length > 0 && data.content != '') {
          await this.$api("POST", "/article", data)
          this.$router.push({name: 'message', params: {message: "업로드 성공", redirect: "/mypage"}})
        }
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
    margin-bottom: 2rem;
  }
  .upload-wrapper > .submit > .button {
    margin-left: 1rem;
  }
</style>