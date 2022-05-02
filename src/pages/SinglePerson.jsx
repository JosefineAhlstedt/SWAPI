import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetData from "../services/GetData";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SinglePerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState("");
  const navigate = useNavigate();

  //Get the person
  const getPerson = async (id) => {
    const data = await GetData.getPerson(id);
    setPerson(data);
  };

  useEffect(() => {
    getPerson(id);
  }, []);

  //Function for getting the number in a string
  const getNum = (string) => {
    let number = string.match(/\d+/)[0];
    return number;
  };

  console.log(person);

  return (
    <div className="person-profile">
      <Card>
        <Card.Header>{person.name}</Card.Header>
        <Card.Body>
          <ListGroup.Item>
            <h4>Attributes</h4>
            <div>
              <b>Name: </b>
              {person.name}
            </div>
            <div>
              <b>Birth year: </b>
              {person.brth_year}
            </div>
            <div>
              <b>Height: </b>
              {person.height}
            </div>
            <div>
              <b>Mass: </b>
              {person.mass}
            </div>
            <div>
              <b>Hair color: </b>
              {person.hair_color}
            </div>
            <div>
              <b>Skin colour: </b>
              {person.skin_color}
            </div>
            <div>
              <b>Eye colour: </b>
              {person.eye_color}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <h4>Links</h4>
            <div>
              <b>Films </b>
            </div>
            {person &&
              person.films.map((movie, index) => (
                <ListGroup.Item action as={Link} to={`/movies/${index + 1}`}>
                  Movie {getNum(movie)}
                </ListGroup.Item>
              ))}
          </ListGroup.Item>
        </Card.Body>
      </Card>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};

export default SinglePerson;
