<!--
Created by 垃圾桶
Date: 2021-1-27
-->
<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form class="sign-in-form">
          <p class="title">登 录</p>
          <!-- element-ui 使用 -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <!-- v-model双向绑定 -->
              <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-search"
                placeholder="支持手机号/邮箱登录"
              />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                prefix-icon="iconfont icon-3702mima"
                type="password"
                placeholder="账户密码"
              />
            </el-form-item>
            <!-- 按钮区域 -->
          </el-form>
          <!-- element-ui 使用 -->
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            type="primary"
            class="btn solid"
            @click="login"
          >登 录</el-button>
        </form>
        <form class="sign-up-form">
          <p class="title">注册</p>
          <el-form
            ref="ruleForm2"
            :model="ruleForm2"
            status-icon
            :rules="rules2"
            label-width="0"
          >
            <el-form-item prop="name">
              <el-input v-model="ruleForm2.name" auto-complete="off" placeholder="请输入姓名" style="width: 300px" />
            </el-form-item>
            <!--              <el-form-item prop="tel">-->
            <!--                <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号" style="width: 300px"></el-input>-->
            <!--              </el-form-item>-->
            <el-form-item prop="mail">
              <el-input v-model="ruleForm2.mail" auto-complete="off" placeholder="请输入邮箱" style="width: 300px" />
            </el-form-item>
            <el-form-item prop="smscode" class="code">
              <el-input v-model="ruleForm2.smscode" placeholder="邮箱验证码" />
              <el-button type="primary" :disabled="isDisabled" @click="sendCode('ruleForm2')">{{ buttonText }}</el-button>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                v-model="ruleForm2.pass"
                type="password"
                auto-complete="off"
                placeholder="8-20位字符在数字、小写、大写字母"
                style="width: 300px"
              />
              <PasswordStrength v-model="ruleForm2.pass" style="padding-top: 10px;" />
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                v-model="ruleForm2.checkPass"
                type="password"
                auto-complete="off"
                placeholder="确认密码"
                style="width: 300px"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" class="btn" @click="submitForm('ruleForm2')">注册</el-button>
              <p class="login" />
            </el-form-item>
          </el-form>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>第 一 次 来 到 这 ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <!-- element-ui 使用 -->
          <el-button id="sign-up-btn" type="primary" round class="btn transparent" @click="scan_click">注 册</el-button>
        </div>
        <img src="../../assets/images/log.svg" class="image" alt="">
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已 经 是 我 们 中 的 一 员 ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <el-button id="sign-in-btn" type="primary" round class="btn transparent" @click="scan_click">登 录</el-button>
        </div>
        <img src="../../assets/images/register.svg" class="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import PasswordStrength from '@/template/PasswordStrength'

export default {
  name: 'Home',
  // 注册组件
  components: { PasswordStrength },
  // 注册组件
  data() {
    // <!--验证手机号是否合法-->
    // let checkTel = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入手机号码'))
    //   } else if (!this.checkMobile(value)) {
    //     callback(new Error('请输入正确格式的手机号码'))
    //   } else {
    //     callback()
    //   }
    // }
    // <!--检验邮箱是否合法-->
    const checkMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
        return false
      } else if (!this.checkEMail(value)) {
        callback(new Error('请输入正确格式的邮箱'))
      } else {
        callback()
      }
    }
    //  <!--验证码是否为空-->
    const checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱验证码'))
      } else {
        callback()
      }
    }
    // <!--姓名是否为空-->
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
          { required: true, message: '请输入手机号/邮箱', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      fullscreenLoading: false,
      // 注册
      ruleForm2: {
        mail: '',
        smscode: '',
        pass: '',
        name: '',
        checkPass: '',
        tel: ''
      },
      rules2: {
        mail: [{ validator: checkMail, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        // tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
        name: [{ validator: checkName, trigger: 'change' }]
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    scan_click() {
      const sign_in_btn = document.querySelector('#sign-in-btn')
      const sign_up_btn = document.querySelector('#sign-up-btn')
      const container = document.querySelector('.container')

      sign_up_btn.addEventListener('click', () => {
        container.classList.add('sign-up-mode')
      })

      sign_in_btn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode')
      })
    },
    // <!--发送验证码-->
    async sendCode() {
      const mail = this.ruleForm2.mail
      if (this.checkEMail(mail)) {
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false
          const params = new URLSearchParams()
          params.append('email', mail)
          const { data: result } = await this.$http.post('/user/genEmailAuthCode', params)
          console.log(result)
          if (result.status === 'error') {
            return this.$message.error('邮箱错误')
          }
          const timer = setInterval(() => {
            time--
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer)
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true
            }
          }, 1000)
        }
      } else {
        this.$message.error('请输入邮箱')
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (!valid) return 0
        const params = {
          'email': this.ruleForm2.mail,
          'authCode': this.ruleForm2.smscode,
          'password': this.ruleForm2.pass,
          'name': this.ruleForm2.name
        }
        const { data: result } = await this.$http.post('/user/register/emailUser', JSON.stringify(params))
        console.log(result)
        if (result.status === 'error') {
          return this.$message.error(result.msg)
        } else {
          setTimeout(() => {
            this.$message.success('注册成功')
            document.getElementById('sign-in-btn').click()
          }, 400)
        }
      })
    },
    // 登录
    login() {
      // 通过使用匿名函数，如果只有一个形参可以省略小括号
      // 通过await & async来简化promise操作
      this.$refs.loginFormRef.validate(async(valid) => {
        console.log(valid)
        if (!valid) return 0
        // await只能用于被async修饰的方法中,需要把该匿名函数修饰成异步的async方法
        // 由于返回值中只有data有用，就解构其中的数据获取自己需要的即可
        // post返回值是promise
        // js对象装json JSON.stringify(对象)
        const params = new URLSearchParams(this.loginForm)
        const { data: result } = await this.$http.post('/user/login', params)
        if (result.status === 'error') {
          return this.$message.error('登录失败')
        } else {
          // localStorage和sessionStorage区别，localStorage是持久化的存储
          // 1.将登录成功之后的token，保存到客户端的sessionStorage中
          //   1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2token只应在当前网站访问打开期间生效，所以将token保存在sessionStorage中
          // 2.通过编程式导航跳转到后台主页，路由地址是/home
          this.fullscreenLoading = true
          setTimeout(() => {
            this.fullscreenLoading = false
            this.$message.success('登录成功')
            // this.$router.push("/home");
          }, 2000)
        }
      })
    },
    // 验证手机号
    checkMobile(str) {
      const re = /^1[3456789]\d{9}$/
      return re.test(str)
    },
    checkEMail(str) {
      // 正则表达式参考 https://www.zhihu.com/question/20614859/answer/15640762
      const re = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      return re.test(str)
    }
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 3;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>

<style scoped>
.login {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  color: #1ab2ff;
  cursor: pointer;
  text-align: left;
  text-indent: 8px;
  width: 160px;
}
.login:hover {
  color: #2c2fd6;
}

.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}

.el-icon-check:before {
  content: "\e6da";
}

</style>
