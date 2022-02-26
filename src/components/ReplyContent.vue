<template>
  <!-- 使用者Profile推文與回覆區域（待完成） -->
  <div class="tab-container">
    <!-- 使用者導覽列 -->
    <UserNav />
    <!-- 推文與回覆列表 -->
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
