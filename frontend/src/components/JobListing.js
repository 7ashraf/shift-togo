import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function JobListing({companyName, jobTitle, description, requiements}) {
  return (
    <Card>
      <Card.Header as="h5">{companyName}</Card.Header>
      <Card.Body>
        <Card.Title>{jobTitle}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary">Apply</Button>
      </Card.Body>
    </Card>
  );
}

export default JobListing;