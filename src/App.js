import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image, Table } from 'react-bootstrap';
import './App.css';

const DownloadOptionsTable = ({ streams }) => {
  const videoStreams = streams.filter((stream) => stream?.mime_type.startsWith('video'));
  const audioStreams = streams.filter((stream) => stream?.mime_type.startsWith('audio'));

  return (
    <div>
      <h3>Video</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Resolution</th>
            <th>Mime/Type</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {videoStreams.map((stream) => (
            <tr key={stream.itag}>
              <td>{stream.resolution}</td>
              <td>{stream.mime_type}</td>
              <td>
                <Button variant="primary" href={stream.url} download>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Audio</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mime/Type</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {audioStreams.map((stream) => (
            <tr key={stream.itag}>
              <td>{stream.mime_type}</td>
              <td>
                <Button variant="primary" href={stream.url} download>
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};



const App = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=oyZtLzXyVwA');
  const [videoInfo, setVideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = 'https://ytsave-f5eac5b627ec.herokuapp.com'

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  function formatLength(length) {
    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length % 3600) / 60);
    const seconds = length % 60;
  
    let formattedLength = '';
    if (hours > 0) {
      formattedLength += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      formattedLength += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    if (seconds > 0) {
      formattedLength += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
  
    return formattedLength.trim();
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

  return (
    <Container>
      <header className="text-center my-4">
        <img
          src="logo.png"
          alt="Logo"
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.reload()}
        />
      </header>
      <main>
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={12} lg={8}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">YouTube Video Downloader Online</h2>
                <Form>
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
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Image src={videoInfo.thumbnail_url} alt="Video Thumbnail" fluid />
                    </Col>
                    <Col xs={12} md={12}>
                      <h3>{videoInfo.title}</h3>
                      
                    </Col>
                  </Row>
                  <Row>
                  <Col xs={12} md={12}>
                      <h4>By: {videoInfo.author}</h4>
                      <p><strong>Duration</strong>: {formatLength(videoInfo.length)}  <strong>Views</strong>: {videoInfo.views}</p>
                    </Col>
                  </Row>
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
                  <DownloadOptionsTable streams={videoInfo.streams}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          )
        }
      </main>

      <Row className="justify-content-center mb-4">
        <Col xs={12} md={12} lg={8}>
          <Card>
            <Card.Body>
            <div className="tutorial">
              <h3 className="tutorial-title">How to Use</h3>
              <ol className="tutorial-steps">
                <li>Paste or type the YouTube video URL into the input field above.</li>
                <li>Click the "Start" button to view the video information and available download options.</li>
                <li>Select the desired video resolution from the download options table.</li>
                <li>Click the "Download" button next to the chosen resolution.</li>
              </ol>
            </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="footer text-center mt-4">
        <p>&copy; 2023 Your App. All rights reserved.</p>
      </footer>
    </Container>
  );
};

export default App;
