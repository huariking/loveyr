<template>
  <div>
    <el-row class="tool-bar">
      <el-col :span="6">
        <el-input v-model="name" placeholder="请输入用户名" />
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="handleQuery">搜索</el-button>
        <el-button type="success" @click="handleAdd">新增</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="datalist"
      v-loading="isloading"
      @select-all="handleSelect"
      @select="handleSelect"
      style="width: 100%"
      :height="getHeight()"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>

      <el-table-column prop="name" label="姓名" sortable width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" sortable width="80">
        <template slot-scope="scope">{{scope.row.sex ? '女':'男'}}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" sortable width="80"></el-table-column>
      <el-table-column prop="birthday" label="生日" sortable width="150"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="footer">
      <el-col :span="4" align="left">
        <el-button type="danger" @click="handleBatchDel" :disabled="isbatchDel">批量删除</el-button>
      </el-col>
      <el-col :span="20" align="right">
        <el-pagination
          @current-change="handlePagechange"
          background
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>

    <UserAdd v-if="showAdd" @close="handleAddClose"></UserAdd>
    <user-edit v-if="showEdit" :item="currentUser" @close="handleEditClose"></user-edit>
  </div>
</template>
<script>
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";
export default {
  data() {
    return {
      name: "",
      pageno: 1,
      total: 0,
      pagesize: 10,
      datalist: [],
      selectedList: [],
      isloading: false,
      showAdd: false,
      showEdit: false,
      currentUser: {},
    };
  },
  components: {
    UserAdd,
    UserEdit,
  },
  computed: {
    isbatchDel() {
      return !this.selectedList.length > 0;
    },
  },
  methods: {
    getHeight() {
      return window.innerHeight - 275;
    },
    handleEdit(index, row) {
      this.currentUser = row;
      this.showEdit = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let id = row.id;
          let rs = await this.$http.get("/api/user/del", { params: { id } });
          this.$message({
            type: "success",
            message: rs.data.message,
          });

          if (rs.data.code === 1) {
            this.getuserlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleBatchDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let rs = await this.$http.post("/api/user/batchdel", {
            ids: this.selectedList,
          });
          this.$message({
            type: "success",
            message: rs.data.message,
          });

          if (rs.data.code === 1) {
            this.selectedList = [];
            this.getuserlist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleQuery() {
      this.getuserlist();
    },

    async getuserlist() {
      this.isloading = true;
      let rs = await this.$http.post("/api/user/list", {
        name: this.name,
        pageno: this.pageno,
        pagesize: this.pagesize,
      });
      console.log(rs);
      this.datalist = rs.data.list;
      this.total = rs.data.total;
      this.isloading = false;
    },
    handleSelect(select, rows) {
      this.selectedList = [];
      select.forEach((item) => {
        this.selectedList.push(item.id);
      });
    },
    handlePagechange(curPage) {
      this.pageno = curPage;
      this.getuserlist();
    },
    handleAdd() {
      this.showAdd = true;
    },

    handleAddClose(status) {
      this.showAdd = false;
      if (status === "success") {
        this.$message({
          type: "success",
          message: "添加用户成功",
        });
        this.getuserlist();
      }
    },

    handleEditClose(status) {
      this.showEdit = false;
      if (status === "success") {
        this.$message({
          type: "success",
          message: "更新用户成功",
        });
        this.getuserlist();
      }
    },
  },
  created() {
    this.getuserlist();
  },
};
</script>


<style lang="scss" scoped>
.tool-bar {
  margin: 8px auto;
}
.footer {
  background: white;
  padding: 5px;
}
</style>

