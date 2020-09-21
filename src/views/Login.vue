<template>
  <div class="login-wrapper">
    <el-form :model="user" ref="loginForm" :rules="rules" class="login-form">
      <h1>
        系统登录
      </h1>
      <el-form-item label="" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="" prop="password">
        <el-input v-model="user.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-checkbox v-model="user.checked" label="记住密码"></el-checkbox>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" :loading="isloading" @click="handleLogin">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isloading: false,
      user: {
        username: "",
        password: "",
        checked: false
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        //验证通过
        if (valid) {
          console.log("pass")
          this.isloading = true
          let rs = await this.$http.post("/api/user/login", {
            username: this.user.username,
            password: this.user.password
          })
          console.log(rs)
          //登录失败
          if (rs.data.code === -1) {
            this.$message({
              message: rs.data.message,
              type: "warning"
            })
          } else {

            //登录成功

            //用户的会话信息
            sessionStorage.setItem("username", this.user.username)

            //记住密码
            if (this.user.checked) {
              localStorage.setItem("checked", this.user.checked)
              localStorage.setItem("username", this.user.username)
              localStorage.setItem("password", this.user.password)
            } else {
              localStorage.removeItem("checked")
              localStorage.removeItem("username")
              localStorage.removeItem("password")
            }
            this.isloading = false
            this.$router.push("/home")
          }
        } 
      })
    }
  },
  mounted() {
    let checked = JSON.parse(localStorage.getItem("checked"))
    this.user.checked = checked
    this.user.username = localStorage.getItem("username")
    this.user.password = localStorage.getItem("password")
  }
}
</script>


<style lang="scss" scoped>
.login-wrapper {
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  .login-form {
    box-sizing: border-box;
    width: 500px;
    height: 400px;
    padding: 30px;
    box-shadow: 1px 1px 15px rgb(206, 205, 205);
    border-radius: 8px;
    h1 {
      text-align: center;
      line-height: 50px;
      font-size: 26px;
      margin-bottom: 30px;
    }
    button {
      width: 100%;
    }
  }
}
</style>

