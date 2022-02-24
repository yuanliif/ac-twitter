<template>
  <div class="page-container">
    <SiteNav />
    <!-- 使用者Profile（待完成） -->
    <section class="main">
      <!-- 使用者Profile區域（待完成）-->
      <section class="profile">
        使用者Profile區域
      </section>
      <router-view />
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
</style>
