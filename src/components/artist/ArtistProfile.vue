<template>
  <div class="artist-card">
    <div class="image">
      <img-component :src="profileImage" :title="artist.id" ratio="3/4" class="artist-img"/>
    </div>
    <div class="profile">
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
  </div>
</template>

<script>
import ImgComponent from '../utils/ImgComponent.vue'
import SnsLinkButton from '../buttons/SnsLinkButton.vue'

export default{
  name: 'components.article.artist.profile',
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
    },
    profileImage() {
      return this.artist.profileImage || require('@/assets/img/default-profile.png')
    }
  }
}
</script>

<style scoped>
  ul, li {
    all: unset;
  }
  .artist-card {
    display: flex;
    flex-direction: column;
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
  .artist-card > .profile > .id {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .artist-card > .profile > .info {
    text-align: left;
    word-break: break-word;
    white-space: pre-line;
    padding-bottom: 1rem;
  }
  .artist-card > .profile > ul.sns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .artist-card > .profile > ul.sns > li {
    margin-right: 8px;
  }
  @media (max-width: 767px) {
    .artist-card {
      flex-direction: row;
      padding: 0;
      border: none;
      border-radius: 0;
      box-shadow: rgb(0 0 0 / 20%) 0 0 12px 12px
    }
    .artist-card > .image{
      border: none;
      padding: 5px;
      margin-bottom: 0;
    }
    .artist-card > .image {
      flex: 2;
      margin: auto 0;
    }
    .artist-card > .profile {
      padding: .5rem .5rem 0 1rem;
      flex: 3;
    }
    .artist-card > .profile > .id {
      text-align: left;
      margin-bottom: 4px;
    }
  }
</style>