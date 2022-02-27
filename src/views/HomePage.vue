<template>
  <div class="page-container">
    <SiteNav />
    <!-- 首頁時間軸區域（待完成） -->
    <section class="main">
      <HomeTweetArea />
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import HomeTweetArea from '@/components/HomeTweetArea.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import { mapState } from 'vuex'

export default {
  components: {
    SiteNav,
    HomeTweetArea,
    RecommendedList
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
