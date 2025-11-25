# Multi-Customer WebAR Template (Option B) - Ready-to-Use

This package is a multi-customer WebAR starter that plays a video on top of a printed photo (image target).
It uses **A-Frame + MindAR** and is designed to be integrated into your existing website (you chose the "button on your website" scan flow).

---

## What is included
- `index.html` - The AR scanner page. Place this on a route like `/ar/view.html`.
- `script.js` - Loads per-customer assets based on `?id=###` parameter.
- `config.json` - Mapping file: id -> { target, video }.
- `targets/` - Put your generated `.mind` files here (one per customer).
- `videos/` - Put your `.mp4` video files here (one per customer).
- `README.md` - This file.

---

## Quick workflow (for each new order)
1. Customer sends a photo.
2. Convert that photo to a MindAR target file (`targetXYZ.mind`) using MindAR target generator.
3. Save the generated `.mind` into `targets/` and name as `target###.mind`.
4. Export your video as `video###.mp4` and save into `videos/`.
5. Add an entry in `config.json`:
   ```
   "123": { "target": "targets/target123.mind", "video": "videos/video123.mp4" }
   ```
6. Upload the updated files to your hosting (Netlify, Firebase, Vercel, GitHub Pages, etc).
7. Create a button or link on your existing website that opens the AR page with the correct `id`:
   Example:
   ```html
   <a href="https://your-site.example/ar/index.html?id=123" target="_blank">Scan your print</a>
   ```
8. Print the photo (the same image used to make the `.mind` target). Customer points camera at printed photo and taps **Start AR**.

---

## Generating .mind targets
Use the MindAR target maker. Steps:
1. Go to the MindAR target generator tool (search "MindAR target generator" or use the CLI from the MindAR GitHub).
2. Upload the exact photo you will print (do not crop).
3. Download the `.mind` file and the optimized jpg.
4. Place the `.mind` file into `targets/`.

Important: The printed photo must be the same visual content used to create the `.mind` target for reliable tracking.

---

## Hosting notes
- Your AR page must be served over **HTTPS** (camera permission requires secure context).
- Netlify, Vercel, Firebase Hosting, and GitHub Pages are good free options.
- Keep video file sizes small (< 5–10 MB) for fast load on mobile.

---

## Integration into your website (you chose option B - a button)
Add a button or link on your website where customers can click:
```html
<a href="https://yourdomain.com/ar/index.html?id=001" target="_blank">Open AR Scanner</a>
```
You can open it in a new tab or within the site.

---

## Troubleshooting
- If AR doesn't start, ensure camera permission is granted.
- If tracking fails, recreate the `.mind` using the exact printed image.
- If video doesn't autoplay, remind user to tap the **Start AR** button (this user gesture allows autoplay).

---

## Need help?
If you want, I can:
- Create `.mind` targets from images you upload (I'll guide you step-by-step).
- Compress/convert your videos to optimized MP4.
- Deploy these files to a free host (Netlify/Firebase) and give you the live URL.
- Generate QR or HTML button code for printing.

Send me the photo(s) and video(s) when you're ready and I'll prepare the exact assets for you.
