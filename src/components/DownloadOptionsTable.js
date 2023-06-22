import { Button, Table } from 'react-bootstrap';

const DownloadOptionsTable = ({ streams, downloadHanlder}) => {
  if(!streams) return
  
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
            {videoStreams.map((stream, index) => (
              <tr key={index}>
                <td>{stream.resolution}</td>
                <td>{stream.mime_type}</td>
                <td>
                  <Button variant="primary" href={stream.url} onClick={() => { downloadHanlder(stream)}}>
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
            {audioStreams.map((stream, index) => (
              <tr key={index}>
                <td>{stream.mime_type}</td>
                <td>
                  <Button variant="primary" href={stream.url} onClick={() => { downloadHanlder(stream)}}>
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
}

export { DownloadOptionsTable }