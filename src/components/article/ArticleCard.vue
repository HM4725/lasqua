<template>
  <div class="card" :class="{deactivate: deactivate}">
    <img-component :src="imgSrc" :title="title" class="card-img"/>
    <div class="card-body">
      {{title}}
    </div>
  </div>
</template>

<script>
import ImgComponent from './ImgComponent.vue'

export default{
  props: {
    article: {
      type: Object
    }
  },
  components: {
    ImgComponent
  },
  data() {
    return {
      default: {
        title: "제목",
      }
    }
  },
  computed: {
    deactivate() {
      return this.article.no === undefined
    },
    title() {
      return this.article.title ? this.article.title : this.default.title
    },
    imgSrc() {
      // article 명칭 수정 되면 고쳐야함.
      let src = "errer"
      if(this.article.image) {
        if(this.article.image['img_link']) {
          src = this.article.image['img_link']
        } else if(this.article.image['link']) {
          src = this.article.image['link']
        }
      }
      console.log(src)
      return src
    }
  }
}
</script>

<style scoped>
  .card {
    border: 1px solid var(--base-color);
    border-radius: .25rem;
    word-wrap: break-word;
    transition: all .25s ease-in-out;
  }
  .card > .card-img {
    border-bottom: 1px solid var(--base-color);
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }
  .card:hover,
  .card:focus {
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: var(--active-color);
  }
  .card:hover {
    transform: translateY(-1px);
  }
  .card:active {
    background-color: var(--active-bg-color);
    border-color: var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: var(--active-color);
    transform: translateY(0);
  }
  .card:hover > .card-img,
  .card:active > .card-img {
    opacity: 0.7;
  }

  .card.deactivate {
    color: var(--active-bg-color);
    border: 1px solid var(--active-bg-color);
    border-radius: .25rem;
  }
  .card.deactivate > .card-img {
    border-bottom: 1px solid var(--active-bg-color);
    opacity: 0.7;
  }
  .card.deactivate:hover,
  .card.deactivate:focus,
  .card.deactivate:active {
    color: var(--active-bg-color);
    transform: none;
    box-shadow: none;
    background-color: inherit;
  }
</style>