import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      videos: [],
      source: '',
      file: '',
      fileName: ''
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000/videos');
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (event) => {
    const video = event.target.files[0];
    if(video !== undefined) {
      const url = URL.createObjectURL(video);
      this.setState({source: url});
      this.setState({file: event.target.files[0]});
      this.setState({fileName: event.target.files[0].name})
    }
  };

  uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("baseUrl", this.state.source);
    formData.append("file", this.state.file);
    formData.append("fileName", this.state.fileName);
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    }).then((data) => {
      alert("Video upload successful")
    })
    this.setState({source:''});
    this.setState({file:''});
    this.setState({fileName:''});
  };

  render() {
    return (
      <div className="App-header">
        <Header />
        <div className="row">
          {
            this.state.videos.map(video =>
              <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <div className="card-body">
                      <p>Video {video.id}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
          )}
            <Footer />
        </div>
        
        <div className="VideoInput">
          <input
            // ref={inputRef}
            className="VideoInput_input"
            type="file"
            onChange={this.handleChange}
            accept=".mov,.mp4"
          />
          {this.state.source && (<button onClick={this.uploadFile}>Upload Video</button>)}
        </div>
      </div>
    )
  }
}
