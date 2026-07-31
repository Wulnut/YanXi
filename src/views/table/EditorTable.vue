<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="7">
        <!-- 搜索与添加区域 -->
        <el-input v-model="queryInfo.search" placeholder="请输入内容" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList" />
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible=true">
          添加用户
        </el-button>
      </el-col>
    </el-row>
    <!-- 用户列表区间 -->
    <el-table :data="result.list" border stripe>
      <el-table-column type="index" label="#" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="性别" prop="gender" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag effect="dark">
            {{ checkRole (scope.row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.uid)" />
          </el-tooltip>
          <!-- 删除按钮 -->
          <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)" />
          </el-tooltip>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRole(scope.row.uid)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="result.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="result.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="result.total"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
export default {
  name: 'EditorTable',
  data() {
    // 自定义邮箱规则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        pageNum: '',
        search: '',
        roleId: '-1'
      },
      // 接收数据的返回值
      result: {
        total: 0,
        list: [{
          uid: 0,
          account: '',
          name: '',
          gender: '',
          schoolName: '',
          departmentName: '',
          gradeName: '',
          age: '',
          birthday: '',
          phone: '',
          address: '',
          role: ''
        }],
        pageNum: 0, // 当前页"
        pageSize: 0, // 每页的数量"
        size: 0, // 当前页的数量"
        startRow: 0, // 当前页面第一个元素在数据库中的行号"
        endRow: 0, // 当前页面最后一个元素在数据库中的行号"
        pages: 0, // 总页数"
        prePage: 0, // 前一页"
        nextPage: 0, // 下一页"
        isFirstPage: false, // 是否为第一页"
        isLastPage: false, // 是否为最后一页"
        hasPreviousPage: false, // 是否有前一页"
        hasNextPage: false, // 是否有下一页"
        navigatePages: 0, // 导航页码数"
        navigatePageNums: [], // 所有导航页号"
        navigateFirstPage: 0, // 导航条上的第一页"
        navigateLastPage: 0 // 导航条上的最后一页"
      },
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户对象的表单数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名的长度在2～10个字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editUserForm: {},
      // 编辑用户表单验证
      editUserFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 分配角色对话框
      setRoleDialogVisible: false,
      // 当前需要被分配角色的用户
      userInfo: {},
      // 所有角色数据列表
      rolesList: [],
      // 已选中的角色Id值
      selectRoleId: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const params = new URLSearchParams(this.queryInfo)
      const { data: data } = await this.$http.post('/admin/user/listPage', params)
      if (data === '') return this.$message.error('获取用户列表失败！')
      this.result = data
    },
    // 监听pageSize改变情况
    // handleSizeChange(newSize) {
    //   this.result.pageSize = newSize
    //   this.getUserList()
    // },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },
    // 判断角色
    checkRole(role) {
      if (role === '1') {
        return '老师'
      } else if (role === '2') {
        return '学生'
      } else {
        return '管理员'
      }
    },
    // 监听用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮添加用户
    addUser() {
      // 提交请求前，表单预验证
      this.$refs.addUserFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addUserForm)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        await this.getUserList()
      })
    },
    // 编辑用户信息
    async showEditDialog(uid) {
      // const { data: res } = await this.$http.get('/admin/user/listPage' + uid)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
      // this.editUserForm = res.data
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields()
    },
    // 修改用户信息
    editUserInfo() {
      // 提交请求前，表单预验证
      this.$refs.editUserFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败
        if (!valid) return
        const { data: res } = await this.$http.put(
          'users/' + this.editUserForm.id,
          {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          }
        )
        if (res.meta.status !== 200) {
          this.$message.error('更新用户信息失败！')
        }
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新用户信息成功！')
        await this.getUserList()
      })
    },
    // 删除用户
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // const { data: res } = await this.$http.delete('users/' + id)
      // if (res.meta.status !== 200) return this.$message.error('删除用户失败！')
      // this.$message.success('删除用户成功！')
      await this.getUserList()
    },
    // 展示分配角色的对话框
    async showSetRole(role) {
      // this.userInfo = this.result.list
      // 展示对话框之前，获取所有角色列表
      // const { data: res } = await this.$http.get('roles')
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取角色列表失败！')
      // }
      this.userInfo = this.result.list[this.binary_search(this.result.list, role)]
      // this.rolesList =
      this.setRoleDialogVisible = true
    },
    binary_search(arr, key) {
      let low = 0
      let high = arr.length - 1
      while (low <= high) {
        const mid = parseInt((high + low) >> 1)
        if (key === arr[mid].uid) {
          return mid
        } else if (key > arr[mid].uid) {
          low = mid + 1
        } else if (key < arr[mid].uid) {
          high = mid - 1
        } else {
          return 0
        }
      }
    },
    // 分配角色
    async saveRoleInfo() {
      // if (!this.selectRoleId) {
      //   return this.$message.error('请选择要分配的角色')
      // }
      // const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectRoleId })
      // if (res.meta.status !== 200) {
      //   return this.$message.error('更新用户角色失败！')
      // }
      // this.$message.success('更新角色成功！')
      // await this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 分配角色对话框关闭事件
    setRoleDialogClosed() {
      this.selectRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>

<style scoped>

</style>
