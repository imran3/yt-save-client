import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function App() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=oyZtLzXyVwA');
  const [format, setFormat] = useState('video');
  const [videoInfo, setVideoInfo] = useState(null);

  const handleVideoInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ytsave-f5eac5b627ec.herokuapp.com//info?url=${videoUrl}`);
      const data = await response.json();
      setVideoInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://ytsave-f5eac5b627ec.herokuapp.com/save?url=${videoUrl}&format=${format}`);
      const blob = await response.blob();

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `video.${format === 'video' ? 'mp4' : 'mp3'}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Video App</h1>

      <Form onSubmit={handleVideoInfo}>
        <Form.Group controlId="videoUrl">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Get Video Info
        </Button>
      </Form>

      {videoInfo && (
        <div className="mt-4">
          <h2>Video Info</h2>
          <p>Title: {videoInfo.title}</p>
          <p>Author: {videoInfo.author}</p>
          <p>Length: {videoInfo.length}</p>
          <p>Views: {videoInfo.views}</p>
          <p>Rating: {videoInfo.rating}</p>
          <p>Thumbnail URL: {videoInfo.thumbnail_url}</p>
        </div>
      )}

      <Form className="mt-4" onSubmit={handleDownload}>
        <Form.Group controlId="format">
          <Form.Label>Download Format</Form.Label>
          <Form.Control as="select" value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Download
        </Button>
      </Form>
    </Container>
  );
}

export default App;
