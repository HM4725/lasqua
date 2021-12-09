<template>
  <div class="upload-wrapper">
    <section class="images-wrapper">
      <upload-images/>
    </section>
    <section class="content-wrapper">
      <textarea-box class="content" type="text" id="details" placeholder="프로젝트 설명글" ref="content"/>
    </section>
    <footer class="submit-wraper">
      <default-button class="upload-button" value="업로드"/>
    </footer>
  </div>
</template>

<script>
import UploadImages from '@/components/article/UploadImages.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import TextareaBox from '@/components/form/TextareaBox.vue'

export default{
  components: {
    UploadImages,
    DefaultButton,
    TextareaBox,
  },
  data() {
    return {
    }
  },
  methods: {
    uploadArticle() {

    },
  },
  mounted() {
  }
}
</script>

<style scoped>
  .upload-wrapper {
    margin-top: 2rem;
  }
  .upload-wrapper > section {
    margin-bottom: 2.5rem;
  }
  .images-wraper {
    width: 100%;
  }
  .content-wrapper {
    margin: 0 3rem;
  }
  .content{
    height: 5rem;
  }
  .upload-button {
    float: right;
    margin-right: 3rem;
  }
</style>