<template>
  <div>
    <section class="container">
        <div class="image" v-for="(image, i) in imageList" :key="i">
          <img-component :src="image.link" :title="image.name"/>
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
      imageList: []
    }
  },
  methods: {
    async loadArticle() {
      try {
        const response = await this.$api("GET", `/article/${this.no}`)
        const receivedImages = response.data.image
        for(let i in receivedImages) {
          this.imageList.push(receivedImages[i])
        }
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
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .image {
    margin: 16px;
  }
</style>