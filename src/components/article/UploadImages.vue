<template>
  <div class="upload-images">
      <div class="arrow-button">
        <before-icon class="arrow-icon"/>
      </div>
      <ul class="images">
        <li v-for="(image, i) in images" :key="i">
          <thumb-nail :article="image"/>
          <div class="delete-image">x</div>
        </li>
        <li>
          <file-slot ref="file" @upload="uploadImage">
            <thumb-nail :article="addButton"/>
          </file-slot>
        </li>
      </ul>
      <div class="arrow-button">
        <after-icon class="arrow-icon"/>
      </div>

      <modal-slot ref="imageDetails" @close="submitImageDetails">
        <template v-slot:header>
          <p class="f-title">상세 정보</p>
        </template>
        <template v-slot:body>
          <input-box type="text" id="imageName" placeholder="이미지명" ref="imageName" @keydown.enter="submitModal" focus/>
          <div v-show="error" class="error-message">{{errorMessage}}</div>
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
      no: 1,
      images: [{}, {}, {}],
      uploadedImages: [],
      addButton: {
        no: 0,
        title: '추가',
        images: {
          orderNo: 0,
          name: 'addButton',
          link: require('@/assets/svg/addbutton-3x4.svg')
        },
      },
      choiceImage: {
        orderNo: 0,
        name: '',
        link: ''
      },
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    getImage(no) {
      const idx = this.uploadedImages.findIndex((el) => el.orderNo === no)
      return this.uploadedImages[idx]
    },
    getNo() {
      return this.no++;
    },
    isProperName(name) {
      return name !== '' && this.uploadedImages.findIndex(image => image.name === name) === -1
    },
    async uploadImage(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/file", formData, headers)
        this.choiceImage.orderNo = this.getNo()
        this.$refs.imageDetails.show() // name -> async
        this.choiceImage.link = formData.get('file').name
        console.log(response)
      } catch(error) {
        console.error(error)
      }
    },
    submitImageDetails() {
      this.error = false
      const nameComponent = this.$refs.imageName
      const name = nameComponent.getValue()
      if(this.isProperName(name)) {
        const image = {
          orderNo: this.choiceImage.orderNo,
          name: name,
          link: this.choiceImage.link
        }
        this.uploadedImages.push(image)
      } else {
        this.$refs.imageDetails.show() 
        nameComponent.occurError()
        this.errorMessage = name === '' ?
          '이미지명을 입력하세요.' :
          '중복된 이미지명을 입력하였습니다.'
        this.error = true
      }
    },
    submitModal() {
      this.$refs.imageDetails.close()
    }
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