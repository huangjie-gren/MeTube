<template>
  <div>
    <div class="welcome-line">{{ nickname }},欢迎你！</div>
    <div class="update-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["nickname"])
  },
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        oldpassword: "",
        newpassword: ""
      }
    };
  },
  created() {
    // this.form.nickname = "a"
    this.form.nickname = this.$store.getters["nickname"];
    this.form.username = this.$store.getters["username"];
  },
  methods: {
    onSubmit() {
      // alert('clicked')
      this.$store
        .dispatch("user/update", this.form)
        .then(() => {
          alert("update success")
          this.loading = false;
        })
        .catch(() => {
          alert("update error")
          this.loading = false;
        });
    }
  }
};
</script>
