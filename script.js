var URL = window.URL || window.webkitURL

var playSelectedFile = function (event) {
  var file = this.files[0]
  var type = file.type
  var videoNode = document.querySelector('video')
  var canPlay = videoNode.canPlayType(type)
  if (canPlay === '') canPlay = 'no'
  var isError = canPlay === 'no'

  if (isError) {
    return
  }

  // Removes input from document
  var input = document.querySelector("input")
  input.parentNode.removeChild(input);
  var fileURL = URL.createObjectURL(file)

  // Sets video source
  videoNode.src = fileURL
}

var inputNode = document.querySelector('input')
inputNode.addEventListener('change', playSelectedFile, false)

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);

document.addEventListener('touchstart', function (e) {
  requestFullScreen(elem);
  if(e.touches.length == 2) {
    var pos1 = {x:e.touches[0].clientX,y:e.touches[0].clientY};
    var pos2 = {x:e.touches[1].clientX,y:e.touches[1].clientY};

    // Define positions
    var x1, y1, x2, y2;
    if (pos1.x > pos2.x)  {
      x1 = pos2.x
      x2 = pos1.x
    } else {
      x1 = pos1.x
      x2 = pos2.x
    }

    if (pos1.y > pos2.y)  {
      y1 = pos2.y
      y2 = pos1.y
    } else {
      y1 = pos1.y
      y2 = pos2.y
    }

    // Set screen position and size
    var vid = document.getElementById('vid');
    vid.style.left = x1+"px";
    vid.style.top = y1+"px";
    vid.style.width = (x2-x1)+"px"
    vid.style.height = (y2-y1)+"px"
  }
});
