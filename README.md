<a href="https://atlas.shubhranil.com" target="\_blank">
  <img src="https://img.shields.io/badge/Developed%20and%20Maintained%20by-Atlas%20Inc-blue">
</a>

# atlas-task-manager

A RESTful API for creating, reading and managing tasks and their respective users. Hosted on MongoDB Atlas, this REST api provides fast
access to anything you need. Documentation provided below.

## Deployment

Deployed at http://task-manager.shubhranil.com

## Table of Contents

- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Features Include](#features-include)
- [Docker Instructions](#docker-instructions)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Built With

- [Nodejs](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com)
- [MongoDB Atlas](https://mongodb.com/cloud/atlas)
- [Docker](https://docker.com)

## Getting Started

Make sure you have [nodejs](https://nodejs.org/en/) installed. We use [npm](https://npmjs.com) to manage the dependencies, so we strongly recommend you to use it. After that, navigate into the project directory and run `npm install` to resolve all dependencies.

## Features Include

- Tasks CRUD
- Users CRUD
- Task sorting
- Task limiting for pagination
- User profiles
- Image uploads
- JWT authentication
- Password hashing using slow hashing techniques for advanced security purposes.
- Login from multiple devices
- Auto resize and cropping of user avatars
- Sending out welcome emails to every signed up user
- Sending out cancellation follow up emails to every user who wants to delete their account

## Docker Instructions

If you haven't installed [Docker](https://www.docker.com) already, then you can get it from [here](https://www.docker.com/products/docker-desktop). After installing it, create an account in Docker and copy the username.

This API part of the application is already dockerized. You can pull it directly from [docker hub](https://hub.docker.com/u/alpha037):

```bash
docker pull alpha037/atlas-task-manager_api:latest
```

Since this application needs to talk to a database, so, you can either create your own mongodb database (cloud/native) or you can use the [docker-compose.yml](https://docs.docker.com/compose/) file to spin up a mongodb instance along with the entire application.

- **For Development**:
  - **Using Docker**: If you want to use Docker for your development environment, then you can just execute the following command and it will spin up two docker containers (one for the api and the other for the db) along with a persisted volumes directory. This will use the `dev.docker.env` file. See the [example](/config/dev.docker.env.example) file.
    ```bash
    docker-compose up --build
    ```
  - **Without Using Docker**: However, if you don't want to use docker, then you can just execute the following command, provided that you have a mongodb instance running locally. This will use the `dev.env` file. See the [example](/config/dev.env.example) file.
    ```bash
    npm run start:dev
    ```
- **For Production**: For your production environment, the API talks to the mongodb atlas db instance. In that case, you can run the following command. This will use the `prod.env` file. See the [example](/config/prod.env.example) file.
  ```bash
  npm run start:prod
  ```

## API Endpoints

<strong>[POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)</strong> Endpoints:

|     Endpoint     | Verb |                     Description                     |
| :--------------: | :--: | :-------------------------------------------------: |
|      /users      | POST |                  Signing up users                   |
|      /tasks      | POST |              Creating tasks for users               |
|   /users/login   | POST |                  Logging in users                   |
|  /users/logout   | POST |                  Logging out users                  |
| /users/logoutAll | POST | Logging out all user sessions from multiple devices |
| /users/me/avatar | POST |                Uploading user avatar                |

<br>

<strong>[GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)</strong> Endpoints:

|     Endpoint      | Verb |                       Description                        | Query Params                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------: | :--: | :------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     /users/me     | GET  |                   Getting user profile                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|      /tasks       | GET  |                    Getting user tasks                    | <ul><li>sortBy (key)</li><ul><li>createdAt (value): sorted by created time ASC</li>createdAt_desc (value): sorted by created time DESC</ul><li>completed (key)</li><ul><li>true (value): only which are completed</li><li>false (value): only which are NOT completed</li></ul><li>limit (key)</li><ul><li>num (value): limited to num tasks</li></ul><li>skip (key, but must be used with <strong>limit</strong>)</li><ul><li>num (value): limiting and skipping for pagination</li></ul></ul> |
|    /tasks/:id     | GET  | Getting a specific user task (need to provide a task id) |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| /users/:id/avatar | GET  |     Getting user avatar (need to provide a user id)      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

<br>

<strong>[PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)</strong> Endpoints:

|  Endpoint  | Verb  |                  Description                   |
| :--------: | :---: | :--------------------------------------------: |
| /users/me  | PATCH |             Updating user profile              |
| /tasks/:id | PATCH | Updating user task (need to provide a task id) |

<br>

<strong>[DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)</strong> Endpoints:

|     Endpoint     |  Verb  |                  Description                   |
| :--------------: | :----: | :--------------------------------------------: |
|    /users/me     | DELETE |             Deleting user profile              |
| /users/me/avatar | DELETE |              Deleting user avatar              |
|    /tasks/:id    | DELETE | Deleting user task (need to provide a task id) |

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**. For more details, check out the [contributing guidelines](CONTRIBUTING.md).

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

## License

Distributed under GNU AGPL 3.0. See [LICENSE](LICENSE) for more information.

## Contact

Shubhranil Dutta - contact@shubhranil.com

Project Link: [https://github.com/alpha037/atlas-task-manager](https://github.com/alpha037/atlas-task-manager)
