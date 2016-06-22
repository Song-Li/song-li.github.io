var value = 0;
var pos = 0;
var progressHidden = false;
var delay = 40;
var progressEl = $('progress');

// set interval
var timer = setInterval(progress, 100);

function progress() {
  
  // run counter
  value++;
  if (value < 99) {
    progressEl.val(value);
    pos = 1 - (value/100);
  } else if(value < (delay + 100) ) {
    progressEl.val(99);
    pos = 0;
  } else {
    value = 0;
  }
  
  // update background
  progressEl.css('background-position', '0 '+ pos +'em');
  
  // show/hide progress
  if(!progressHidden && value >= 100) {
    progressEl.addClass("hidden");
    progressHidden = true;
    
  } else if(progressHidden && value < 100) {
    progressEl.val(0);
    progressEl.removeClass("hidden");
    progressHidden = false;
  }
  
}