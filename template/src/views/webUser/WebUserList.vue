<template>
  <div class="app-container web-user-list">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="params.key" placeholder="请输入用户名/姓名/联系方式"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="params.isEnable" placeholder="请选择用户状态" @change="search">
            <el-option value="" label="请选择用户状态"></el-option>
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline"  @click="addUser" >新增用户</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table  :data="webUserList">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <!--<el-table-column prop="sex" label="性别">-->
        <!--<template slot-scope="scope">-->
          <!--<p v-if="scope.row.sex == 'MALE'">男</p>-->
          <!--<p v-else-if="scope.row.sex == 'FEMALE'">女</p>-->
          <!--<p v-else-if="scope.row.sex == 'UNKNOWN'">未知</p>-->
          <!--<p v-else></p>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="birthDay" label="生日"></el-table-column>-->
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <!--<el-table-column prop="qrCode" label="二维码"></el-table-column>-->
      <!--<el-table-column prop="headImgUrl" label="头像">-->
        <!--<template slot-scope="scope" v-if="scope.row.headImgUrl!=null && scope.row.headImgUrl!=''">-->
          <!--<img :src="scope.row.headImgUrl" width="60px" height="60px"/>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <!--<el-table-column prop="disableStatus" label="禁用状态">-->
      <!--<template slot-scope="scope">-->
      <!--<p v-if="scope.row.disableStatus == 'ENABLE'" class="p-green">启用</p>-->
      <!--<p v-else-if="scope.row.disableStatus == 'DISABLE'" class="p-red">禁用</p>-->
      <!--<p v-else></p>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" min-width="150" fixed="right" align="center">
      <template slot-scope="scope">
        <el-button type="success" @click="handleEdit(scope.$index, scope.row)" size="mini" >编辑</el-button>
        <!--<disable  v-if="scope.row.isEnable == '0'" name="启用"  :rowId="scope.row.id.toString()" @emit="editStatus"></disable>-->
        <!--<disable  v-else name="禁用"  :rowId="scope.row.id.toString()" @emit="editStatus"></disable>-->
        <disable   name="删除"  :rowId="scope.row.id.toString()" @emit="editDeleted"></disable>
        <disable   name="重置密码"  :rowId="scope.row.id.toString()" @emit="generatePassword"></disable>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="pageSizes"
      :page-size="params.pageSize"
      layout=" sizes, prev, pager, next,total"
      :total="total">
    </el-pagination>

    <!--重置密码对话框-->
    <el-dialog title="重置密码" :visible.sync="visible" center>
      <el-form  label-width="160px">
      <el-form-item label="您重置的密码为:" >
        <el-input v-model="respPassword"  style="width:300px;" disabled></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="handleCopy(respPassword,$event)">复制</el-button>
        <el-button type="lightBrown" @click="visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getWebUserList,generatePassword,deleteUser,enableUser} from "../../api/api";
  import Disable from "@/components/Disable";
  import clip from '@/utils/clipboard'

  export default {
    name:"webUser",
    components:{Disable},
    data(){
        return{
            webUserList:[],
            params: {
              availableStatus:null,
              isEnable:null,
              key:null,
              page: 1, pageSize: 10,
              order: null, sort: null
            },
            pageSizes:[10,20,30],
            total:0,
            respPassword:null,
            visible:false,
        }
    },
    methods:{
      handleCurrentChange(val){
        this.params.page = val;
        this.init();
      },
      handleSizeChange(val){
        this.params.pageSize = val;
        this.init();
      },
      handleEdit(index,row){
        this.$router.push({name: 'WebUserDetail',query:{id:row.id}})
      },
      async editDeleted(id,name) {
        if(name == '删除') {
          let data = {
            id:id,
          }
         let resp = await deleteUser(data)
         if(this.qUtil.validResp(resp)){
           this.$message({message: '删除成功!', type: 'success'});
         }else {
            this.$message({message: '删除失败!', type: 'warning'});
         }
         this.init();
        }
      },
      async generatePassword(id,name) {
        if(name == '重置密码') {
          this.visible = true
           let resp = await generatePassword({id:id})
          if(this.qUtil.validResp(resp)){
           this.respPassword = this.baseUtil.modelCopy(resp.data.password)
          }else this.$message({ message: resp.msg, type: 'warning' });
        }
      },
      handleCopy(text, event) {clip(text, event)},
      //禁用 启用
      async editStatus(id,name){
        if(name == "禁用"){   //禁用
          let data={
            id:id,
            isEnable:0,
          }
          let resp = await enableUser(data);
          if(this.qUtil.validResp(resp)){
            this.$message({
              message: resp.msg,
              type: 'success'
            });
          }else{
            this.$message({
              message: resp.msg,
              type: 'warning'
            });
          }
        }else if(name == "启用"){   //启用
          let data={
            id:id,
            isEnable:1,
          }
          let resp = await enableUser(data);
          if(this.qUtil.validResp(resp)){
            this.$message({
              message: resp.msg,
              type: 'success'
            });
          }else{
            this.$message({
              message: resp.msg,
              type: 'warning'
            });
          }
        }
        this.init();
      },

      //搜索
      search(){
        this.params.page = 1;
        this.init();
      },
      addUser(){
        this.$router.push({name: 'WebUserDetail'})
      },
      async init(){
        let resp = await getWebUserList(this.params);
          console.log('[测试接口]',resp);
          if(this.qUtil.validResp(resp)){
            this.webUserList = resp.data.dataList;
            this.total = resp.data.total;
          }
        // getWebUserList(data).then(resp => {
        //   this.webUserList = resp.data.dataList;
        //   this.total = resp.data.pageCount;
        // })
      }
    },
    mounted(){
      this.init();
    }
  }

</script>
<style>
  .web-user-list .el-table,.web-user-list .el-table th{
    text-align: center;
  }
</style>
