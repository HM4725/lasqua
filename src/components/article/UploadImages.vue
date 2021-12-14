<template>
  <div class="upload-images">
      <div class="images">
        <article-list ref="images" rowlength="3">
          <file-slot ref="file" @upload="uploadImage">
            <thumb-nail :article="addButton"/>
          </file-slot>
        </article-list>
      </div>
  </div>
</template>

<script>
import ArticleList from './ArticleList.vue'
import ThumbNail from './ThumbNail.vue'
import FileSlot from '../form/FileSlot.vue'

function wrapImage(image) {
  return {
    no: image.orderNo,
    title: image.name,
    images: {
      orderNo: image.orderNo,
      name: image.name,
      link: image.link
    }
  }
}

export default{
  components: {
    ArticleList,
    ThumbNail,
    FileSlot
  },
  data() {
    return {
      count: 1,
      images: [],
      addButton: {
        no: 0,
        title: '추가',
        images: {
          orderNo: 0,
          name: 'addButton',
          link: require('@/assets/svg/addbutton-3x4.svg')
        }
      },
      error: {
        occur: false,
        message: ''
      }
    }
  },
  methods: {
    async uploadImage(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        const name = formData.get("file").name
        const sameImage = this.images.find(v => v.name === name)
        if(sameImage) {
          const tmp = sameImage.link
          sameImage.link = response.data.link
          await this.$api("DELETE", `/image?link=${tmp}`)
        } else {
          const image = {
            orderNo: this.count++,
            name: name,
            link: response.data.link
          }
          this.images.push(image)
          this.$refs.images.pushAndMount(wrapImage(image))
        }
      } catch(error) {
        console.error(error)
      }
    },
    getValues() {
      this.state.uploadedImages[0].orderNo = 1
      return this.state.uploadedImages
    },
  },
}
</script>

<style scoped>
  .upload-images {
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
  .images {
    width: 100%;
  }
  .delete-image {
    position: relative;
  }
  .error-message {
    color: red;
    margin-top: 5px;
  }
</style>