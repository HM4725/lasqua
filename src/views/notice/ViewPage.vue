<template>
  <article class="view-page">
    <div>{{title}}</div>
    <div>{{regdate}}</div>
    <notice-content :content="content"/>
    <footer>
      <default-button class="button" value="수정하기" @click="modifyNotice"/>
      <default-button class="button" value="삭제하기" @click="deleteNotice"/>
    </footer>
  </article>
</template>

<script>
import NoticeContent from '@/components/notice/NoticeContent.vue'
import DefaultButton from '@/components/buttons/DefaultButton.vue'

export default{
  name: 'notice.viewPage',
  components: {
    NoticeContent,
    DefaultButton
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
    // Event API
    modifyNotice() {
      this.$router.push({name: 'notice.modify', params: {data: JSON.stringify(this.$data)}})
    },
    deleteNotice() {
      console.log('delete')
    },
    // Load Method
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
  footer {
    text-align: right;
    margin: 1rem 0;
  }
  footer > .button {
    margin-left: 1rem;
  }
</style>