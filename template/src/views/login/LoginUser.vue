<template>
  <div class="user-login">
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br /> GoGreen 管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0" :loading="loading">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="username" :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"></i>
                    <el-input placeholder="会员名/邮箱/手机号" v-model="user.username" ></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password" @keyup.native.enter="submitBtn"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class=form-item>
              <el-col>
                <el-form-item>
                  <el-checkbox v-model="checkPassword"  class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">
                登 录
              </el-button>
            </el-row>
          </div>
          <el-row class="tips" v-if="false">
            <a href="/" class="link">
              忘记密码
            </a>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    name: 'login',
    data() {
      return {
        backgroundImage: 'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png',
        user: {
          username: localStorage.userName!=null ? localStorage.userName : null,
          password: localStorage.password != null ? localStorage.password : null,
        },
        checkPassword:localStorage.checkPassword != null?(localStorage.checkPassword == 'true'?true:false):null,
        loading:false,
        redirect:undefined
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }

    },
    methods: {
      rememberMeOrNot(){
        if(this.checkPassword) {
          this.baseUtil.setStore("userName",this.user.username)
          this.baseUtil.setStore("password",this.user.password)
        }else {
          this.baseUtil.getStore("password")
        }
        this.baseUtil.setStore("checkPassword",this.checkPassword)
      },
      submitBtn() {
        this.$refs['form'].validate((valid) => {
           if (valid) {
             this.loading = true;
              this.rememberMeOrNot();
              // this.userLogin()
             this.$store.dispatch('LoginByUsername',this.user).then((res) => {
               this.loading = false;
               this.$router.push({ path: this.redirect || '/' })
             }).catch((error) => {
               console.log('LoginByUsername',error);
               this.$message({ message:  error, type: 'error'});
               this.loading = false;
             })
          }else  {
             return false
           }
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import './login.scss';
  .user-login .el-input__inner{
    border: none !important;
  }
</style>
