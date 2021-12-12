module.exports= function(status=500, message="Lỗi server"){
  return {
    status,
    message
  }
}