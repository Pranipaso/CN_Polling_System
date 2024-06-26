# Polling system API

This is a backend api for creating questions and adding options to a specific question. Options can be voted. Questions, options can be deleted and questions can be viewed with all of their options.

- API has been hosted on : https://cn-polling-system.onrender.com

## Polling system Features

- Create questions
- Add options to question
- Delete a question
- Delete an option
- Add vote to an option
- View a question with all of its options

## Installation Guide

- Clone this repository.
- Run npm install to install all the dependencies.
- Create an .env file in your project root folder and add PORT & MONGODB variables.
- In the MONGODB please append the name of the Database as well example: mongodb://127.0.0.1:27017/Polling_System

## Usage

- Run npm start to start the server of the application.
- Connect to the API using Postman on port 3000.
- postman collection has been provided in the helper folder

## API Endpoints

| HTTP Verbs | Endpoints                     | Action                                |
| ---------- | ----------------------------- | ------------------------------------- |
| POST       | /questions/create             | To create a question                  |
| POST       | /questions/:id/options/create | To add options to a specific question |
| DELETE     | /questions/:id/delete         | To delete a question                  |
| DELETE     | /options/:id/delete           | To delete an option                   |
| PUT        | /options/:id/add_vote         | To increase the count of votes        |
| GET        | /questions/:id                | To view a question and its options    |

## Tech stack

- NodeJS
- ExpressJS
- MongoDB
- Mongoose
