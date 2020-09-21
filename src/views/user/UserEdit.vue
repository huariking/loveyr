<template>
  <el-dialog title="编辑" @close="$emit('close')" :rules="rules" :visible.sync="dialogFormVisible">
    <el-form :model="user" ref="userForm">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="user.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="user.sex" :label="0">男</el-radio>
        <el-radio v-model="user.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input-number v-model="user.age"  :min="1" :max="100" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="user.address" type="textarea" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props:['item'],
  data() {
    return {
      formLabelWidth: "80px",
      dialogFormVisible: true,
      user: {
        name: "",
        sex: 1,
        age: 1,
        birthday: "",
        address: ""
      },
      rules: [
        {
          name: [
            {
              required: true,
              message: "用户名不能为空",
              trigger: "blur"
            },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur"
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          let rs = await this.$http.post('/api/user/update',{...this.user});
          console.log('add:',rs)
          if(rs.data.code ===1){
            this.$emit('close','success')
          }
           this.dialogFormVisible = false
        }
      })

     
    }
  },
  mounted(){
    this.user =Object.assign({},this.item)
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  text-align: left;
}
.el-form-item /deep/ .el-form-item__label {
  text-align: center;
}
</style>


