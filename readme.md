# [M](https://www.mongodb.com/)[e](https://expressjs.com/)[v](https://vuejs.org/)[n](https://nodejs.org/en/) Chat with [socket.io](https://socket.io/)

## Description

Chat application with rooms built with:

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Vue](https://vuejs.org/)
- [Node.js](https://nodejs.org/en/)
- [socket.io](https://socket.io/)

## Setup

1. Clone the project, edit the keys.js.example file and delete
2. the .example part.
3. Run npm i
4. Run node index.js

So far...

## TODO

- ~~Database connection~~
- ~~Models for Users, rooms~~
- ~~Encrypt password~~
- ~~Endpoint for login with encrypted pw and give a session back~~
- ~~Endpoint for register with encrypted pw~~
- ~~Endpoint for user creation~~
- Server side validation
- ~~User can join twice to any room~~
- Ask twice for passwords, on the UI and check them to be the same in the backend also
- Delete and update for users
- ~~Endpoint for room creation~~
- Delete and edit room
- Add [socket.io](https://socket.io/) backend part
- The whole frontend with vue and [socket.io](https://socket.io/)
- Add logger instead of console.log and throw err

### Notes for me

- Do I need this '/create-room', '/delete-room' paths? Method should be enough
- Roles would be nice to have for the rooms
- Check the .populat part, I think we will need it later
