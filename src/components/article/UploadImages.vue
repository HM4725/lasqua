<template>
  <div class="upload-images">
      <div class="images">
        <article-list ref="images" rowlength="3" mode="img" @removeArticle="deleteImage">
          <file-slot ref="file" @upload="uploadImage">
            <article-cell :article="addButton" mode="img"/>
          </file-slot>
        </article-list>
      </div>
  </div>
</template>

<script>
import ArticleList from './articlelist/ArticleList.vue'
import ArticleCell from './articlelist/ArticleCell.vue'
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
    ArticleCell,
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
  .images {
    width: 100%;
  }
</style>