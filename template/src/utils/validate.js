/**
 * Created on 19/04/09.
 */
export default {
    isExternal (path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },
    alidUsername (str) {
        const valid_map = ['admin', 'editor']
        return valid_map.indexOf(str.trim()) >= 0
    },
    validURL(url) {
        const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return reg.test(url)
    },
    validLowerCase(str) {
        const reg = /^[a-z]+$/
        return reg.test(str)
    },
    validUpperCase(str) {
        const reg = /^[A-Z]+$/
        return reg.test(str)
    },
    validAlphabets(str) {
        const reg = /^[A-Za-z]+$/
        return reg.test(str)
    },
    validEmail(email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(email)
    },
    isString(str) {
        if (typeof str === 'string' || str instanceof String) {
            return true
        }
        return false
    },
    isArray(arg) {
        if (typeof Array.isArray === 'undefined') {
            return Object.prototype.toString.call(arg) === '[object Array]'
        }
        return Array.isArray(arg)
    },
    isNotBlank(value) {
        if(value != null && value != undefined && value != '' && value.trim() != '') {
            return true;
        }else return false;
    },
    isNotBlankObj (value) {
        if(value != null && value != undefined) {
            return true;
        }else return false;
    },
    isBlank (value) {
        if(value != null && value != undefined && value != '' && value.trim() != '') {
            return false;
        }else return true;
    },
    isBlankObj (value) {
        if(value == null || value == undefined) {
            return true
        }else return false
    },
    isNotBlankObjs (...vals) {
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
    isUnDeleted (val) {
        if(val === 'UN_DELETED' || val == 0 || val == "0") return true;
        else return false;
    }
}

