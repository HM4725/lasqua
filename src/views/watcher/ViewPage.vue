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
        console.log("도착: " + receivedImages)
        for(let i in receivedImages) {
          this.imageList[i] = receivedImages[i]
        }
      } catch(error) {
        console.error(error)
      }
    }
  },
  beforeCreate() {
    this.no = this.$route.query.no
  },
  mounted() {
    console.log(this.no)
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
    margin: 4rem;
  }
</style>