<template>
  <div class="sidebar d-flex flex-column">
    <img
      class="logo"
      src="./../assets/images/Logo_@2x_30.png"
      alt=""
    >

    <div class="nav-item-group">
      <div class="nav-item d-flex align-items-center">
        <div class="item d-flex">
          <icon
            class="nav-icon"
            icon-name="home"
            icon-class="home"
          />
          <p class="text">
            推文清單
          </p>
        </div>
      </div>
      <div class="nav-item d-flex align-items-center">
        <div class="item d-flex">
          <icon
            class="nav-icon"
            icon-name="user"
            icon-class="user"
          />
          <p class="text">
            使用者列表
          </p>
        </div>
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
svg {
  width: 30px;
  height: 24px;
  display: flex;
  align-items: center;
}
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
      height: 56px;
      cursor: default;
      .item {
        cursor: pointer;
        .nav-icon {
          margin: 0 20px 0 10px;
        }
        .text {
          margin: 0;
          line-height: 26px;
          font-size: 18px;
        }
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
