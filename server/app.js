const express = require('express');
const fs = require('fs');
// const thumbsupply = require('thumbsupply');
const cors  = require('cors');
const multer = require('multer');
const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });


const videos = [
  {
    id: 0,
    duration: '3 mins',
    name: 'Sample 1'
  },
  {
    id: 1,
    duration: '4 mins',
    name: 'Sample 2'
  },
  {
    id: 2,
    duration: '2 mins',
    name: 'Sample 3'
  },
];

app.use(cors());

// endpoint to fetch all videos metadata
app.get('/videos', function(req, res) {
  res.json(videos);
});

app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file contains information about the uploaded file
  
  res.send('File uploaded successfully');
});

// endpoint to fetch a single video's metadata
app.get('/video/:id/data', function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.json(videos[id]);
});

app.get('/video/:id', function(req, res) {
  const path = `assets/${req.params.id}.mp4`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  // console.log(res, "response");
  // console.log(range, "range");
  if (range) {
    // console.log('we have range', range);
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
      console.log(parts)
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
    // console.log(file, "file");
  } else {
    console.log('no range', range);
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

// app.post('/postvideo', (req, res) => {
//   const video = req.body.video;
//   console.log('Adding video::', video);
//   videos.push(video);
//   res.json("video added");
// });

app.listen(4000, function () {
  console.log('Listening on port 4000!')
});