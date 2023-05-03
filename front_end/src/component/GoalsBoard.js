import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GoalsBaord() {


  return (
    <Container>
      <Row xs={4} md={5} lg={6}>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
  

      <Row s={8} md={4} lg={5}>
        <Col>1 of 3</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row s={8} md={4} lg={5}>
        <Col>1 of 3</Col>
        <Col>2 of 2</Col>
 
      </Row>
    
    </Container>
  );
}

export default GoalsBaord;