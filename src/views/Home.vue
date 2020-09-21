<template>
  <el-container class="home-container">
    <el-header>
      <el-row>
        <el-col :span="4" :offset="19">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              欢迎，{{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <MenuBar></MenuBar>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from "../components/MenuBar";
export default {
  data() {
    return {
      username: sessionStorage.getItem("username"),
    };
  },
  components: {
    MenuBar,
  },
  name: "Home",
  methods: {
    async handleCommand(cmd) {
      if (cmd === "logout") {
        console.log(cmd);
        let rs = await this.$http.get("/api/user/logout");
        console.log(rs);
        if (rs.data.code === 1) {
          sessionStorage.removeItem("username");
          this.$message({
            message: rs.data.message,
            type: "success",
          });
          this.$router.push("/login");
        }
      }
    },
  },
  mounted() {
    console.log("home:", this.$route);
  },
};
</script>


<style lang="scss" scoped>
.home-container {
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

