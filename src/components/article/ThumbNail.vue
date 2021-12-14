<template>
  <div :class="{thumbnail: true, clickable: clickable}" @click="clickHandler">
    <img-component :src="imgSrc" :title="title" class="thumbnail-img" @mount="activate" @unmount="deactivate"/>
  </div>
</template>

<script>
import ImgComponent from './ImgComponent.vue'

export default{
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    },
    useLink: {
      type: Boolean,
      default: false
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
    clickHandler() {
      if(this.clickable && this.useLink && this.article.no ) {
        this.$router.push(this.link)
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
      return this.article.title ? this.article.title : '없음'
    },
    imgSrc() {
      const image = this.article.images
      return image ? image.link : ''
    },
    link() {
      const no = this.article.no
      return no && this.useLink ? `/article/view?no=${no}` : ''
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