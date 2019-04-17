<template>
    <section>
        <sticky :className="'sub-navbar draft'">
            <el-button v-loading="isSubmitLoading" style="margin-left: 10px;" type="success" @click="submit">保存</el-button>
        </sticky>
        <el-form :model="userForm" ref="userForm" :rules="rules" label-width="125px" v-loading="loading"
                 element-loading-text="如心动则人妄动，伤其身痛其骨，于是体会到世间诸般痛苦">
            <el-row class="createPost-main-container">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="userForm.username" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEdit" label="密码:" prop="password" >
                    <el-input v-model="userForm.password" type="password" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEdit" label="确认密码:" prop="confirmpsd" >
                    <el-input v-model="userForm.confirmpsd" type="password" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="name" >
                    <el-input v-model="userForm.name" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="userForm.phone" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="是否启用:">
                    <el-select v-model="userForm.isEnable" style="width:300px;">
                        <el-option :value="1" label="启用"></el-option>
                        <el-option :value="0" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="roleIds" multiple placeholder="请选择" style="width:300px;">
                        <el-option
                                v-for="item in roles"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="userForm.remark"
                              style="width:500px;margin-bottom:0px;"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
    </section>
</template>
<script>
    import Sticky from '@/components/Sticky' // 粘性header组件
    import {saveWebUser, getWebUserDetail, getAllRole} from "../../api/auth";
    import {validateConfirm,require,pattern} from '../../utils/rules';
    export default {
        name: "webUserDetail",
        components: {Sticky},
        data() {
            var validateConfirmPassword = (rule, value, callback) => validateConfirm(rule,value,callback,this.userForm.password,['请再次填写确认密码','两次密码不一致']);
            return {
                pageTitle: '新增用户',
                loading: false,
                isSubmitLoading: false,
                userForm: {
                    username: null,
                    name: "",
                    phone: "",
                    isEnable: 1,
                    remark: "",
                    password: null,
                    confirmpsd: null,
                },
                isEdit: false,
                roles: [],
                roleIds: null,
                menuData: [],
                menuKeys: [],
                menuProps: {
                    children: 'menuList',
                    label: 'name'
                },
                rules:{
                    username:[require("请填写用户名"),pattern('^[a-zA-Z0-9\u4e00-\u9fa5]{3,40}$', '用户名为3-12位字母,数字或汉字')],
                    password:[require("请输入密码"),pattern('^[a-zA-Z0-9]{6,12}$','请输入6到12位字母或数字')],
                    confirmpsd:[{validator:validateConfirmPassword,trigger:'blur'}],
                    name:[require("请填写姓名"),pattern('^[a-zA-Z\u4e00-\u9fa5]{2,40}$','用户名为2-12位字母或汉字')]
                },
            }
        },
        methods: {
            submit() {
                this.$refs['userForm'].validate(async function (success) {
                    if (success) {
                        let resp = await saveWebUser({
                            adminUser: this.userForm,
                            password: this.userForm.password,
                            roleIds: this.roleIds
                        })
                        console.log('[保存用户结果]', resp)
                        if (this.qUtil.validResp(resp)) {
                            this.$message({message: resp.msg, type: 'success'});
                            this.$store.dispatch('tagsView/delCurrentViews', {
                                view: this.$route,
                                $router: this.$router
                            })
                        }
                    }
                }.bind(this))
            },
            async loadRole() {
                let resp = await getAllRole();
                if (resp.data != null) {
                    this.roles = this.baseUtil.modelCopy(resp.data.dataList)
                }
            },
            async loadModel() {
                let id = this.$route.query.id || 0
                if (id > 0) {
                    let resp = await getWebUserDetail({id: id})
                    if (this.qUtil.validResp(resp)) {
                        this.pageTitle = "编辑用户"
                        this.isEdit = true
                        if (resp.data.adminUser != null) {
                            this.roleIds = this.baseUtil.modelCopy(resp.data.adminUser.roleIds)
                        }
                        this.userForm = this.baseUtil.modelCopy(resp.data.adminUser)
                    }
                } else {
                    this.isEdit = false
                }
            },
        },
        mounted() {
            console.log('[rules]',this.rules)
            this.loadRole()
            this.loadModel()
        }
    }
</script>
