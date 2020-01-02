<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <img :src="logopath" class="logo-container" />
    <el-input size="small" placeholder="请输入搜索内容" v-model="inputsearch" class="search-input">
      <el-button @click.native="doSerach" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div class="right-menu">
      <!-- <span style="background-color:red; margin-right:1000px;">aa</span> -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/mypage">
            <el-dropdown-item>个人主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided v-if="islogin">
            <span style="display:block;" @click="logout">登出</span>
          </el-dropdown-item>
          <el-dropdown-item divided v-if="!islogin">
            <span style="display:block;" @click="gologin">登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import { getToken } from "@/utils/auth";
import getters from "../../store/getters";
export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  methods: {
    doSerach() {
      // alert(this.inputsearch);
      this.$router.push({
        name: "searchResult",
        query: { input: this.inputsearch }
      });
    },
    gologin(){
      this.$router.push({path:"/login"})
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/`);
    }
  },
  data() {
    return {
      avatar:'',
      inputsearch: "",
      islogin: getToken() == '' ? false : true,
      logopath: require("@/assets/logo.png")
    };
  },
  created() {
    console.log(getToken());
    if(this.islogin){
      this.avatar = this.$store.getters['avatar']
    }else{
      this.avatar = "https://metube-backend.oss-cn-beijing.aliyuncs.com/true.jpeg"
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  // position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .logo-container {
    // background-color: red;
    margin: 10px;
    float: left;
  }
  .search-input {
    float: left;
    // background-color: red;
    width: 500px;
    height: 20px;
    margin-top: 10px;
    margin-left: 400px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
