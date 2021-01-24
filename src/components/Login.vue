<!-- 模板结构 -->
<template>
  <!-- 设置登录背景 -->
  <div class="login_container">
    <!-- 设置登录盒子 -->
    <div class="login_box">
      <!-- 设置默认登录头像 -->
      <el-container class="main-container">
        <el-aside width="66%"></el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<!-- 行为 -->
<script>
export default {
  data() {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: 'lyz',
        password: '123'
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        // 验证密码是否合法
        password: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ]
      }
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
      // // 通过使用匿名函数，如果只有一个形参可以省略小括号
      // // 通过await & async来简化promise操作
      // this.$refs.loginFormRef.validate(async (valid) => {
      //   console.log(valid);
      //   if (!valid) return 0;
      //   // await只能用于被async修饰的方法中,需要把该匿名函数修饰成异步的async方法
      //   // 由于返回值中只有data有用，就解构其中的数据获取自己需要的即可
      //   // post返回值是promise
      //   const {data: result} = await this.$http.post('login', this.loginForm);
      //   console.log(result);
      //   // 判断状态码200为成功,400为失败
      //   if (result.meta.status !== 200) {
      //     return this.$message.error('登录失败');
      //   } else {
      //     // localStorage和sessionStorage区别，localStorage是持久化的存储
      //     // 1.将登录成功之后的token，保存到客户端的sessionStorage中
      //     //   1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
      //     //   1.2token只应在当前网站访问打开期间生效，所以将token保存在sessionStorage中
      //     // 2.通过编程式导航跳转到后台主页，路由地址是/home
      //     this.$message.success('登录成功');
      //     window.sessionStorage.setItem('token', result.meta.token);
      //     await this.$router.push("/home");
      //   }
      // });
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

.login_box {
  width: 55%;
  height: 75%;
  //background-color: #fff;
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
      background-image:
          url("../assets/images/login.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      border-radius: 10px 0 0 10px;
    }

    .el-main {
      background-color: #eeeeee;
      border-radius: 0 10px 0 0;
    }

    .el-footer {
      border-radius: 0 0 10px 0;
      background-color: #fafafa;
    }
  }
}

</style>