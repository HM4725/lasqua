<template>
  <div class="modify-wrapper">
    <header class="title">
      <input-box class="info-box" type="text" id="upload-title" placeholder="프로젝트 제목" :value="title" @input="v=>title=v" maxlength="20" focus/>
    </header>
    <section class="images">
      <upload-images ref="images" :uploaded="images" :rowlength="3"/>
    </section>
    <section class="content">
      <textarea-box class="content-box" type="text" id="modify-content" placeholder="프로젝트 설명글" :value="content" @input="v=>content=v"/>
    </section>
    <footer class="submit">
      <default-button class="button" value="완료" @click="modify"/>
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
    cancle() {
      this.$refs.images.rollback()
      this.$router.go(-1)
    },
    async modify() {
      try {
        const data = {
          no: this.no,
          id: this.id,
          title: this.title,
          images: this.$refs.images.commit(),
          content: this.content
        }
        if(data.title != '' && data.images.length > 0 && data.content != '') {
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
  }
}
</script>

<style scoped>
  .modify-wrapper {
    width: 100%;
  }
  .modify-wrapper > .title {
    padding: 0 3rem;
  }
  .modify-wrapper > .images {
    margin: 3rem 0;
  }
  .modify-wrapper > .content {
    padding: 0 3rem;
    width: 100%;
  }
  .modify-wrapper > .content > .content-box{
    height: 5rem;
  }
  .modify-wrapper > .submit {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 3rem;
  }
  .modify-wrapper > .submit > .button {
    margin-left: 1rem;
  }
</style>