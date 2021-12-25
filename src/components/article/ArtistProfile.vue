<template>
  <div class="artist-card">
    <div class="image">
      <img-component :src="artist.profileImage" :title="artist.id" ratio="3/4" class="artist-img"/>
    </div>
    <div class="id">{{artist.id}}</div>
    <div class="info">{{artist.info}}</div>
    <ul class="sns" v-if="useSns">
      <li v-if="artist.facebook">
        <sns-link-button type="facebook" :link="artist.facebook"/>
      </li>
      <li v-if="artist.facebook">
        <sns-link-button type="instagram" :link="artist.instagram"/>
      </li>
      <li v-if="artist.twitter">
        <sns-link-button type="twitter" :link="artist.twitter"/>
      </li>
    </ul>
  </div>
</template>

<script>
import ImgComponent from '../utils/ImgComponent.vue'
import SnsLinkButton from '../buttons/SnsLinkButton.vue'

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
    ImgComponent,
    SnsLinkButton
  },
  computed: {
    useSns() {
      return this.artist.facebook || this.artist.instagram || this.artist.twitter
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
    padding-bottom: 1rem;
  }
  .artist-card > ul.sns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .artist-card > ul.sns > li {
    margin-right: 8px;
  }
</style>