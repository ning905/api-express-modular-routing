const { request } = require("express");
const express = require("express");
const { films } = require("../../data.js");
const { updateObject } = require("../updateObject");

const filmRouter = express.Router();

filmRouter.get("/", (req, res) => {
  let allFilms = [...films];

  if (req.query.director) {
    allFilms = allFilms.filter((film) => film.director === req.query.director);
  }

  res.json({ films: allFilms });
});

filmRouter.post("/", (req, res) => {
  const newFilm = { ...req.body, id: films[films.length - 1].id + 1 };
  const allFields =
    req.body.hasOwnProperty("title") && req.body.hasOwnProperty("director");
  const foundFilm = films.find(
    (film) =>
      film.title.toLocaleLowerCase() === newFilm.title.toLocaleLowerCase()
  );

  if (!allFields) {
    return res.status(200).json({ error: "Missing fields in request body" });
  }

  if (foundFilm) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  films.push(newFilm);
  res.json({ film: newFilm });
});

filmRouter.get("/:id", (req, res) => {
  const foundFilm = films.find((film) => film.id === Number(req.params.id));

  if (!foundFilm) {
    return res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  res.json({ film: foundFilm });
});

filmRouter.delete("/:id", (req, res) => {
  const foundFilm = films.find((film) => film.id === Number(req.params.id));

  if (!foundFilm) {
    return res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  films.splice(films.indexOf(foundFilm), 1);
  res.json({ film: foundFilm });
});

filmRouter.put("/:id", (req, res) => {
  const foundFilm = films.find((film) => film.id === Number(req.params.id));
  const foundTitle = films.find(
    (film) =>
      film.title.toLocaleLowerCase() === req.body.title.toLocaleLowerCase()
  );

  if (!foundFilm) {
    return res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  if (foundTitle) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const updatedFilm = { ...req.body, id: Number(req.params.id) };
  films.splice(films.indexOf(foundFilm), 1, updatedFilm);
  res.json({ film: updatedFilm });
});

filmRouter.patch("/:id", (req, res) => {
  const foundFilm = films.find((film) => film.id === Number(req.params.id));
  const foundTitle = films.find(
    (film) =>
      film.title.toLocaleLowerCase() === req.body.title.toLocaleLowerCase()
  );

  if (!foundFilm) {
    return res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  if (foundTitle) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const updatedFilm = updateObject(foundFilm, req.body);
  res.json({ film: updatedFilm });
});

module.exports = filmRouter;
