<!--
Created by 垃圾桶
Date: 2021-1-27
-->

<!-- 模板 -->
<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">注册</p>
        <el-form
          ref="ruleForm2"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="tel">
            <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号" />
          </el-form-item>
          <!--          <el-form-item prop="mail">-->
          <!--            <el-input v-model="ruleForm2.mail" auto-complete="off" placeholder="请输入邮箱"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item prop="smscode" class="code">
            <el-input v-model="ruleForm2.smscode" placeholder="邮箱验证码" />
            <el-button type="primary" :disabled="isDisabled" @click="sendCode">{{ buttonText }}</el-button>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input v-model="ruleForm2.pass" type="password" auto-complete="off" placeholder="输入密码" />
            <el-form-item>
              <PasswordStrength v-model="ruleForm2.pass" style="padding-top: 10px;" />
            </el-form-item>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" type="password" auto-complete="off" placeholder="确认密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm2')">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<!-- 行为 -->
<script>
// eslint-disable-next-line no-unused-vars
import PasswordStrength from '@/template/PasswordStrength'

export default {
  name: 'Register',
  // 注册组件
  components: { PasswordStrength },
  data() {
    // <!--验证手机号是否合法-->
    const checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('请输入正确格式的手机号码'))
      } else {
        callback()
      }
    }
    // <!--检验邮箱是否合法-->
    const checkMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
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
      ruleForm2: {
        pass: '',
        checkPass: '',
        tel: '',
        smscode: '',
        mail: ''
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'change' }],
        smscode: [{ validator: checkSmscode, trigger: 'change' }],
        mail: [{ validator: checkMail, trigger: 'change' }]
      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },
  methods: {
    // <!--发送验证码-->
    sendCode() {
      const mail = this.ruleForm2.mail
      if (this.checkEMail(mail)) {
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false
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
      }
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 登录发送请求,需要判断
          // const result = await this.$http.post('', this.ruleForm2);
          setTimeout(() => {
            this.$message.success('注册成')
            // 延迟跳转
            // this.$router.push({
            //   name:"index"
            // });
          }, 400)
        } else {
          this.$message.error('注册失败')
          return false
        }
      })
    },
    // <!--进入登录页-->
    gotoLogin() {
      setTimeout(() => {
        this.$router.push({
          path: '/login'
        })
      }, 100)
    },
    // 验证手机号
    checkMobile(str) {
      const re = /^1\d{10}$/
      return re.test(str)
    },
    checkEMail(str) {
      // 正则表达式参考 https://www.zhihu.com/question/20614859/answer/15640762
      const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$/
      return re.test(str)
    }
  }
}
</script>

<!-- 样式 -->
<style  scoped>
/*//css中“>”是:*/
/*//css3特有的选择器，A>B 表示选择A元素的所有子B元素。*/
/*//与A B的区别在于，A B选择所有后代元素，而A>B只选择一代。*/
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
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
.el-button--primary:focus {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

.el-icon-check:before {
  content: "\e6da";
}
</style>

