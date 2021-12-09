<template>
  <div class="upload-images">
      <div class="arrow-button">
        <before-icon class="arrow-icon"/>
      </div>
      <ul class="images">
        <li v-for="(image, i) in state.mountedImages" :key="i">
          <thumb-nail :article="image"/>
          <div>{{image.title}}</div>
        </li>
        <li>
          <file-slot ref="file" @upload="uploadImage">
            <thumb-nail :article="utils.addButton"/>
          </file-slot>
        </li>
      </ul>
      <div class="arrow-button">
        <after-icon class="arrow-icon"/>
      </div>
      
      <modal-slot ref="submitDetails" @close="submitDetails">
        <template v-slot:header>
          <p class="f-title">상세 정보</p>
        </template>
        <template v-slot:body>
          <input-box type="text" id="imageName" placeholder="이미지명" ref="imageName" @keydown.enter="submitModal" focus/>
          <div v-show="error.occur" class="error-message">{{error.message}}</div>
        </template>
      </modal-slot>
  </div>
</template>

<script>
import ThumbNail from './ThumbNail.vue'
import BeforeIcon from '../icons/BeforeIcon.vue'
import AfterIcon from '../icons/AfterIcon.vue'
import FileSlot from '../form/FileSlot.vue'
import ModalSlot from './ModalSlot.vue'
import InputBox from '../form/InputBox.vue'

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
    ThumbNail,
    BeforeIcon,
    AfterIcon,
    InputBox,
    FileSlot,
    ModalSlot
  },
  data() {
    return {
      state: {
        no: 1,
        idx: 0,
        mountedImages: [{}, {}, {}],
        uploadedImages: [],
        uploadedSize: 0,
        deletedNo: 0,
        choiceImage: {
          orderNo: 0,
          name: '',
          link: ''
        },
      },
      utils: {
        blankImage: {
          no: 0,
          title: '',
          images: {
            orderNo: 0,
            name: '없음',
            link: ''
          }
        },
        addButton: {
          no: 0,
          title: '추가',
          images: {
            orderNo: 0,
            name: 'addButton',
            link: require('@/assets/svg/addbutton-3x4.svg')
          },
        },
      },
      error: {
        occur: false,
        message: ''
      }
    }
  },
  methods: {
    getImage(no) {
      const idx = this.state.uploadedImages.findIndex((el) => el.orderNo === no)
      return this.state.uploadedImages[idx]
    },
    isProperName(name) {
      return name !== '' &&
        this.state.uploadedImages.findIndex(image => image.name === name) === -1
    },
    async uploadImage(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        this.state.choiceImage.orderNo = this.state.no++;
        this.$refs.submitDetails.show() // name -> async
        this.state.choiceImage.link = response.data.link
      } catch(error) {
        console.error(error)
      }
    },
    submitDetails() {
      this.error.occur = false
      const nameComponent = this.$refs.imageName
      const name = nameComponent.getValue()
      if(this.isProperName(name)) {
        const image = {
          orderNo: this.state.choiceImage.orderNo,
          name: name,
          link: this.state.choiceImage.link
        }
        this.state.uploadedImages.push(image)
      } else {
        this.$refs.submitDetails.show() 
        nameComponent.occurError()
        this.error.message = name === '' ?
          '이미지명을 입력하세요.' :
          '중복된 이미지명을 입력하였습니다.'
        this.error.occur = true
      }
    },
    shiftImages() {
      if(this.state.idx + 3 < this.state.uploadedSize) {
        const images = []
        const right = this.state.uploadedImages[this.state.idx + 3]
        Object.assign(images, this.state.mountedImages)
        images.shift()
        images.push(wrapImage(right))
        this.state.mountedImages = images
        this.state.idx++
      } else {
        console.error(`[Cannot shift images] index: ${this.state.idx} & size: ${this.state.uploadedSize}`)
      }
    },
    unshiftImages() {
      if(this.state.idx > 0) {
        const images = []
        const left = this.state.uploadedImages[this.state.idx - 1]
        Object.assign(images, this.state.mountedImages)
        images.unshift(wrapImage(left))
        images.pop()
        this.state.mountedImages = images
        this.state.idx--
      } else {
        console.error(`[Cannot unshift images] index: ${this.state.idx}`)
      }
    },
    mountImage() {
      let num = this.state.uploadedImages.length
      const lastUpload = this.state.uploadedImages[num - 1]
      if(num < 4) {
        this.state.mountedImages[num - 1] = wrapImage(lastUpload)
      } else {
        this.shiftImages()
      }
    },
    unmountImage() {
    },
    getValues() {
      this.state.uploadedImages[0].orderNo = 1
      return this.state.uploadedImages
    },
    submitModal() {
      this.$refs.submitDetails.close()
    }
  },
  watch: {
    'state.uploadedImages': {
      deep: true,
      handler() {
        const prevSize = this.state.uploadedSize
        const size = this.state.uploadedImages.length
        this.state.uploadedSize = size
        if(prevSize < size) { // push
          this.mountImage()
        } else { // pop
          this.umountImage()
        }
      }
    }
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  }
  .delete-image {
    position: relative;
  }
  .error-message {
    color: red;
    margin-top: 5px;
  }
</style>