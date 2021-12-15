<template>
  <div class="project-page">
    <article>
      <div class="details">
        <div class="title">{{title}}</div>
        <div class="id"><span>작가</span>{{id}}</div>
        <pre class="content">{{content}}</pre>
      </div>
      <div class="images">
        <template v-for="(image, i) in images.slice(1)" :key="i">
          <img-component :src="image.link" :title="image.name"/>
        </template>
      </div>
    </article>
    <footer v-if="myPage">
      <default-button value="수정하기" @click="modifyArticle"/>
      <default-button value="삭제하기" @click="deleteArticle"/>
    </footer>
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
        console.log(data)
        this.id = data.id
        this.title = data.title
        this.images = data.images
        this.content = data.content
        this.regdate = data.regdate
        this.id === this.$store.getters.getUserId && (this.myPage = true)
      } catch(error) {
        this.$router.push({name: 'message', params: {message: "잘못된 접근입니다.", redirect: "/"}})
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
  .project-page {
    width: 100%;
    min-height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .project-page > article {
    width: 100%;
  }
  .project-page > footer {
    text-align: right;
  }
  .project-page > footer > button {
    margin-left: 1rem;
  }
  .details {
    text-align: left;
  }
  .details > .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    border-bottom: solid 1px var(--active-bg-color)
  }
  .details > .id {
    padding-left: 1rem;
    margin-bottom: .5rem;
  }
  .details > .id > span {
    color: var(--active-color);
    padding-right: 2rem;
  }
  .details > .content {
    padding-left: 1rem;
    margin-bottom: .5rem;
  }
  .images {
    padding: 0 3rem;
  }
  .images > img {
    aspect-ratio: auto;
    margin-bottom: 1rem;
  }
</style>