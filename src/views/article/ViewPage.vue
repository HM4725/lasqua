<template>
  <div>
    <section v-if="myPage">
      <default-button value="삭제하기" @click="deleteArticle"/>
      <default-button value="수정하기" @click="modifyArticle"/>
    </section>
    <section class="container">
      <div class="details">
        <div>TITLE: {{title}}</div>
        <div>ARTIST: {{id}}</div>
        <div>CONTENT: {{content}}</div>
        <div class="sub-images" v-for="(image, i) in images.slice(1)" :key="i">
          <img-component :src="image.link" :title="image.name"/>
        </div>
        <div>REGDATE: {{regdate}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/article/ImgComponent.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  components: {
    ImgComponent,
    DefaultButton
  },
  data() {
    return {
      no: 0,
      id: '',
      title: '',
      images: [],
      content: '',
      regdate: '',
      myPage: false
    }
  },
  methods: {
    // Event
    async deleteArticle() {
      try {
        await this.$api("DELETE", `/article/${this.no}?id=${this.id}`)
        this.$router.push({name: 'message', params: {message: "게시물 삭제 완료", redirect: "/"}})
      } catch(error) {
        console.error(error)
      }
    },
    modifyArticle() {
      this.$router.push({name: 'article.modify', params: { no: this.no, id: this.id }})
    },
    // Load
    async loadArticle() {
      try {
        const response = await this.$api("GET", `/article/${this.no}`)
        const data = response.data
        this.id = data.id
        this.title = data.title
        this.images = data.images
        this.content = data.content
        this.regdate = data.regdate
        this.id === this.$store.getters.getUserId && (this.myPage = true)
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    this.no = this.$route.query.no
    this.loadArticle()
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .container > div {
    width: 50%;
  }
  .image {
    margin: 16px;
  }
</style>