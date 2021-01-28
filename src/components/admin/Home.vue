<template>
  <el-container class="home-container">
    <!-- 侧边栏-->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <!-- 侧边栏菜单区域 -->
      <el-menu
        background-color="#304155"
        text-color="#fff"
        active-text-color="#2c73cd"
        :unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
        :default-active="activePath"
      >
        <div class="toggle-button" @click="toggleCollapse"> ||| </div>
        <!-- 一级菜单 -->
        <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-location" />
            <!-- 文本 -->
            <span>{{ item.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            @click="saveNavState(subItem.path)"
          >
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu" />
              <!-- 文本 -->
              <span>{{ subItem.authName }}</span>
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
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!--主题区域-->
      <el-main>
        <!-- 路由占位符号 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 生命周期函数,即进入网站瞬间，创建的值
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    getMenuList() {
      this.menuList = [{
        'id': 100,
        'authName': '用户管理',
        'path': 'null',
        'children': [{
          'id': 101,
          'authName': '用户列表',
          'path': '/userList'
        }]
      }]
    },
    // 点解按钮切换菜单折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    logout() {
      // 清空token
      // window.sessionStorage.clear()
      this.$router.push('/admin-login')
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
  .el-menu {
    border-right: none;
  }
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
    padding-left: 20px;
    width:50px;
    height:60px
  }
}

.el-main {
  background-color: #eff0f4;
}

.toggle-button {
  background-color: #304155;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.toggle-button:hover {
  background-color: #4A5064;
}
</style>
