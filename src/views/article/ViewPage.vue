<template>
  <div>
    <section class="container">
      <div class="main-image">
        <img-component :src="images.main.link" :title="images.main.name"/>
      </div>
      <div class="details">
        <div>TITLE: {{title}}</div>
        <div>ARTIST: {{id}}</div>
        <div>CONTENT: {{content}}</div>
        <div class="sub-images" v-for="(image, i) in images.sub" :key="i">
          <img-component :src="image.link" :title="image.name"/>
        </div>
        <div>REGDATE: {{regdate}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import ImgComponent from '@/components/article/ImgComponent.vue'

export default{
  components: {
    ImgComponent
  },
  data() {
    return {
      no: 0,
      id: '',
      title: '',
      images: {
        main: {},
        sub: []
      },
      content: '',
      regdate: ''
    }
  },
  methods: {
    async loadArticle() {
      try {
        const response = await this.$api("GET", `/article/${this.no}`)
        const data = response.data
        const images = data.images
        this.id = data.id
        this.title = data.title
        this.images.main = images[0]
        for(let i = 1; i < images.length; i++) {
          this.images.sub.push(images[i])
        }
        this.content = data.content
        this.regdate = data.regdate
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