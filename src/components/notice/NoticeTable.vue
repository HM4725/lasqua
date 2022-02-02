<template>
  <section class="table-wrapper">
    <table>
        <thead>
        <tr>
            <th class="field-title">제목</th>
            <th class="field-regdate">등록일</th>
        </tr>
        </thead>
        <tbody>
        <notice-record v-for="(notice, i) in notices.mounted" :key="`notice_${i}`"
            :no="notice.no" :title="notice.title" :regdate="notice.regdate"/>
        </tbody>
    </table>
    <footer>
      <span :class="{disabled: !isLeftExist}" @click="moveLeft">
        prev
      </span>
      <span v-for="(index, i) in page.indices" :key="`index_${i}`"
          :class="{pos: index === page.index}" @click="pagingNotice(index)">
        {{index + 1}}
      </span>
      <span :class="{disabled: !isRightExist}" @click="moveRight">
        next
      </span>
    </footer>
  </section>
</template>

<script>
import NoticeRecord from './NoticeRecord.vue'

export default{
  name: 'components.notice.table',
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
        indices: [],
        index: 0
      }
    }
  },
  computed: {
    isLeftExist() {
      return this.page.index > 0
    },
    isRightExist() {
      return this.page.index < this.page.indices.length - 1
    }
  },
  methods: {
    // Event
    moveLeft() {
      this.isLeftExist && this.pagingNotice(this.page.index - 1)
    },
    moveRight() {
      this.isRightExist && this.pagingNotice(this.page.index + 1)
    },
    pagingNotice(page) {
      const itr = page * this.page.size
      this.notices.mounted = this.notices.loaded.slice(itr, itr + this.page.size)
      this.page.index = page
    },
    // Load API
    async loadNotices() {
      try {
        const response = await this.$api("GET", `/noticelist`)
        const data = response.data
        data.notices.sort((a, b) => b.no - a.no)
        this.notices.loaded = data.notices
        const pageNum = Math.ceil(this.notices.loaded.length / this.page.size)
        this.page.indices = [...Array(pageNum).keys()]
        this.pagingNotice(0)
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    this.loadNotices()
  }
}
</script>

<style scoped>
  section.table-wrapper {
    border: 1px solid var(--active-color);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    padding: 1rem 2rem;
  }
  section.table-wrapper > table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    table-layout: fixed;
  }
  thead > tr {
    line-height: 2.5;
    border-bottom: 1px solid var(--base-color);
  }
  th.field-regdate {
    width: 12rem;
  }
  footer > span {
    transition: color .25s ease-out;
    cursor: pointer;
    padding: .5rem;
  }
  footer > span:active {
    background-color: var(--active-bg-color);
  }
  footer > span:hover, footer > span:active{
    color: var(--active-color)
  }
  footer > span:first-child {
    margin-right: 1rem;
  }
  footer > span:last-child {
    margin-left: 1rem;
  }
  footer > span.pos {
    font-weight: bold;
  }
  footer > span.disabled {
    color: var(--disabled-color);
    cursor: default;
  }
  footer > span.disabled:active {
    color: var(--disabled-color);
    background: none;
  }
  @media (max-width: 767px) {
    section.table-wrapper {
      padding: 0;
      border: none;
    }
    th.field-regdate {
      width: 6rem;
    }
  }
</style>