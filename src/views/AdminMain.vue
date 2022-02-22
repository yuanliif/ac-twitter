<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-3 border border-primary">
        <AdminSideBar />
      </div>
      <div class="col-9 border border-primary">
        <AdminTweetsList />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSideBar from './../components/AdminSideBar.vue'
import AdminTweetsList from './../components/AdminTweetsList.vue'
export default {
  components: {
    AdminSideBar,
    AdminTweetsList
  }
}
</script>
