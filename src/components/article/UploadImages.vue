<template>
  <div class="upload-images">
      <div class="images">
        <article-list ref="images" rowlength="3" mode="img" @clickArticle="deleteImage">
          <file-slot ref="file" @upload="uploadImage">
            <thumb-nail :article="addButton" mode="img"/>
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
  props: {
    uploaded: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      count: 0,
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
      },
      deleted: [],
      flags: {
        commit: false
      }
    }
  },
  methods: {
    // API - must call once
    rollback() {
      if(!this.flags.commit) {
        let i = 0
        while(i < this.deleted.length) {
          // deleted is uploaded
          if(this.uploaded.findIndex(img => img.link === this.deleted[i]) !== -1) {
            this.deleted.splice(i, 1)
          // deleted is not uploaded
          } else {
            i++
          }
        }
        i = 0
        while(i < this.images.length) {
          // image is uploaded
          if(this.uploaded.findIndex(img => img.link === this.images[i].link) !== -1) {
            i++
          // image is not uploaded
          } else {
            this.deleted.push(this.images.splice(i, 1)[0].link)
          }
        }
        this._commitDelete()
      }
    },
    commit() {
      if(this.images.length > 0) {
        this.images[0].orderNo = 1
        this._commitDelete()
      }
      return this.images
    },
    // Event
    async uploadImage(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        const name = formData.get("file").name
        const sameImage = this.images.find(v => v.name === name)
        if(sameImage) {
          this.deleted.push(sameImage.link)
          sameImage.link = response.data.link
        } else {
          const image = {
            orderNo: ++this.count,
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
    deleteImage(no) {
      if(no) {
        console.log(no)
        const idx = this.images.findIndex(v => v.orderNo === no)
        this.deleted.push(this.images[idx].link)
        this.images.splice(idx, 1)
        this.$refs.images.remove(no)
      }
    },
    // Private
    _commitDelete() {
      while(this.deleted.length > 0) {
        let link = this.deleted.pop()
        this.$api("DELETE", `/image?link=${link}`)
        console.log(`[DELETE] ${link}`)
      }
      this.flags.commit = true
    },
  },
  mounted() {
    for(let i in this.uploaded) {
      this.count = this.uploaded[i].orderNo
      this.images.push({...this.uploaded[i]})
      this.$refs.images.pushAndMount(wrapImage(this.uploaded[i]))
    }
  },
  beforeUnmount() {
    this.flags.commit || this.rollback()
  }
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