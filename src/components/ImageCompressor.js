import React from "react";

import imageCompression from "browser-image-compression";

import Card from "react-bootstrap/Card";

export default class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "https://pic.onlinewebfonts.com/svg/img_148071.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = e => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      
      <div className="m-5" >
        <h1 style={{color: "black",textAlign:"center",marginBottom:"30px",background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',fontFamily:'sans'}}><big>Image Compressor</big></h1>
        <div className="text-light text-center" style={{border:"5px black solid",padding:"10px",background:'linear-gradient(#e66465, #9198e5)'}}>
          
          <ul style={{textAlign:"center"}}>
         <h4>1-Upload Image</h4>
         <h4>2-Click on Compress</h4>
         <h4>3-Download Compressed Image</h4>
          </ul>
        </div>
        
        <div className="row mt-5"  style={{border:"5px black solid",padding:"10px"}}>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12" >
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="https://pic.onlinewebfonts.com/svg/img_148071.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => this.handle(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={e => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      
    );
  }
}
