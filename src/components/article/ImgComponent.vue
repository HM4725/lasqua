<template>
  <img :src="src" :alt="title" :title="title" @error="replaceByDefault"/>
</template>

<script>
// 사진이 작아졌다 커지는데, 그게 아니라 형태는 유지해야함.
export default{
  props: {
    title: String,
    src: String
  },
  methods: {
    replaceByDefault(e) {
      const defaultAttrs = {
        title: "제목",
        src: require('../../assets/img/default-img.jpg')
      }
      e.target.alt = defaultAttrs.title
      e.target.title = defaultAttrs.title
      e.target.src = defaultAttrs.src
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