<template>
  <div class="upload-wrapper">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title" placeholder="프로젝트 제목" :value="title" @input="v=>title=v" maxlength="20" focus/>
    </header>
    <section class="images">
      <upload-images ref="images"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="upload-content" placeholder="프로젝트 설명글" :value="content" @input="v=>content=v"/>
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
    data: {
      type: String,
      default: '{"myPage": false}'
    }
  },
  data() {
    return {
      no: '',
      id: '',
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
        if(data.title != '' && data.images.length > 0 && data.content != '') {
          console.log(data)
          await this.$api("PUT", "/article", data)
          this.$router.push(`/article/view?no=${this.no}`)
        }
      } catch(error) {
        console.error(error)
      }
    },
  },
  created() {
    const target = JSON.parse(this.data)
    target.id !== this.$store.getters.userId && this.$router.replace("/error")
    this.no = target.no
    this.id = target.id
    this.title = target.title
    this.images = target.images
    this.content = target.content
  },
  mounted() {
    this.$refs.images.push(this.images)
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