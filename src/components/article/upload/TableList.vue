<template>
  <table>
    <image-row v-for="(row, i) in rows" :articles="row" :key="`row_${i}`"
      @clicked="handleClickArticle"/>
    <tfoot>
      <input type="file" ref="file" @change="handleUpload"/>
    </tfoot>
  </table>
</template>

<script>
import ImageRow from './ImageRow.vue'

export default{
  name: 'components.article.upload.table',
  emits: [
    'upload',
    'clicked'
  ],
  components: {
    ImageRow
  },
  props: {
    rowlength: Number
  },
  data() {
    return {
      rows: [],
      addButton: {
        no: -1,
        title: '추가',
        images: {
          orderNo: 0,
          name: 'addButton',
          link: require('@/assets/svg/addbutton-3x4.svg')
        }
      },
    }
  },
  methods: {
    handleUpload(e) {
      if(e.target.files[0]) {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        this.$emit("upload", formData)
        e.target.value = ''
      }
    },
    // Child API
    handleClickArticle(no) {
      if(no === this.addButton.no) {
        this.$refs.file.click()
      } else {
        this._remove(no)
        this.$emit('clicked', no)
      }
    },
    // Parent API
    push(image) {
      const row = this.rows.at(-1)
      const idx = row.findIndex(v=>v.no===undefined)
      if(idx !== -1) {
        row[idx] = image
      } else {
        const row = [image]
        for(let i = 0; i < this.rowlength - 1; i++) {
          row.push({})
        }
        this.rows.push(row)
      }
    },
    // Private
    _remove(no) {
      const idx = this._findIndex(no)
      let i = this.rows.length - 1
      let j = 0
      let tmp = {}
      if(idx.i !== -1 && idx.j !== -1) {
        while(i >= idx.i) {
          j = i === idx.i ? idx.j : 0
          this.rows[i].push(tmp)
          tmp = this.rows[i].splice(j, 1)[0]
          i--
        }
        if(this.rows.at(-1)[0].no === undefined) {
          this.rows.pop()
        }
      }
    },
    _findIndex(no) {
      let i = this.rows.length - 1
      let j = this.rowlength - 1
      while(i >= 0) {
        if(this.rows[i][0].no <= no) {
          break
        }
        i--
      }
      if(i !== -1) {
        j = this.rows[i].findIndex(v=>v.no===no)
      } else {
        j = -1
      }
      return {i: i, j: j}
    }
  },
  created() {
    const row = [this.addButton]
    for(let i = 0; i < this.rowlength - 1; i++) {
      row.push({})
    }
    this.rows.push(row)
  }
}
</script>

<style scoped>
  table{
    width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
    border-spacing: 24px;
  }
  input[type=file] {
    display: none;
  }
  @media (max-width: 767px) {
    table {
      border-spacing: 5px;
    }
  }
</style>