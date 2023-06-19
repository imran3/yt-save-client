import React from 'react';
import Card from 'react-bootstrap/Card';

function VideoCard({ title, author, thumbnail_url, length, views }) {
  const formatLength = (length) => {
    const hours = Math.floor(length / 3600);
    const minutes = Math.floor((length % 3600) / 60);
    const seconds = length % 60;
    return `${hours? hours + 'h ' : ''}${minutes ? minutes + 'm' : ''}${seconds}`;
  };

  return (
    <Card className="video-card">
      <div className="thumbnail-container">
        <Card.Img src={thumbnail_url} alt="Video Thumbnail" className="thumbnail-img" />
      </div>
      <Card.Body>
        <Card.Title className="video-title">{title}</Card.Title>
        <Card.Text className="video-author">{author}</Card.Text>
        <Card.Text className="video-length"><strong>Length</strong> {formatLength(length)}   <strong>Views</strong> {views}</Card.Text>
        <Card.Text className="video-views"></Card.Text>
      </Card.Body>
    </Card>
  );
}

export default VideoCard;
