module.exports= function(status=200, message="get data success", data={}){
  return {
    status,
    message, 
    data
  }
}