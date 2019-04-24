<template>
  <div class="app-container product-list">
    <el-form class="mdtop">
      <el-row :gutter="20">
        <el-col :span="5">
          <md-input v-model="params.key" icon="search" name="title" placeholder="请输入角色名称">角色名称</md-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="params.availableStatus" placeholder="请选择角色状态" @change="search">
            <el-option value="" label="请选择角色状态"></el-option>
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" v-waves @click="search">搜索</el-button>
          <el-button type="success" icon="el-icon-circle-plus-outline" @click="addRole">新增角色</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table  :data="roleList" height="100px" v-el-height-adaptive-table="{bottomOffset: 55}">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="角色名称" :min-width="100"  align="center"></el-table-column>
      <el-table-column prop="availableStatus" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.availableStatus == 1">启用</span> <!-- template中 必须用span，不用p标签，-->
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" ></el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.$index, scope.row)" size="mini">编辑</el-button>
          <disable type="danger" name="删除" :rowId="scope.row.id.toString()" @emit="handleDelete" ></disable>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="params.page" :limit.sync="params.pageSize" @pagination="init"></pagination>
  </div>
</template>
<script>
  import {getRoleList,deleteRole} from "../../api/auth";
  import {fmMoney,fmDate} from "../../utils";
  import Disable from "@/components/Disable";
  import Pagination from '@/components/Pagination'
  import MdInput from '@/components/MDinput'

  export default {
    name:'roleList',
    components:{Disable, Pagination, MdInput},
    data(){
      return{
        params: {
          key: null,
          availableStatus:null,
          page: 1, pageSize: 10,
          order: null, sort: null
        },
        roleList:[],
        pageSizes:[10,20,30],
        total:0,
      }
    },
    methods:{
      handleEdit(index,row){
        this.$router.push({name: 'RoleDetail',query:{id:row.id}})
      },
      async handleDelete(id,name){
        if(name == '删除') {
          let data = { id:id, }
          let resp = await deleteRole(data)
          if(this.qUtil.validResp(resp)) this.$message({ message: '删除成功!', type: 'success' });
          else  this.$message({  message: '删除失败!', type: 'warning' });
          this.init();
        }
      },
      formatPrice(price){
        return fmMoney(price,2,true)
      },
      formatDate(date){
        return fmDate(date,"yyyy-MM-dd")
      },
      addRole() {
        this.$router.push({name: 'RoleDetail'})
      },
      //搜索
      search(){
        this.params.page = 1;
        this.init();
      },
      async init(){
        let resp = await getRoleList(this.params);
        console.log('[测试接口]',resp);
        if(resp.data!=null){
          this.roleList = resp.data.dataList;
          this.total = resp.data.total;
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>
<style>
  .product-list .el-table,.product-list .el-table th{
    text-align: center;
  }
</style>
