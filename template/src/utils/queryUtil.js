export  default {
  validResp(resp){
    let result = false
    if (resp && resp.data && (resp.code == 0|| resp.code == '0')) {
      result = true
    }
    return result
  }
}
