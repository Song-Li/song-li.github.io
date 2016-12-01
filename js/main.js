$("#left-mask").hover (
  function(event) {
    $('.left').css({"color":"#000"});
    $('.right').css({"color":"#CFCFCF"});
  },
  function(event) {
    $('.left').css({"color":"#CFCFCF"});
  } 
)

$("#right-mask").hover (
  function(event) {
    $('.left').css({"color":"#CFCFCF"});
    $('.right').css({"color":"#000"});
  },
  function(event) {
    $('.right').css({"color":"#CFCFCF"});
  } 
)
