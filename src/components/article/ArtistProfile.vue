<template>
  <div class="artist-card">
    <div class="image">
      <img-component :src="artist.profileImage" :title="artist.id" ratio="3/4" class="artist-img"/>
    </div>
    <div class="id">{{artist.id}}</div>
    <div class="info">{{artist.info}}</div>
  </div>
</template>

<script>
import ImgComponent from '../utils/ImgComponent.vue'

export default{
  props: {
    artist: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    ImgComponent
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  .artist-card {
    border: 1px solid var(--active-bg-color);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    padding: 1rem;
    background-color: white;
  }
  .artist-card > .image{
    border: 1px solid var(--active-color);
    margin-bottom: 1rem;
  }
  .artist-card > .id {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .artist-card > .info {
    text-align: left;
    word-break: keep-all;
  }
</style>