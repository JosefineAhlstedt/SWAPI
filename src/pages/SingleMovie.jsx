import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetData from "../services/GetData";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState("");

  //Get the movie
  const getMovie = async (id) => {
    const data = await GetData.getMovie(id);
    setMovie(data);
  };

  useEffect(() => {
    getMovie(id);
  }, []);

  console.log(movie);

  return (
    <div className="movie-profile">
      <Card>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Body>
          <ListGroup.Item>
            <h4>Attributes</h4>
            <div>
              <b>Name: </b>
              {movie.title}
            </div>
            <div>
              <b>Episode: </b>
              {movie.episode_id}
            </div>
            <div>
              <b>Director: </b>
              {movie.director}
            </div>
            <div>
              <b>Producer: </b>
              {movie.producer}
            </div>
            <div>
              <b>Release date: </b>
              {movie.release_date}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <h4>Links</h4>
            <div>
              <b>Characters </b>
            </div>
            {movie &&
              movie.characters.map((movie, index) => (
                <ListGroup.Item action as={Link} to={`/people/${index + 1}`}>
                  Character {index + 1}
                </ListGroup.Item>
              ))}
          </ListGroup.Item>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleMovie;
