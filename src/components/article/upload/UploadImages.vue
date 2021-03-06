<template>
  <div class="upload-wrapper">
    <table-list v-if="pagination==='scroll'" ref="images" :rowlength="rowlength"
      @clicked="remove" @upload="handleUpload" @error="handleError"/>
    <slide-list v-else-if="pagination==='button'" ref="images" :rowlength="rowlength"
      @clicked="remove" @upload="handleUpload" @error="handleError"/>
  </div>
</template>

<script>
import TableList from './TableList.vue'
import SlideList from './SlideList.vue'

function wrapImage(image) {
  return {
    no: image.orderNo,
    title: image.name,
    images: image
  }
}

export default{
  name: 'components.article.upload.main',
  components: {
    TableList,
    SlideList
  },
  props: {
    rowlength: {
      type: Number,
      default: 3
    },
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
      deleted: [],
      pagination: ''
    }
  },
  methods: {
    // Child API
    async handleUpload(formData) {
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
          this.$refs.images.push(wrapImage(image))
        }
      } catch(error) {
        console.error(error)
      }
    },
    handleError(no) {
      this.remove(no)
      alert('파일 크기가 너무 크거나, 지원하지 않는 파일 형식입니다.')
    },
    remove(no) {
      const idx = this.images.findIndex(image => image.orderNo === no)
      if(idx !== -1) {
        this.deleted.push(this.images.splice(idx, 1)[0].link)
      }
    },
    // Parent API
    isEmpty() {
      return this.images.length === 0
    },
    commit() {
      if(!this.isEmpty()) {
        this.images[0].orderNo = 1
        this._deleteImages()
      }
      return this.images
    },
    rollback() {
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
      this._deleteImages()
    },
    // Private
    _deleteImages() {
      while(this.deleted.length > 0) {
        let link = this.deleted.pop()
        this.$api("DELETE", `/image?link=${link}`)
      }
    }
  },
  created() {
    this.pagination = this.$isMobile() ? 'scroll': 'button';
  },
  mounted() {
    for(let i in this.uploaded) {
      this.count = this.uploaded[i].orderNo
      const image = {...this.uploaded[i]}
      this.images.push(image)
      this.$refs.images.push(wrapImage(image))
    }
  },
  beforeUnmount() {
    this.deleted.length > 0 && this.rollback()
  }
}
</script>

<style scoped>
  .upload-wrapper {
    width: 100%;
  }
</style>