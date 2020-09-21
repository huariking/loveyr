<template>
  <el-menu
    :default-active="$store.state.menuActive"
    class="el-menu-vertical-demo"
    :default-openeds="['1','4']"
  >
    <el-submenu
      :index="item.meta.id"
      v-for="(item) in getNav($router.options.routes)"
      :key="item.meta.id"
    >
      <template slot="title">
        <i :class="item.meta.iconclass"></i>
        {{item.meta.name}}
      </template>

      <el-menu-item :index="sub.meta.id" v-for="sub in getNav(item.children)" :key="sub.meta.id">
        <span @click="handleClick(sub)">{{sub.meta.name}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  methods: {
    handleClick(menu) {
      this.$router.push(menu.path);
      console.log("$route:", this.$route);
    },
    getNav(list) {
      return list.filter((item) => item.meta);
    },
  },
  mounted() {
    console.log("router:", this.$router);
  },
};
</script>

