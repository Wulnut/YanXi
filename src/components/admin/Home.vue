<template>
  <el-container class="home-container">
    <!-- 侧边栏-->
    <el-aside width="200px">
      <!-- 侧边栏菜单区域 -->
      <el-menu
        background-color="#304155"
        text-color="#fff"
        active-text-color="#2c73cd"
        unique-opened
      >
        <!-- 一级菜单 -->
        <el-submenu index="1">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-location" />
            <!-- 文本 -->
            <span>导航一</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="1-4-1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu" />
              <!-- 文本 -->
              <span>导航二</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <!-- 一级菜单 -->
        <el-submenu index="1">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-location" />
            <!-- 文本 -->
            <span>导航一</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="1-4-1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu" />
              <!-- 文本 -->
              <span>导航二</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <!-- 一级菜单 -->
        <el-submenu index="1">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-location" />
            <!-- 文本 -->
            <span>导航一</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item index="1-4-1">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu" />
              <!-- 文本 -->
              <span>导航二</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!--头部区域-->
      <el-header>
        <div>
          <img src="../../assets/images/panda.png" alt="图片">
          <span>研 曦 云 上 后 台</span>
        </div>
      </el-header>
      <!--主题区域-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      const { data: result } = await this.$http.post('/admin/user/listPage')
      console.log(result)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #304155;
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width:50px;
    height:60px
  }
}
.el-main {
  background-color: #eff0f4;
}
</style>
