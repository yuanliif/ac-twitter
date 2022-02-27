<template>
  <div class="page-container">
    <SiteNav />
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
