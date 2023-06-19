import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';

function App() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=oyZtLzXyVwA');
  const [selectedFormat, setSelectedFormat] = useState('video');
  const [videoInfo, setVideoInfo] = useState(null);

  const handleGetVideoInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ytsave-f5eac5b627ec.herokuapp.com//info?url=${videoUrl}`);
      const data = await response.json();
      setVideoInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadVideo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ytsave-f5eac5b627ec.herokuapp.com/save?url=${videoUrl}&format=${selectedFormat}`);
      const blob = await response.blob();

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `video.${selectedFormat === 'video' ? 'mp4' : 'mp3'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group controlId="videoUrl">
          <Form.Label>Video URL</Form.Label>
          <Form.Control type="text" placeholder="Enter video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="format">
          <ButtonGroup>
            <Button
              variant={selectedFormat === 'video' ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedFormat('video')}
            >
              Video
            </Button>
            <Button
              variant={selectedFormat === 'audio' ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedFormat('audio')}
            >
              Audio
            </Button>
          </ButtonGroup>
        </Form.Group>
      </Form>

      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleGetVideoInfo}>
            Get Video Info
          </Button>
        </Col>
        <Col>
          <Button variant="success" onClick={handleDownloadVideo}>
            Download Video
          </Button>
        </Col>
      </Row>
      {videoInfo && (
        <div>
          <h2>Video Info</h2>
          <p>Title: {videoInfo.title}</p>
          <p>Author: {videoInfo.author}</p>
          {/* Display other video info */}
        </div>
      )}
    </Container>
  );
}

export default App;