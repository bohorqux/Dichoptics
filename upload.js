var i = 0;

function previewFile() {  
  var preview = document.querySelectorAll('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview[i].src = reader.result;
    i = i + 1;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}