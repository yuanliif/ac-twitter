<template>
  <div class="w-100 mx-0 px-0 d-flex">
    <AdminSideBar />
    <AdminUsersCard />
  </div>
</template>

<script>
import AdminSideBar from '@/components/Admin/AdminSideBar.vue'
import AdminUsersCard from '@/components/Admin/AdminUsersCard.vue'

export default {
  components: {
    AdminSideBar,
    AdminUsersCard
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: bold;
  box-sizing: border-box;
  color: #1c1c1c;
}
</style>
