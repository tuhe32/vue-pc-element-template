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

}
