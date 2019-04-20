
export function require(message, trigger = 'blur') {
    return { required: true, message: message, trigger: trigger }
}
export function dateRequire(message, trigger = 'change') {
    return { type: 'date', required: true, message: message, trigger: trigger }
}
export function arrayRequire(message, trigger = 'change') {
    return { type: 'array', required: true, message: message, trigger: trigger }
}
export function email(message, trigger = 'blur') {
    return { type: 'email', message: message, trigger: trigger }
}
export function number(message, trigger = 'blur') {
    return { type: 'number', message: message, trigger: trigger }
}
export function pattern(pattern, message, trigger = 'blur') {
    return { type: 'string',pattern:pattern, message: message, trigger: trigger }
}
export function validateConfirm(rule, value, callback,data, messages) {
    console.log('[data]',data)
    if (value === '') callback(new Error(messages[0]));
    if (value != data) callback(new Error(messages[1]));
    callback();
}
export function validateIdCard(rule, value, callback) {
    if (value === '') callback(new Error('请填写身份证号'));
    let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    let iSum=0 ;
    let info="" ;
    if(!/^\d{17}(\d|x)$/i.test(value)) callback(new Error('你输入的身份证长度或格式错误'));
    value=value.replace(/x$/i,"a");
    if(aCity[parseInt(value.substr(0,2))]==null) callback(new Error('你的身份证地区非法'));
    let sBirthday=value.substr(6,4)+"-"+Number(value.substr(10,2))+"-"+Number(value.substr(12,2));
    let d=new Date(sBirthday.replace(/-/g,"/")) ;
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))callback(new Error('身份证上的出生日期非法'));
    for(let i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(value.charAt(17 - i),11) ;
    if(iSum%11!=1) callback(new Error('你输入的身份证号非法'));
    callback();
}