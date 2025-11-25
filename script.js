let items = [];
let videoEls = [];

async function loadConfig() {
  try {
    const res = await fetch("./config.json");
    const config = await res.json();
    items = config.items;

    console.log("Loaded items:", items);

    // Build MindAR imageTargetSrc list
    const targetList = items.map(i => `./targets/${i.target}`).join(",");

    // Update mindar-image attribute
    const scene = document.querySelector("a-scene");
    scene.setAttribute(
      "mindar-image",
      `imageTargetSrc: ${targetList}; maxTrack: ${items.length};`
    );

    // Create video elements dynamically
    const assets = document.querySelector("a-assets");

    items.forEach((item, idx) => {
      const v = document.createElement("video");
      v.id = `ar-video-${idx}`;
      v.src = `./videos/${item.video}`;
      v.autoplay = false;
      v.loop = true;
      v.crossOrigin = "anonymous";
      v.playsInline = true;
      v.muted = true; // required for mobile autoplay

      assets.appendChild(v);
      videoEls.push(v);
    });

  } catch (e) {
    console.error("Config error:", e);
  }
}

loadConfig();

document.getElementById("start-btn").onclick = () => {
  document.getElementById("start-btn").style.display = "none";
  videoEls.forEach(v => v.play().catch(()=>{})); 
};

// TRACKING HANDLERS
document.addEventListener("targetFound", (e) => {
  const idx = e.detail.targetIndex;
  console.log("Found target:", idx);

  // Play matched video
  videoEls[idx].play();

  // Attach video to correct plane
  const plane = document.getElementById(`video-plane-${idx}`);
  if (plane) plane.setAttribute("material", `shader: flat; src: #ar-video-${idx}`);
});

document.addEventListener("targetLost", (e) => {
  const idx = e.detail.targetIndex;
  console.log("Lost target:", idx);
  videoEls[idx].pause();
});


/*
script.js
- Reads ?id= from URL
- Loads config.json
- Injects appropriate target (targets/target<ID>.mind) and video (videos/video<ID>.mp4)
- Starts MindAR on user Start button
*/

// async function getIdFromUrl() {
//   const params = new URLSearchParams(window.location.search);
//   return params.get('id') || '001';
// }

// async function loadConfig() {
//   const resp = await fetch('config.json');
//   if (!resp.ok) throw new Error('Could not load config.json');
//   return resp.json();
// }

// function setFallbackLink(videoPath) {
//   const fallback = document.getElementById('fallback');
//   fallback.innerHTML = 'If AR doesn\'t work, <a href="'+videoPath+'" target="_blank" style="color:#fff;text-decoration:underline">open the video here</a>.';
// }

// function createVideoAsset(videoPath) {
//   const assets = document.getElementById('assets');
//   // remove existing if any
//   const existing = document.getElementById('ar-video');
//   if (existing) existing.remove();

//   const video = document.createElement('video');
//   video.id = 'ar-video';
//   video.src = videoPath;
//   video.loop = true;
//   video.playsInline = true;
//   video.setAttribute('webkit-playsinline', 'true');
//   video.setAttribute('crossorigin', 'anonymous');
//   assets.appendChild(video);

//   // update material src on plane
//   const plane = document.getElementById('video-plane');
//   plane.setAttribute('material', 'shader: flat; src: #ar-video; transparent: true');
//   return video;
// }

// async function init() {
//   try {
//     const id = await getIdFromUrl();
//     const cfg = await loadConfig();
//     if (!cfg[id]) throw new Error('ID not found in config.json');

//     const targetFile = cfg[id].target; // e.g., targets/target001.mind
//     const videoFile = cfg[id].video;   // e.g., videos/video001.mp4

//     // Set MindAR image targetSrc attribute on scene
//     const scene = document.querySelector('a-scene');
//     const mindarAttr = 'imageTargetSrc: ' + targetFile + '; maxTrack: 1;';
//     scene.setAttribute('mindar-image', mindarAttr);

//     // Create video asset and fallback link
//     const videoEl = createVideoAsset(videoFile);
//     setFallbackLink(videoFile);

//     // Start button
//     const startBtn = document.getElementById('start-btn');
//     startBtn.addEventListener('click', async () => {
//       startBtn.style.display = 'none';
//       try {
//         await scene.components['mindar-image'].start();
//       } catch(e) {
//         console.error('Error starting MindAR:', e);
//         alert('Could not start AR. Try reloading the page and allow camera permission.');
//       }
//     });

//     // target events
//     const targetEntity = document.querySelector('[mindar-image-target]');
//     targetEntity.addEventListener('targetFound', () => {
//       // play video
//       videoEl.currentTime = 0;
//       videoEl.play().catch(()=>{ /* autoplay blocked */});
//     });
//     targetEntity.addEventListener('targetLost', () => {
//       videoEl.pause();
//     });

//   } catch (err) {
//     console.error(err);
//     alert('Initialization error: ' + err.message + '\nMake sure config.json exists and contains the requested id mapping.');
//   }
// }

// window.addEventListener('load', init);
