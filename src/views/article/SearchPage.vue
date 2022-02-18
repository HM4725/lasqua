<template>
  <div class="search-page">
    <!-- 1) projects -->
    <div class="projects">
      <!-- 1-1) projects/common -->
      <h2>Projects</h2>
      <p v-if="notfound.projects">검색 결과가 없습니다.</p>
      <!-- 1-2) projects/mobile -->
      <template v-if="$isMobile()">
        <template v-if="!notfound.projects">
          <div :class="{button: true, open: open==='projects'}" @click="openProjects">
            <span>{{projectsComment}}</span>
            <after-icon class="search-open-icon"/>
          </div>
          <section class="articles-wrapper">
            <transition name="slide-down">
              <article-list v-show="open==='projects'" ref="projects"
                @request="handleRequestProject" @clicked="handleClickProject"/>
            </transition>
          </section>
        </template>
      </template>
      <!-- 1-3) projects/pc -->
      <template v-else>
        <article-list ref="projects" :rowlength="4" paging="button"
          @request="handleRequestProject" @clicked="handleClickProject"/>
      </template>
    </div>
    <!-- 2) artists -->
    <!-- 2-1) artists/mobile -->
    <template v-if="$isMobile()"> 
      <!-- 2-1-1) artists/mobile/notfound -->
      <div class="artists footer" v-if="notfound.artists">
        <h2>Artists</h2>
        <p>검색 결과가 없습니다.</p>
      </div>
      <!-- 2-1-2) artists/mobile/found -->
      <template v-else>
        <div v-show="open!=='artists'" class="artists footer">
          <h2>Artists</h2>
          <div class="button" @click="openArtists">
            <span>{{artistsComment}}</span>
            <after-icon class="search-open-icon"/>
          </div>
        </div>
        <transition name="slide-up">
          <div v-show="open==='artists'" ref="artistsWrapper"
              :class="{artists: true, footer: footer}">
            <h2>Artists</h2>
            <div :class="{button: true, open: open==='artists'}" @click="openArtists">
              <span>{{artistsComment}}</span>
              <after-icon class="search-open-icon"/>
            </div>
            <article-list ref="artists"
              @request="handleRequestArtist" @clicked="handleClickArtist"/>
          </div>
        </transition>
      </template>
    </template>
    <!-- 2-2) artists/pc -->
    <template v-else>
      <div class="artists">
        <h2>Artists</h2>
        <p v-if="notfound.artists">검색 결과가 없습니다.</p>
          <article-list ref="artists" :rowlength="4" paging="button"
            @request="handleRequestArtist" @clicked="handleClickArtist"/>
      </div>
    </template>
  </div>
</template>

<script>
import ArticleList from '@/components/article/articlelist/ArticleList.vue'
import AfterIcon from '@/components/icons/AfterIcon.vue'

function getArticlelistFrom(userlist) {
  const users = []
  for(let i in userlist.userList) {
    let user = userlist.userList[i]
    users.push({
      no: user.id,
      id: user.id,
      title: user.id,
      images: {
        orderNo: 0,
        name: user.id,
        link: user.profileImage || require('@/assets/img/default-profile.png')
      }
    })
  }
  return {
    allArticleCount: userlist.allUserCount,
    page: userlist.page,
    maxPage: userlist.maxPage,
    articles: users
  }
}

export default{
  name: 'article.search.page',
  components: {
    ArticleList,
    AfterIcon
  },
  data() {
    return {
      keyword: '',
      notfound: {
        projects: false,
        artists: false
      },
      open: 'projects',
      footer: true
    }
  },
  computed: {
    projectsComment() {
      return this.open === 'projects' ? '결과닫기' : '결과보기'
    },
    artistsComment() {
      return this.open === 'artists' ? '결과닫기' : '결과보기'
    }
  },
  methods: {
    async handleRequestProject(page) {
      try {
        const response = await this.$api("GET", 
          `/search/articles?key=${this.keyword}&page=${page}`)
        const data = response.data
        data.page === page && this.$refs.projects.inject(data)
      } catch(error) {
        this.$refs.projects.inject({articles: []})
        this.notfound.projects = true
      }
    },
    handleClickProject(no) {
      this.$router.push(`/article/view?no=${no}`)
    },
    async handleRequestArtist(page) {
      try {
        const response = await this.$api("GET", 
          `/search/users?key=${this.keyword}&page=${page}`)
        const data = getArticlelistFrom(response.data)
        data.page === page && this.$refs.artists.inject(data)
      } catch(error) {
        this.$refs.artists.inject({articles: []})
        this.notfound.artists = true
      }
    },
    handleClickArtist(id) {
      this.$router.push(`/artist/${id}`)
    },
    // Mobile API
    openProjects() {
      if(this.open === 'projects') {
        this.open = ''
      } else { // artists or ''
        this.open = 'projects'
        this.footer = true
      }
    },
    openArtists() {
      if(this.open === 'artists') {
        this.open = ''
        setTimeout(() => {this.footer = true}, 50)
      } else { // projects or ''
        this.open = 'artists'
        const top = 48 + 86
        // 48px: Header layout height
        // 86px: Closed projects wrapper height
        setTimeout(() => {
          const height = top + this.$refs.artistsWrapper.getBoundingClientRect().height
          if(height > document.documentElement.scrollHeight)
            this.footer = false
        }, 50)
      }
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.keyword || this.$router.replace('/error')
  }
}
</script>

<style scoped>
  .search-page {
    width: 100%;
  }
  div.projects {
    width: 100%;
    margin-bottom: 32px;
  }
  @media (max-width: 767px) {
    .search-page {
      width: 100%;
      height: 100%;
    }
    div.projects > div.open + section.articles-wrapper {
      padding-bottom: 272px;
    }
    div.artists {
      width: 100%;
      background-color: white;
      border-top: 1px solid var(--disabled-color);
    }
    div.artists.footer {
      position: fixed;
      bottom: 0;
      padding-bottom: 16px;
    }
    .button {
      display: inline-block;
      padding: 3px;
    }
    .button:active {
      background-color: var(--active-bg-color);
    }
    section.articles-wrapper {
      overflow: hidden;
    }
    .search-open-icon {
      transition: transform .25s ease-out;
      position: relative;
      top: 2px;
    }
    .search-open-icon:hover {
      fill: var(--base-color);
    }
    .search-open-icon:active {
      fill: var(--base-color);
    }
    .button.open > .search-open-icon {
      transform: rotate(90deg);
    }
  }
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }
  .slide-down-enter-from,
  .slide-down-leave-active {
    opacity: 0;
    transform: translateY(-50%);
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }
  .slide-up-enter-from,
  .slide-up-leave-active {
    opacity: 0;
    transform: translateY(50%);
  }
</style>