<template>
  <article class="view-page">
    <div>{{title}}</div>
    <div>{{regdate}}</div>
    <notice-content :content="content"/>
  </article>
</template>

<script>
import NoticeContent from '@/components/notice/NoticeContent.vue'

export default{
  name: 'notice.viewPage',
  components: {
    NoticeContent
  },
  data() {
    return {
      no: 0,
      title: '',
      content: '',
      regdate: ''
    }
  },
  methods: {
    async loadNotice(no) {
      try {
        const response = await this.$api("GET", `/notice?no=${no}`)
        const data = response.data
        this.title = data.title
        this.content = data.content
        this.regdate = data.regdate
      } catch(error) {
        console.error(error)
      }
    }
  },
  created() {
    this.no = this.$route.query.no
    this.loadNotice(this.no)
  }
}
</script>

<style scoped>
  article.view-page {
    width: 100%;
    padding: 1.5rem;
    text-align: left;
  }
</style>