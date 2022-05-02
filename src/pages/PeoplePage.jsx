import { useEffect, useState } from "react";
import GetData from "../services/GetData";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const PeoplePage = () => {
  const [people, setPeople] = useState("");
  const [page, setPage] = useState(0);
  const [buttonValue, setButtonValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  //Fetch people from api
  const getPeople = async () => {
    setIsPending(true);
    const data = await GetData.getPeople();
    setIsPending(false);
    setPeople(data);
  };

  const getNextPeople = async (endpoint) => {
    const data = await GetData.getNextPeople(endpoint);
    setPeople(data);
  };

  const getNum = (string) => {
    let number = string.match(/\d+/)[0];
    return number;
  };

  //Fire the function as soon as it's mounted
  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    if (!people) {
      return;
    }
    if (buttonValue === "next") {
      getNextPeople(people.next);
    } else if (buttonValue === "prev") {
      getNextPeople(people.previous);
    }
    setButtonValue("");
  }, [page]);

  console.log(people);

  return (
    <div className="People-list">
      <h1>People</h1>
      {isPending && <div className="spinner"></div>}
      <Row xs={1} md={3} className="g-4">
        {people &&
          people.results.map((person, index) => (
            <Col key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>{person.name}</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
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
                  </ListGroup>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/people/${getNum(person.url)}/`}
                  >
                    Read more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="prev">
          <Button
            disabled={page === 0}
            variant="dark"
            onClick={() => {
              setPage((prevValue) => prevValue - 1);
              setButtonValue("prev");
            }}
          >
            Previous Page
          </Button>
        </div>
        <div className="page">{page}</div>
        <div className="next">
          <Button
            disabled={people.count / 10 - 1 <= page}
            variant="dark"
            onClick={() => {
              setPage((prevValue) => prevValue + 1);
              setButtonValue("next");
            }}
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
