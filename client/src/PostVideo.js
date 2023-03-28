// import React, { useState, axios } from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const [video, setVideo] = useState();
// const [videoName, setVideoName] = useState("");

// const saveVideo = (e) => {
//     setVideo(e.target.files[0]);
//     setVideoName(e.target.files[0].name);
// };

// const uploadVideo = async (e) => {
//     const formData = new FormData();
//     formData.append("file", video);
//     formData.append("fileName", videoName);
    
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/postvideo",
//         formData
//       );
//       console.log(res);
//     } catch (ex) {
//       console.log(ex);
//     }
// };

// const PostVideo = () => {
//     return (
//         <>
//             <Header />
//             <div>
//                 <input type="file" onChange={saveVideo} />
//                 <button onClick={uploadVideo}>Upload</button>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default PostVideo;