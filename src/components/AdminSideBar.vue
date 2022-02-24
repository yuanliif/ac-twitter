<template>
  <div class="sidebar d-flex flex-column">
    <img
      class="logo"
      src="./../assets/images/Logo_@2x_30.png"
      alt=""
    >

    <div class="nav-item-group">
      <div class="nav-item d-flex align-items-center">
        <router-link
          class="item d-flex"
          to="/admin/tweets"
        >
          <icon
            class="nav-icon"
            icon-name="home"
          />
          <p class="text">
            推文清單
          </p>
        </router-link>
      </div>
      <div class="nav-item d-flex align-items-center">
        <router-link
          class="item d-flex"
          to="/admin/users"
        >
          <icon
            class="nav-icon"
            icon-name="user"
          />
          <p class="text">
            使用者列表
          </p>
        </router-link>
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
        text-decoration: none;
        color: #1c1c1c;
        .nav-icon {
          margin: 0 20px 0 10px;
        }
        .text {
          margin: 0;
          line-height: 26px;
          font-size: 18px;
        }
      }
      .active {
        color: #ff6600;
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
