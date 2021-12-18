<template>
  <div :class="{thumbnail: true, clickable: clickable}" @click="goLink">
    <img-component :src="imgSrc" :title="title" class="thumbnail-img" ratio="3/4" @mount="activate" @unmount="deactivate"/>
  </div>
</template>

<script>
import ImgComponent from '../utils/ImgComponent.vue'

export default{
  props: {
    article: {
      type: Object,
      // {
      //   no,
      //   id,
      //   title,
      //   images: {
      //     orderNo,
      //     name,
      //     link
      //   },
      //   content,
      //   regdate
      // }
      default() {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'img',
      validator: v => ['project', 'artist', 'img'].indexOf(v) !== -1
    }
  },
  components: {
    ImgComponent
  },
  data() {
    return {
      clickable: false
    }
  },
  methods: {
    goLink() {
      if(this.clickable) {
        if(this.mode === 'project' && this.article.no) {
          this.$router.push(`/article/view?no=${this.article.no}`)
        } else if (this.mode === 'artist' && this.article.id) {
          this.$router.push(`/artist/${this.article.id}`)
        }
      }
    },
    activate() {
      this.clickable = true
    },
    deactivate() {
      this.clickable = false
    }
  },
  computed: {
    title() {
      return this.article.title ? this.article.title : ''
    },
    imgSrc() {
      const image = this.article.images
      return image ? image.link : ''
    }
  },
}
</script>

<style scoped>
  .thumbnail {
    border: 1px solid var(--active-bg-color);
    border-radius: .25rem;
    transition: all .25s ease-in-out;
  }
  .thumbnail > .thumbnail-img {
    border-radius: calc(0.25rem - 1px);
    transition: all .25s ease-in-out;
  }
  .thumbnail.clickable {
    cursor: pointer;
    border-color: var(--base-color)
  }
  .thumbnail.clickable:hover,
  .thumbnail.clickable:focus {
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: var(--active-color);
  }
  .thumbnail.clickable:hover {
    transform: translateY(-1px);
  }
  .thumbnail.clickable:active {
    background-color: var(--active-bg-color);
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--active-color);
    transform: translateY(0);
  }
  .thumbnail.clickable:hover > .thumbnail-img,
  .thumbnail.clickable:active > .thumbnail-img {
    opacity: 0.7;
  }
</style>