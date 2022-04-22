import { useEffect, useState } from "react";
import GetData from "../services/GetData";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const PeoplePage = () => {
  const [people, setPeople] = useState("");

  //Fetch people from api
  const getPeople = async () => {
    const data = await GetData.getPeople();
    setPeople(data);
  };

  //Fire the function as soon as it's mounted
  useEffect(() => {
    getPeople();
  }, []);

  console.log(people);

  return (
    <div className="People-list">
      <h1>People</h1>
      <Row xs={1} md={3} className="g-4">
        {people &&
          people.results.map((person) => (
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Header>{person.name}</Card.Header>
                <Card.Body>
                  <ListGroup.Item>
                    <b>Gender: </b>
                    {person.gender}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Born: </b>
                    {person.birth_year}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>In </b>
                    {person.films.length} films
                  </ListGroup.Item>
                  <Button variant="primary">Read more</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default PeoplePage;
