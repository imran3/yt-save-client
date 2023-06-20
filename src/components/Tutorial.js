import { Card } from "react-bootstrap"

const Tutorial = () => {
    return(
        <Card>
            <Card.Header>How to Use</Card.Header>
            <Card.Body>
            <div className="tutorial">
                <ol className="tutorial-steps">
                <li>Paste or type the YouTube video URL into the input field above.</li>
                <li>Click the "Start" button to view the video information and available download options.</li>
                <li>Select the desired video resolution from the download options table.</li>
                <li>Click the "Download" button next to the chosen resolution.</li>
                </ol>
            </div>
            </Card.Body>
        </Card>
    )
}

export { Tutorial }