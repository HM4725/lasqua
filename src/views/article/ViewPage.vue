<template>
  <div class="project-page">
    <article class="project">
      <div class="info">
        <h1 class="title">{{title}}</h1>
        <dl><dt>작가</dt><dd>{{id}}</dd></dl>
        <dl><dt>설명</dt><dd>{{content}}</dd></dl>
      </div>
      <div class="images">
        <template v-for="(image, i) in images.slice(1)" :key="i">
          <img-component :src="image.link" :title="image.name"/>
        </template>
      </div>
    </article>
    <artist-details v-if="id" class="artist" :uid="id" :no="no"/>
    <footer v-if="myPage">
      <default-button class="button" value="삭제" @click="deleteArticle"/>
      <default-button class="button" value="수정" @click="modifyArticle"/>
    </footer>
  </div>
</template>

<script>
import ImgComponent from '@/components/utils/ImgComponent.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import ArtistDetails from '@/components/artist/ArtistDetails.vue'

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
        this.$processMessenger('게시글을 삭제하였습니다.', `/artist/${this.$store.getters.userId}`)
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
        this.$handleWrongAccess('/')
      }
    },
  },
  created() {
    this.no = parseInt(this.$route.query.no)
    this.loadArticle()
  }
}
</script>

<style scoped>
  .project-page {
    width: 100%;
    min-height: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .project-page > article.project {
    width: 100%;
    margin-bottom: 16px;
    border-bottom: solid 1px var(--active-bg-color);
  }
  .project-page > section.artist {
    margin-bottom: 16px;
    border-bottom: solid 1px var(--active-bg-color);
    padding-bottom: 16px;
  }
  .project-page > footer {
    text-align: right;
    margin: 16px 0;
  }
  .project-page > footer > .button {
    margin-left: 16px;
  }
  .info {
    text-align: left;
  }
  .images {
    padding: 0 48px;
  }
  .images > img {
    aspect-ratio: auto;
    margin-bottom: 16px;
  }
  @media (max-width: 767px) {
    .project-page {
      padding: 0;
    }
    .info {
      padding: 0 var(--mobile-padding-size);
    }
    .images {
      padding: 0;
    }
    .project-page > footer {
      padding: var(--mobile-padding-size);
    }
    .project-page > section.artist {
      padding-bottom: 0;
    }
  }
</style>