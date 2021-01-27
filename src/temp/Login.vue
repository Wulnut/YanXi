<!--
Created by 垃圾桶
Date: 2021-1-27
-->

<!-- 模板结构 -->
<template>
  <!-- 设置登录背景 -->
  <div class="login_container">
    <!-- 设置登录盒子 -->
    <div class="login_box">
      <!-- 设置默认登录头像 -->
      <el-container class="main-container">
        <!-- 侧边 -->
        <el-aside width="66%">
          <div class="aside-content">
            <span>研曦</span><br>
            <span>为你的成功打开一扇窗</span><br>
            <span>是你成功的助推器</span><br>
            <el-button type="primary" id="aside-btn" @click="gotoRegistered">&emsp;注册&emsp;</el-button>
          </div>
        </el-aside>
        <el-container>
          <!-- 中间 -->
          <el-main>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
              <!-- 设置标题 -->
              <h2 class="title">Yan Xi</h2>
              <br>
              <h3 class="title">登录</h3>
              <br>
              <!-- 用户名 -->
              <el-form-item prop="username">
                <!-- v-model双向绑定 -->
                <el-input v-model="loginForm.username" prefix-icon="el-icon-search"
                                                       placeholder="支持手机号/邮箱登录"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password" >
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"
                                                       placeholder="账户密码"></el-input>
              </el-form-item>
              <!-- 按钮区域 -->
              <el-form-item class="Btn">
                <el-button type="primary" @click="login" id="btn1"
                           v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
                <!-- 点击重置按钮出发resetLoginForm函数 -->
                <el-button type="info" @click="resetLoginForm" id="btn2">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <!-- 底部 -->
          <el-footer>
            <div id="foot">Copyright &copy; 2020-2021</div>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<!-- 行为 -->
<script>
export default {
  // https://blog.csdn.net/WWW_share8/article/details/106467036 进度条
  // https://www.shuzhiduo.com/A/MyJxMr2X5n/ 进度条参考
  data() {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: '',
        password: ''
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入手机号/邮箱', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ]
      },
      fullscreenLoading: false
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this)
      // $refs是从打印log里面发现的
      this.$refs.loginFormRef.resetFields();
    },
    // 表单登录预验证
    login() {
      // 通过使用匿名函数，如果只有一个形参可以省略小括号
      // 通过await & async来简化promise操作
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return 0;
        // await只能用于被async修饰的方法中,需要把该匿名函数修饰成异步的async方法
        // 由于返回值中只有data有用，就解构其中的数据获取自己需要的即可
        // post返回值是promise
        // js对象装json JSON.stringify(对象)
        const {data: result} = await this.$http.post('login', JSON.stringify(this.loginForm));
        console.log(result);
        // 判断状态码200为成功,400为失败
        if (result.meta.status !== 200) {
          return this.$message.error('登录失败');
        } else {
          // localStorage和sessionStorage区别，localStorage是持久化的存储
          // 1.将登录成功之后的token，保存到客户端的sessionStorage中
          //   1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2token只应在当前网站访问打开期间生效，所以将token保存在sessionStorage中
          // 2.通过编程式导航跳转到后台主页，路由地址是/home
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
            this.$message.success('登录成功');
            this.$router.push("/home");
          }, 2000);
        }
      });
    },
    // 注册
    gotoRegistered() {
      setTimeout(() => {
        this.$router.push({
          path: "/register"
        });
      }, 100);
    }
  },
  name: "Login"
}
</script>

<!-- 样式 -->
<style lang="less" scoped>
.login_container {
  background-color: #cadae7;
  height: 100%;
}

.title {
  text-align: center;
}
// 登录卡
.login_box {
  width: 75%;
  height: 95%;

  border-radius: 3px;
  // 设置绝对定位，目的是为了能在页面上位移
  position: absolute;
  left: 50%;
  top: 50%;
  // 进行位移，在横轴上移动-50%在纵轴上移动-50%
  transform: translate(-50%, -50%);

  .main-container {

    height: 100%;

    .el-aside {
      // 背景图片
      background-image:
          url("../assets/images/login.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      // 设置圆角
      -webkit-border-radius: 10px 0 0 10px;
      -moz-border-radius: 10px 0 0 10px;
      border-radius: 10px 0 0 10px;
    }

    .el-main {
      background-color: #eeeeee;
      // 设置圆角
      -webkit-border-radius: 0 10px 0 0;
      -moz-border-radius: 0 10px 0 0;
      border-radius: 0 10px 0 0;
    }

    .el-footer {
      // 设置圆角
      -webkit-border-radius: 0 0 10px 0;
      -moz-border-radius: 0 0 10px 0;
      border-radius: 0 0 10px 0;
      background-color: #fafafa;
    }
  }
}

.el-input {
  border-radius: 10px;
}

#foot{
  color: #578ff0;
  text-align: center;
  padding-top: 20px;
}

.Btn {
  // flex弹性横模型
  display: flex;
  // 尾部对齐
  justify-content: flex-end;
}

.aside-content {
  color: #eeeeee;
  margin-top: 60%;
  margin-left: 10%;

  span {
    line-height: 200%;
  }

  #aside-btn {
    margin-top: 20px;
  }
}


</style>
