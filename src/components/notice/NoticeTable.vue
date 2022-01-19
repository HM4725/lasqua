<template>
  <section>
    <table>
        <thead>
        <tr>
            <th class="field-no">No</th>
            <th class="field-title">Title</th>
        </tr>
        </thead>
        <tbody>
        <notice-record v-for="(notice, i) in notices.mounted" :key="`notice_${i}`"
            :no="notice.no" :title="notice.title"/>
        </tbody>
    </table>
    <footer>
      <span v-for="(index, i) in page.index" :key="`index_${i}`"
          class="wide-click" @click="pagingNotice(index)">
        {{index + 1}}
      </span>
    </footer>
  </section>
</template>

<script>
import NoticeRecord from './NoticeRecord.vue'

export default{
  name: 'notice.table',
  components: {
    NoticeRecord
  },
  data() {
    return {
      notices: {
        loaded: [],
        mounted: []
      },
      page: {
        size: 10,
        index: []
      }
    }
  },
  methods: {
    async loadNotices() {
      try {
        const response = await this.$api("GET", `/noticelist`)
        const data = response.data
        data.notices.sort((a, b) => b.no - a.no)
        this.notices.loaded = data.notices
        const pageNum = Math.ceil(this.notices.loaded.length / this.page.size)
        this.page.index = [...Array(pageNum).keys()]
        this.pagingNotice(0)
      } catch(error) {
        console.error(error)
      }
    },
    pagingNotice(page) {
      const itr = page * this.page.size
      this.notices.mounted = this.notices.loaded.slice(itr, itr + this.page.size)
    }
  },
  created() {
    this.loadNotices()
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    border: 1px solid var(--base-color);
    border-collapse: collapse;
    margin: 1rem 0;
  }
  thead > tr {
    line-height: 2.5;
  }
  th {
    border: 1px solid var(--base-color);
  }
  th.field-no {
    width: 10%;
  }
  th.field-title {
    width: 90%;
  }
  footer > span {
    transition: color .25s ease-out;
    cursor: pointer;
  }
  footer > span:hover, footer > span:active{
    color: var(--active-color)
  }
</style>