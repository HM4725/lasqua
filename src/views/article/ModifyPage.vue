<template>
  <div class="modify-page">
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
      <default-button class="button" value="취소" @click="cancel"/>
      <default-button class="button" value="완료" @click="modify"/>
    </footer>
  </div>
</template>

<script>
import UploadImages from '@/components/article/upload/UploadImages.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import TextareaBox from '@/components/form/TextareaBox.vue'
import InputBox from '@/components/form/InputBox.vue'

export default{
  name: 'article.modify.page',
  components: {
    UploadImages,
    DefaultButton,
    TextareaBox,
    InputBox
  },
  props: {
    data: {
      type: String,
      default: '{"error": true}'
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
    cancel() {
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
    if(target.error || target.id !== this.$store.getters.userId) {
      this.$handleWrongAccess('/')
    }
    this.no = target.no
    this.id = target.id
    this.title = target.title
    this.images = target.images
    this.content = target.content
  }
}
</script>

<style scoped>
  .modify-page {
    width: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .modify-page > .images {
    padding: 32px 0;
  }
  .modify-page > .content > .content-box{
    height: 80px;
  }
  .modify-page > footer.submit {
    text-align: right;
    margin: 16px 0;
  }
  .modify-page > footer.submit > .button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    .modify-page {
      padding: var(--mobile-padding-size);
    }
  }
</style>