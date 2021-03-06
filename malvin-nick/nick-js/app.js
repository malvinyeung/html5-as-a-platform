window.addEventListener("DOMContentLoaded", function() {

  // Grab elements, create settings, etc.
  var downloadButton = document.getElementById("download-button")
  var snapSound = document.getElementById("snap-sound");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var video = document.getElementById("video");
  var videoObj = { "video": true };
  var errBack = function(error) {
    console.log("Video capture error: ", error.code);
  };

  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }

  // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
    snapSound.load();
    snapSound.play();
    context.drawImage(video, 0, 0, 640, 480);
  });

  // Download captured photo
  downloadButton.addEventListener("click", function(event) {
    var dataURL = canvas.toDataURL("image/png");
    downloadButton.href = dataURL;
  });

}, false);
