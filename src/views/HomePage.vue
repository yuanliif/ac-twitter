<template>
  <div class="page-container">
    <SiteNav />
    <!-- 首頁時間軸區域（待完成） -->
    <section class="main">
      首頁時間軸區域
    </section>
    <RecommendedList />
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue'
import RecommendedList from '@/components/RecommendedList.vue'
export default {
  components: {
    SiteNav,
    RecommendedList
  }
}
</script>

<style lang="scss" scoped>
section.main {
  width: 600px;
}
</style>>
