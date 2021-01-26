
<template>
  <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form class="sign-in-form">
            <p class="title">登 录</p>
            <!-- element-ui 使用 -->
            <el-form ref="loginFormRef"  label-width="0px" class="login_form">
              <!-- 用户名 -->
              <el-form-item prop="username">
                <!-- v-model双向绑定 -->
                <el-input prefix-icon="el-icon-search"
                          placeholder="支持手机号/邮箱登录"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password" >
                <el-input  prefix-icon="iconfont icon-3702mima" type="password"
                          placeholder="账户密码"></el-input>
              </el-form-item>
              <!-- 按钮区域 -->
            </el-form>
            <!-- element-ui 使用 -->
            <el-button type="primary" class="btn solid">登 录</el-button>
          </form>
          <form class="sign-up-form">
            <p class="title">注册</p>
            <el-form
                :model="ruleForm2"
                status-icon
                :rules="rules2"
                ref="ruleForm2"
                label-width="0">
              <el-form-item prop="name">
                <el-input v-model="ruleForm2.name" auto-complete="off" placeholder="请输入姓名" style="width: 300px"></el-input>
              </el-form-item>
<!--              <el-form-item prop="tel">-->
<!--                <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号" style="width: 300px"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item prop="mail">
                <el-input v-model="ruleForm2.mail" auto-complete="off" placeholder="请输入邮箱" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item prop="smscode" class="code">
                <el-input v-model="ruleForm2.smscode" placeholder="邮箱验证码"></el-input>
                <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"
                          placeholder="8-20位字符在数字、小写、大写字母" style="width: 300px"></el-input>
                <PasswordStrength v-model="ruleForm2.pass" style="padding-top: 10px;"></PasswordStrength>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"
                          placeholder="确认密码" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%;" class="btn">注册</el-button>
                <p class="login"></p>
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
            <el-button type="primary" round @click="scan_click" id="sign-up-btn" class="btn transparent">注 册</el-button>
          </div>
          <img src="../assets/images/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>已 经 是 我 们 中 的 一 员 ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <el-button type="primary" round id="sign-in-btn" class="btn transparent">登 录</el-button>
          </div>
          <img src="../assets/images/register.svg" class="image" alt="" />
        </div>
      </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import PasswordStrength from "@/components/PasswordStrength";

export default {
  // 注册组件
  data() {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('请输入正确格式的手机号码'))
      } else {
        callback()
      }
    }
    // <!--检验邮箱是否合法-->
    let checkMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!this.checkEMail(value)) {
        callback(new Error('请输入正确格式的邮箱'))
      } else {
        callback()
      }
    }
    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱验证码'))
      } else {
        callback()
      }
    }
    // <!--姓名是否为空-->
    let checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        tel: "",
        smscode: "",
        mail: "",
        name: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
        mail: [{validator: checkMail, trigger: 'change'}],
        name: [{validator: checkName, trigger: 'change'}]
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    scan_click() {
      const sign_in_btn = document.querySelector("#sign-in-btn");
      const sign_up_btn = document.querySelector("#sign-up-btn");
      const container = document.querySelector(".container");

      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    },
    // <!--发送验证码-->
    sendCode () {
      let mail = this.ruleForm2.mail
      if (this.checkEMail(mail)) {
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 登录发送请求,需要判断
          // const result = await this.$http.post('', JSON.stringify(this.ruleForm2));
          setTimeout(() => {
            this.$message.success('注册成');
            // 延迟跳转
            // this.$router.push({
            //   name:"index"
            // });
          }, 400);
        } else {
          this.$message.error('注册失败');
          return false;
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      setTimeout(() => {
        this.$router.push({
          path: "/login"
        });
      }, 100);
    },
    // 验证手机号
    checkMobile(str) {
      let re = /^1[3456789]\d{9}$/
      return re.test(str);
    },
    checkEMail(str) {
      // 正则表达式参考 https://www.zhihu.com/question/20614859/answer/15640762
      let re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$/
      return re.test(str);
    }
  },
  // 注册组件
  components:{PasswordStrength},
  name: 'Home'
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
