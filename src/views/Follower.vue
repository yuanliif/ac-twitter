<template>
  <div class="page-container">
    <SiteNav />
    <!-- 跟隨者區域（待完成） -->
    <section class="main">
      <Follower />
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
import Follower from '@/components/FollowerContent.vue'
export default {
  components: {
    SiteNav,
    RecommendedList,
    Follower
  }
}
</script>

<style lang="scss" scoped>
section.main {
  width: 600px;
}
</style>>
