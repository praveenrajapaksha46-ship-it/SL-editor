const fileInput = document.getElementById('fileInput');
const photoPreview = document.getElementById('photoPreview');
const videoPreview = document.getElementById('videoPreview');
const photoControls = document.getElementById('photoControls');
const videoControls = document.getElementById('videoControls');

let currentFileType = '';

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  if (file.type.startsWith('image')) {
    currentFileType = 'image';
    photoPreview.src = url;
    photoPreview.style.display = 'block';
    videoPreview.style.display = 'none';
    photoControls.style.display = 'block';
    videoControls.style.display = 'none';
  } else if (file.type.startsWith('video')) {
    currentFileType = 'video';
    videoPreview.src = url;
    videoPreview.style.display = 'block';
    photoPreview.style.display = 'none';
    photoControls.style.display = 'none';
    videoControls.style.display = 'block';
  }
});

// Example Photo Functions
function rotatePhoto() {
  photoPreview.style.transform = photoPreview.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
}

function adjustBrightness() {
  const val = document.getElementById('brightness').value;
  photoPreview.style.filter = `brightness(${val}%)`;
}

function applyFilter() {
  photoPreview.style.filter = 'grayscale(80%)';
}

// Video Example Functions
function trimVideo() {
  alert('Video trimming requires advanced JS libraries (like ffmpeg.wasm)');
}

function changeSpeed() {
  videoPreview.playbackRate = 2;
}

// Download Function
function downloadFile() {
  const a = document.createElement('a');
  if (currentFileType === 'image') {
    a.href = photoPreview.src;
    a.download = 'edited_photo.png';
  } else if (currentFileType === 'video') {
    a.href = videoPreview.src;
    a.download = 'edited_video.mp4';
  }
  a.click();
}