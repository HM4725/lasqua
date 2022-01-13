<template>
  <section>
    <div class="arrow-button" @click="handleClickButton('prev')">
      <before-icon class="arrow-icon" :class="{disabled: !isLeftExist}"/>
    </div>
    <div class="main">
      <article>
        <ul class="slide" 
          :style="{width: `${slideStyle.ulWidth}%`, transform: `translateX(-${slideStyle.left}%)`}">
          <li v-for="(image, i) in images" :key="`cell_${i}`" :style="{width: `${slideStyle.liWidth}%`}">
            <article-cell :article="image" @clicked="handleClickArticle"/>
          </li>
        </ul>
      </article>
      <file-slot class="add-button" ref="file" @upload="handleUpload">
        <article-cell :article="addButton"/>
      </file-slot>
    </div>
    <div class="arrow-button" @click="handleClickButton('next')">
      <after-icon class="arrow-icon" :class="{disabled: !isRightExist}"/>
    </div>
  </section>
</template>

<script>
import ArticleCell from '../articlelist/ArticleCell.vue'
import BeforeIcon from '../../icons/BeforeIcon.vue'
import AfterIcon from '../../icons/AfterIcon.vue'
import FileSlot from '../../form/FileSlot.vue'

export default{
  emits: [
    'upload',
    'clicked'
  ],
  components: {
    ArticleCell,
    BeforeIcon,
    AfterIcon,
    FileSlot
  },
  props: {
    rowlength: Number
  },
  data() {
    return {
      length: 0,
      images: [],
      itr: 0,
      slideStyle: {
        ulWidth: '',
        liWidth: '',
        left: ''
      },
      addButton: {
        no: 0,
        title: '추가',
        images: {
          orderNo: 0,
          name: 'addButton',
          link: require('@/assets/svg/addbutton-3x4.svg')
        }
      },
    }
  },
  computed: {
    isLeftExist() {
      return this.itr > 0
    },
    isRightExist() {
      return this.itr + this.rowlength < this.length
    }
  },
  methods: {
    // UI Event
    handleClickButton(way) {
      if(way === 'prev') {
        this._moveLeft()
      } else { // next
        this._moveRight()
      }
    },
    handleUpload(formData) {
      this.$emit('upload', formData)
    },
    // Child API
    handleClickArticle(no) {
      this._remove(no)
      this.$emit('clicked', no)
    },
    // Parent API
    push(image) {
      if(this.length < this.rowlength) {
        this.images[this.length] = image
      } else {
        this.images.push(image)
        this.slideStyle.ulWidth = 100 / this.rowlength * (this.images.length)
        this.slideStyle.left = 100 * (this.images.length - this.rowlength) / this.images.length
        this.itr = this.images.length - this.rowlength
      }
      this.length++
    },
    // Private
    _moveLeft() {
      if(this.isLeftExist) {
        this.slideStyle.left -= 100 / this.images.length
        this.itr--
      }
    },
    _moveRight() {
      if(this.isRightExist) {
        this.slideStyle.left += 100 / this.images.length
        this.itr++
      }
    },
    _remove(no) {
      const idx = this.images.findIndex(image => image.no === no)
      if(idx !== -1) {
        if(this.length <= this.rowlength) {
          for(let i = idx; i < this.length - 1; i++) {
            this.images[i] = this.images[i + 1]
          }
          this.images[this.length - 1] = {}
        } else {
          this.itr + this.rowlength === this.images.length && this.itr--
          this.images.splice(idx, 1)
          this.slideStyle.ulWidth = 100 / this.rowlength * (this.images.length)
          this.slideStyle.left = 100 * this.itr / this.images.length
        }
        this.length--
      }
    },
  },
  created() {
    this.slideStyle.ulWidth = 100
    this.slideStyle.liWidth = 100 / this.rowlength
    this.slideStyle.left = 0
    for(let i = 0; i < this.rowlength; i++) {
      this.images.push({})
    }
  }
}
</script>

<style scoped>
  ul, li {
    all: unset;
  }
  section {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .arrow-button {
    display: flex;
    padding: 0 1rem;
    cursor: pointer;
    align-items: center;
  }
  .arrow-button:hover > .arrow-icon {
    fill: var(--active-color);
  }
  .arrow-button:active {
    background-color: var(--active-bg-color);
  }
  .arrow-button:active > .arrow-icon {
    fill: var(--active-color);
  }
  .main {
    display: flex;
    width: 100%;
  }
  article {
    width: 75%;
    overflow: hidden;
    padding-top: 2px;
  }
  ul.slide {
    display: flex;
    transition: transform .25s ease-in-out;
  }
  ul.slide > li {
    padding-right: 1.5rem;
  }
  .add-button {
    padding-right: 1.5rem;
    padding-top: 2px;
    width: 25%;
  }
</style>