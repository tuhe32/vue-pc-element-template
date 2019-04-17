
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
