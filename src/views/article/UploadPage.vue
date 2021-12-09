<template>
  <div class="upload-wrapper">
    <section class="images-wrapper">
      <upload-images/>
    </section>
    <section class="content-wrapper">
      <textarea-box class="content" type="text" id="details" placeholder="프로젝트 설명글" ref="content"/>
    </section>
    <footer class="submit-wrapper">
      <default-button value="업로드"/>
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
    width: 100%;
  }
  .images-wraper > section {
    width: 100%;
  }
  .content-wrapper {
    margin: 2.5rem 0 1rem 0;
  }
  .content{
    height: 5rem;
  }
  .submit-wrapper {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 3rem;
  }
</style>