<template>
  <section class="site-nav">
    <div class="main-part">
      <router-link
        :to="{ name: 'homepage' }"
        class="logo"
      >
        <icon icon-name="logo" />
      </router-link>
      <section class="nav-container">
        <router-link
          class="nav-link link-group"
          :to="{name: 'homepage'}"
          :class="{'active': ['homepage', 'tweet'].includes($route.name) }"
        >
          <icon
            icon-name="home"
            icon-class="mr-20"
          />
          <div class="link-text">
            首頁
          </div>
        </router-link>
        <router-link
          class="nav-link link-group"
          :to="{name: 'user-main', params: {id: currentUser.id}}"
          :class="{'active': ['user-tweets', 'user-replies', 'user-likes'].includes($route.name)} && $route.params.id === currentUser.id"
        >
          <icon
            icon-name="user"
            icon-class="mr-20"
          />
          <div class="link-text">
            個人資料
          </div>
        </router-link>
        <router-link
          class="nav-link link-group"
          :to="{name: 'user-setting'}"
        >
          <icon
            icon-name="setting"
            icon-class="mr-20"
          />
          <div class="link-text">
            設定
          </div>
        </router-link>
      </section>
      <button class="btn-control btn-tweet">
        推文
      </button>
    </div>
    <div class="link-group logout-part">
      <icon
        icon-name="logout"
        icon-class="mr-20"
      />
      <div
        class="link-text"
        @click.stop.prevent="logout"
      >
        登出
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push({ name: 'user-sign-in' })
    }
  }
}
</script>

<style lang="scss" scoped>
$link-hover-opacity: 0.75;

.link-group {
  align-items: center;
  color: #1C1C1C;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  .link-text {
    flex-grow: 1;
    flex-shrink: 1;
    font-size: 18px;
    font-weight: bold;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > svg {
    flex-grow: 0;
    flex-shrink: 0;
    height: 24px;
    width: 24px;
  }
}

.mr-20 {
  margin-right: 20px;
}

section.site-nav {
  border-right: 1px solid #E6ECF0;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  font-family: 'Noto Sans TC', serif;
  justify-content: space-between;
  width: 378px;

  .main-part {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-left: 103px;

    .logo {
      margin-left: 10px;
      margin-top: 14px;

      & > svg {
        height: 30px;
        width: 30px;
      }
    }

    .btn-tweet {
      border-radius: 100px;
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 9px;
      padding: 10px 87px;
      width: 210px;
    }
  }

  .logout-part {
    cursor: pointer;
    margin-bottom: 17px;
    margin-left: 111px;
    user-select: none;

    &:hover {
      opacity: $link-hover-opacity;
    }
  }
}

section.nav-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-left: 10px;
  margin-top: 30px;

  .nav-link {
    margin-bottom: 15px;
    margin-top: 15px;
    padding: 0px 0px;

    &.active {
      color: #FF6600;
    }
    &:hover {
      opacity: $link-hover-opacity;
    }
  }
}
</style>
