<template>
  <!-- 使用者Profile喜歡的內容區域（待完成） -->
  <div class="tab-container">
    <!-- 使用者導覽列 -->
    <UserNav />
    <!-- 喜歡的內容列表 -->
  </div>
</template>

<script>
import UserNav from '@/components/UserNav.vue'

export default {
  components: {
    UserNav
  }
}
</script>
