<template>
  <img :src="src" :alt="title" :title="title"/>
</template>

<script>
export default{
  data() {
    return {
      title: "test",
      src: "https://lasqua-article.s3.ap-northeast-2.amazonaws.com/image/sample.jpg"
    }
  }
}
</script>

<style scoped>
img {
  aspect-ratio: 3 / 4;
  width: 100%;
  object-fit: cover;
}
</style>