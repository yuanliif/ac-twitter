<template>
  <div class="sidebar d-flex flex-column">
    <img
      class="logo"
      src="./../assets/images/Logo_@2x_30.png"
      alt=""
    >
    <div class="nav-item-group">
      <div class="nav-item d-flex align-items-center">
        <icon iconName="home" />
        <p class="text">
          推文清單
        </p>
      </div>
      <div class="nav-item d-flex align-items-center">
        <img
          class="nav-icon"
          src="./../assets/images/User_@2x.png"
          alt=""
        >
        <p class="text">
          使用者列表
        </p>
      </div>
    </div>
    <div class="logout d-flex align-items-center">
      <img
        src="./../assets/images/Logout_@2x.png"
        alt=""
      >
      <p>登出</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  width: 235px;
  margin: 4px 40px 0 103px;
  .logo {
    width: 30px;
    height: 30px;
    margin: 10px;
  }
  .nav-item-group {
    width: inherit;
    margin-top: 24px;
    .nav-item {
      width: 100%;
      height: 56px;
      .nav-icon {
        width: 24px;
        height: 24px;
        margin: 0 20px 0 10px;
      }
      .text {
        margin: 0;
        width: 100%;
        line-height: 26px;
        font-size: 18px;
      }
    }
  }
  .logout {
    position: absolute;
    bottom: 22px;
    margin-left: 11px;
    img {
      width: 18px;
      height: 16px;
    }
    p {
      margin: 0 23px;
      line-height: 26px;
      font-size: 18px;
    }
  }
}
</style>
