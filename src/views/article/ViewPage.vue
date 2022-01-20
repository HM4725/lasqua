<template>
  <div class="project-page">
    <article class="project">
      <div class="details">
        <div class="title">{{title}}</div>
        <dl><dt>작가</dt><dd>{{id}}</dd></dl>
        <dl><dt>설명</dt><dd>{{content}}</dd></dl>
      </div>
      <div class="images">
        <template v-for="(image, i) in images.slice(1)" :key="i">
          <img-component :src="image.link" :title="image.name"/>
        </template>
      </div>
    </article>
    <artist-details v-if="id" class="artist" :uid="id"/>
    <footer v-if="myPage">
      <default-button value="수정하기" @click="modifyArticle"/>
      <default-button value="삭제하기" @click="deleteArticle"/>
    </footer>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import ArtistDetails from '@/components/article/ArtistDetails.vue'

export default{
  name: 'article.view.page',
  components: {
    ImgComponent,
    DefaultButton,
    ArtistDetails
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
          this.$router.push(`/artist/${this.$store.getters.userId}`)
      } catch(error) {
        console.error(error)
      }
    },
    modifyArticle() {
      this.$router.push({name: 'article.modify', params: {data: JSON.stringify(this.$data)}})
    },
    // Load
    async loadArticle() {
      try {
        const response = await this.$api("GET", `/article/${this.no}`)
        const data = response.data
        this.id = data.id
        this.title = data.title
        this.images = data.images.sort((a, b) => a.orderNo - b.orderNo)
        this.content = data.content
        this.regdate = data.regdate
        this.id === this.$store.getters.userId && (this.myPage = true)
      } catch(error) {
        this.$router.push({name: 'message', params: {message: "잘못된 접근입니다.", redirect: "/"}})
      }
    },
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
  .project-page > article.project {
    width: 100%;
    margin-bottom: 1rem;
    border-bottom: solid 1px var(--active-bg-color);
  }
  .project-page > section.artist {
    margin-bottom: 1rem;
    border-bottom: solid 1px var(--active-bg-color);
    padding-bottom: 1rem;
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
  .images {
    padding: 0 3rem;
  }
  .images > img {
    aspect-ratio: auto;
    margin-bottom: 1rem;
  }
  @media (max-width: 767px) {
    .project-page {
      padding: 0;
    }
    .images {
      padding: 0;
    }
  }
</style>