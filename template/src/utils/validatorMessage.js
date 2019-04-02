/**
 * Created by liuBin on 2017/4/12.
 */
module.exports = {
  error: '验证失败.',
  required: ' 请填写',
  float: '请填写数字',
  integer: '请填写数字',
  number: '请填写数字',
  lessThan: '请填写小于 {0}.',
  lessThanOrEqualTo: '请填写小于或等于 {0}.',
  greaterThan: 'Must greater than {0}.',
  greaterThanOrEqualTo: 'Must greater than or equal to {0}.',
  between: 'Must between {0} and {1}.',
  size: 'Size must be {0}.',
  length: 'Length must be {0}.',
  minLength: '不能少于 {0} 位.',
  maxLength: '最大可填写 {0} 位',
  lengthBetween: 'Length must between {0} and {1}.',
  in: 'Must be {0}.',
  notIn: 'Must not be {0}.',
  match: '密码输入不一致.',
  regex: '格式不正确.',
  digit: 'Must be digit.',
  email: '邮箱格式不正确.',
  url: '地址链接格式不正确.',
  optionCombiner: function (options) {
    if (options.length > 2) {
      options = [options.slice(0, options.length - 1).join(', '), options[options.length - 1]];
    }
    return options.join(' 或 ');
  }
};
