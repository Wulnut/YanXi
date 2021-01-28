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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">
            添加用户
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        pageNum: '',
        search: '',
        roleId: ''
      },
      // 接收数据的返回值
      result: {
        userList: [],
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
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const params = new URLSearchParams(this.queryInfo)
      const data = await this.$http.post('/admin/user/listPage', params)
      if (data === '') return this.$message.error('获取用户列表失败！')
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        this.result[index] = data[index]
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
