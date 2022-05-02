import { useEffect, useState } from "react";
import GetData from "../services/GetData";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState("");
  const [isPending, setIsPending] = useState(false);

  //Fetch movies from api
  const getMovies = async () => {
    setIsPending(true);
    const data = await GetData.getMovies();
    setMovies(data);
    setIsPending(false);
  };

  const getNum = (string) => {
    let number = string.match(/\d+/)[0];
    return number;
  };

  //Fire the function as soon as it's mounted
  useEffect(() => {
    getMovies();
  }, []);

  //Generate a card for each movie
  return (
    <div className="movies-list">
      <h1>Movies</h1>
      {isPending && <div className="spinner"></div>}
      <Row xs={1} md={3} className="g-4">
        {movies &&
          movies.results.map((movies, index) => (
            <Col key={index}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>{movies.title}</Card.Header>
                <Card.Body>
                  <ListGroup.Item>
                    <b>Episode: </b>
                    {movies.episode_id}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Release: </b>
                    {movies.release_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {movies.characters.length} characters
                  </ListGroup.Item>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/movies/${getNum(movies.url)}/`}
                  >
                    Read more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default MoviesPage;
