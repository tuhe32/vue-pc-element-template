export default {
  commission(value) {
    return this.validator.value(value).required().regex('^\\d+(\\.\\d{0,2})?$','请输入0-100之内的数字').custom(()=>{
      if (value<0|| value>100)
        return '请输入0-100之内的数字'
    });
  },
  condition(value) {
    return this.validator.value(value).required().regex('^\\d+(\\.\\d{0,2})?$','请输入大于或等于0的数字').custom(()=>{
      if (value<0)
        return '请输入大于或等于0的数字'
    });
  }

}
