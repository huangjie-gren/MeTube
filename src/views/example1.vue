<template>
<div>
  <p>{{ msg }}</p>
  <el-button type="primary" @click="onClick">aa</el-button>
  <!-- <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
  >Login</el-button>-->
</div>
</template>

<script>
/* eslint-disable */
import { ping } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: ""
    };
  },
  created() {
    ping()
      .then(response => {
        const { data } = response;
        // const { Info } = data;
        this.msg = data;
      })
      .catch(error => {
        alert(error);
      });
  },
  methods: {
    onClick() {
      alert("我被点击了");
    }
  }
};
</script>
