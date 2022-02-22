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
export default {
  components: {
    AdminSideBar,
    AdminTweetsList
  }
}
</script>
