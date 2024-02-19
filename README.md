# Melody-App

This repository contains crud song information project

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the Melody App Backend! This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and provides an API for managing songs.

- Can Do Crud Oprations of songs
- Songs Statistics including Total # of songs, artists, albums, genres; # of songs in  every genre; # of songs & albums each artist has; and # songs in each album are included as Statistics on the home page.

## Features

- create a song
- Edit a song
- Delete a song

API Endpoints

Create a Song
POST /api/songs

Create a new song.

{
  "title": "Song Title",
  "artist": "Artist Name",
  "album": "Album Name",
  "genre": "Genre Name"
}

Get All Songs

GET /api/songs

Retrieve all songs.
Get a Song by ID

GET /api/songs/:id
Retrieve a song by its ID.

Update a Song by ID
PUT /api/songs/:id

Update a song by its ID.

{
  "title": "New Song Title",
  "artist": "New Artist Name",
  "album": "New Album Name",
  "genre": "New Genre Name"
}

Delete a Song by ID

DELETE /api/songs/:id

Delete a song by its ID.

Get Overall Statistics
GET /api/statistics

Retrieve overall statistics.


## Installation

To use the melody-app repository:

`git clone https://github.com/jonathan-demlie/melody-app`

Install dependencies first and setup environment variables as listed in the `.env.example` file

## Usage

### Setup backend

`cd backend/ && npm install`

### Setup frontend

`cd frontend/ && npm install`

### Run frontend

`npm run dev`

### Open your favorite web browser and navigate to:

`http://localhost:5173`

## Contribution

You are welcome to contribute to this repository

## Check backend/README.Docker.md for Docker Documentations 

 [Frontend on Vercel](https://melody-app-sandy.vercel.app/).
 
 [Backend on Render](https://backend-a0j0.onrender.com).



## License

This is repository is under the ISC license.
