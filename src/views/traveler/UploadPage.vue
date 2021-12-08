<template>
  <div class="upload-wrapper">
    <section class="image-upload">
      <div class="arrow-button">
        <before-icon class="arrow-icon"/>
      </div>
      <ul class="images">
        <li v-for="(image, i) in images" :key="i">
          <thumb-nail :article="image"/>
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
    </section>
    <section class="content-wrapper">
      <textarea-box class="content" type="text" id="details" placeholder="프로젝트 설명글" ref="content"/>
    </section>
    <default-button class="upload-button" value="업로드"/>
  </div>
</template>

<script>
import DefaultButton from '@/components/buttons/DefaultButton.vue'
import ThumbNail from '@/components/article/ThumbNail.vue'
import BeforeIcon from '@/components/icons/BeforeIcon.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'
import TextareaBox from '@/components/form/TextareaBox.vue'
import FileSlot from '@/components/form/FileSlot.vue'

export default{
  components: {
    DefaultButton,
    ThumbNail,
    BeforeIcon,
    AfterIcon,
    TextareaBox,
    FileSlot
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
      }
    }
  },
  methods: {
    getNo() {
      return this.no++;
    },
    async uploadImage(formData) {
      try {
        const headers = {
          "Content-Type": "multipart/form-data"
        }
        const response = await this.$api("POST", "/article/image", formData, headers)
        console.log(response)
      } catch(error) {
        console.error(error)
      }
      const image = {
        orderNo: this.getNo(),
        name: '',
        link: 'test'//response.data.link
      }
      this.uploadedImages.push(image)
    },
    uploadArticle() {

    },
  },
  mounted() {
  }
}
</script>

<style scoped>
  .upload-wrapper {
    margin-top: 2rem;
  }
  .upload-wrapper > section {
    margin-bottom: 2.5rem;
  }
  .image-upload {
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
  .images {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.5rem;
  }
  .content-wrapper {
    margin: 0 3rem;
  }
  .content{
    height: 5rem;
  }
  .upload-button {
    float: right;
    margin-right: 3rem;
  }
</style>