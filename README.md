# YouTube Watch Time Tracker

## Overview

This project monitors your YouTube video watching activity. Every 10 seconds, it checks if a video is actively playing and updates your local watch history using a Node.js server. If you meet your daily goal (default: 120 minutes), your streak count increases.

---


## Backend Architecture (Node.js)

- The server (`javas.js`) listens on `http://localhost:5000/status`.
- It writes to `yt_data.json`:
  - `last_date`: last day the user watched
  - `today_minutes`: minutes watched today
  - `streak`: how many days in a row the goal was met
  - `updated`: boolean to ensure streak is counted only once per day

---

## How It Works Together

```plaintext
              [YouTube tab in Chrome]

                        ⬇️ (every 10s, if playing)

           [extension.js content script]

                        ⬇️ POST /status

         [Node.js local server (javas.js)]

           ⬇️                        ⬇️
   update yt_data.json     check goal, update streak

```
---

## File Structure

### yt-Tracker
      - Chrome_extension_yt_tracker
         - extension.js  : Chrome content script to detect video playing
         - manifest.json : Chrome extension manifest (V3)
      
      - javas.js : Node.js server that receives video play updates
      - yt_data.json : Local JSON data store for tracking info


---

## How to Deploy the Extension in Chrome

1. Open Chrome and go to: `chrome://extensions/`

2. Enable Developer mode

3. Click Load unpacked

4. Select the folder that contains `manifest.json` and `extension.js`

---

## How to Run the Node.js Server (javas.js)

1. Make sure `Node.js` is installed

2. In terminal, run:

```bash
node javas.js

```

3. Play a video on YouTube with the extension active. Time tracking will update
`yt_data.json`.

---

## How to Work with These Files

```bash
git clone https://github.com/your-username/yt-watch-tracker.git
cd yt-watch-tracker

```
#### Start the server:

```bash
node javas.js

```
#### Load the extension:

   - Go to `chrome://extensions/`

   - Click "Load unpacked"

   - Select the current folder

#### View tracking info:

   - Your `today_minutes`

   - `streak`

   - `last_date`
---

## Future Improvements

Here are some great features to consider adding:

####  1. Content Filtering: 
   - Analyze YouTube video titles/tags and only count time for educational content like:

   - Programming

   - CSE

   - Learning or tutorial videos

####  2. Dashboard UI: 
   - Add a web or desktop UI to visualize:

   - Streaks

   - Graphs of time spent

   - Progress over days/weeks

####  3. Notifications:

   - Remind user when time goal is met

   - Show streak badge in browser

####  4. Optional Cloud Sync:

   - Sync watch history to Firebase or MongoDB for backup and portability

---

## Disclaimer

```plaintext
This tool runs fully locally. No data is uploaded or shared unless you add such functionality. Use it to build healthy YouTube habits!
```

---

## Author

#### Shatadeep De
   Contributions welcome — feel free to fork or submit pull requests!

---


