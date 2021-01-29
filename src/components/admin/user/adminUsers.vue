<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin-home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
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
          <template>
            <!-- 修改按钮 -->
            <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" />
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" />
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <!-- 主题区域 -->
      <el-form ref="addFormRef" :model="addUserForm" :rules="addFormRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile" />
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
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
        username: ''
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
      }
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
    handleSizeChange(newSize) {
      console.log(newSize)
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
