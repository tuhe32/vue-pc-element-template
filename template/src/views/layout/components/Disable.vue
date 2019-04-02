<template>
  <el-popover  placement="bottom" width="160" trigger="click" v-model="visible">
    <p>确认{{name}}吗？</p>
    <div style="text-align: left; margin: 0">
      <el-button type="danger" size="mini" @click="handleHide(1)" round>确认</el-button>
      <el-button size="mini" class="btnClose" @click="handleHide(0)" round>关闭</el-button>
    </div>
    <el-button size="mini" type="warning" slot="reference" >{{name}}</el-button>
  </el-popover>
</template>
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    props: {
      name: {
        type: String,
        default: '',
      },
      id:{
        type:Object,
        default:null
      }
    },
    methods: {
      handleHide(code) {
        if (parseInt(code) === 1) {
          this.$emit('emit',this.id,this.name);
        }
        this.visible = false;
      },
    },
    mounted(){
      console.log("name",this.name)
    }
  };
</script>
