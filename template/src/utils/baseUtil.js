export default {
  //模型结构拷贝去引用
  modelCopy: function (data) {
    return JSON.parse(JSON.stringify(data))
  },
  showImage:function(baseUrl,store,module,photo){
    let pics = photo.split(".")
    return baseUrl + 'system/showImage/'+module+'-' + store.state.user.temple.id + '/' + pics[0]
  },
  /**
   * 存储localStorage
   */
  setStore :function(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  /**
   * 获取localStorage
   */
  getStore :function(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },

  /**
   * 删除localStorage
   */
  removeStore :function( name)  {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  isNotBlank:function (value) {
    if(value != null && value != undefined && value != '' && value.trim() != '') {
      return true;
    }else return false;
  },
  isNotBlankObj:function (value) {
    if(value != null && value != undefined) {
      return true;
    }else return false;
  },
  isBlank:function (value) {
    if(value != null && value != undefined && value != '' && value.trim() != '') {
      return false;
    }else return true;
  },
  isBlankObj:function (value) {
    if(value == null || value == undefined) {
      return true
    }else return false
  },
  isNotBlankObjs:function (...vals) {
    var bol  = false;
    if(vals == null || vals == undefined || vals.length == 0) return bol;
    vals.every(obj => {
      obj = obj == null || obj == undefined?'':obj+'';
      if(obj != null && obj != undefined && obj != '' && obj.trim() != '') {
        bol = true;
        return false;
      }
    })
    return bol;
  },
  isUnDeleted:function (val) {
      if(val === 'UN_DELETED' || val == 0 || val == "0") return true;
      else return false;
  }
}
