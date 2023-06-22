import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';

import { DownloadOptionsTable } from './components/DownloadOptionsTable';
import { Footer } from './components/Footer';
import { Tutorial } from './components/Tutorial';
const API_URL = 'https://ytsave-f5eac5b627ec.herokuapp.com'

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  function formatDuration(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
  
    let formatDuration = `${hours ? hours + ':' : ''}${minutes ? minutes + ':' : ''}${seconds ? seconds : ''}`
   
    return formatDuration.trim();
  }

  const handleGetVideoInfo = () => {
    setIsLoading(true);

    fetch(`${API_URL}/info?url=${videoUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoInfo(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleDownload = async (streamInfo) => {
    try {
      const response = await fetch(`${API_URL}/save?url=${videoUrl}&itag=${streamInfo.itag}`);
      const blob = await response.blob();
      const file_extension = streamInfo.type === 'video' ? `.mp4` : '.mp3'
      const filename = `${videoInfo.title}_${streamInfo.type ?  streamInfo.resolution  : ''}${file_extension}`
      saveAs(blob, filename);
    } catch (error) {
      console.error("Download failed.", error);
    }
  }

  return (
    <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={12} lg={8}>
            <Card className='text-center '>
              <Card.Header>
                <h1 className="text-center">YouTube Video Downloader Online</h1>
              </Card.Header>
              <Card.Body> 
                <Form onSubmit={handleGetVideoInfo}>
                  <Form.Group as={Row} controlId="formUrl" xs={12}>
                    <Col xs={12} md={8} lg={8}>
                      <Form.Control
                        type="text"
                        placeholder="Enter YouTube Video URL"
                        value={videoUrl}
                        onChange={handleVideoUrlChange}
                      />
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                      <Button
                        variant="primary"
                        block
                        disabled={isLoading}
                        onClick={handleGetVideoInfo}
                      >
                      {isLoading ? 'Loading...' : 'Start'}
                    </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row> 

      {videoInfo && (
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={12} lg={8}>
              <Card>
                <Card.Img src={videoInfo.thumbnail_url}></Card.Img>
                <Card.Body>
                      <h3>{videoInfo.title}</h3>
                      <h4>By: {videoInfo.author}</h4>
                      <p><strong>Duration</strong>: {formatDuration(videoInfo.length)}  <strong>Views</strong>: {videoInfo.views}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

      {
          videoInfo && (
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={12} lg={8}>
              <Card>
                <Card.Body>
                  <h3 className="download-options-title">Download Options</h3>
                  <DownloadOptionsTable streams={videoInfo.streams} downloadHanlder = {handleDownload}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          )
        }
      <Row className="justify-content-center mb-4">
          <Col xs={12} md={12} lg={8}>
            <Tutorial/>
            <Footer/>
          </Col>
        </Row>
    </Container>
  );
};

export default App;
