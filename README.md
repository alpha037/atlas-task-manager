[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# atlas-task-manager

A RESTful API for creating, reading and managing tasks and their respective users. Hosted on MongoDB Atlas, this REST api provides fast
access to anything you need. Documentation provided below.

## Deployment

Deployed at http://task-manager.shubhranil.com

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

## API Endpoints

- Signing up users: http://task-manager.shubhranil.com/users - [POST]
- Creating tasks for users: http://task-manager.shubhranil.com/tasks - [POST]
- Logging in users : http://task-manager.shubhranil.com/users/login - [POST]
- Logging out users : http://task-manager.shubhranil.com/users/logout - [POST]
- Logging out all user sessions from multiple devices : http://task-manager.shubhranil.com/users/logoutAll - [POST]
- Uploading user avatar : http://task-manager.shubhranil.com/users/me/avatar - [POST]
- Getting user profile : http://task-manager.shubhranil.com/users/me/ - [GET]
- Getting user tasks (all) : http://task-manager.shubhranil.com/tasks - [GET]
- Getting a specific user task (need to provide task id) : http://task-manager.shubhranil.com/tasks/id - [GET]
- Getting user tasks (sorted by created time ASC) : http://task-manager.shubhranil.com/tasks?sortBy=createdAt - [GET]
- Getting user tasks (sorted by created time DESC) : http://task-manager.shubhranil.com/tasks?sortBy=createdAt_desc - [GET]
- Getting user tasks (only which are completed) : http://task-manager.shubhranil.com/tasks?completed=true - [GET]
- Getting user tasks (only which are NOT completed) : http://task-manager.shubhranil.com/tasks?completed=false - [GET]
- Getting user tasks (limiting to 1 task. can provide any number instead of 1 according to usage) : http://task-manager.shubhranil.com/tasks?limit=1 - [GET]
- Getting user tasks (limiting and skipping for pagination. can provide any number instead of 3 and 2 according to usage) : http://task-manager.shubhranil.com/tasks?limit=3&skip=2 - [GET]
- Getting user profile picture / avatar (need to provide user id) : http://task-manager.shubhranil.com/users/id/avatar - [GET]
- Updating user profile : http://task-manager.shubhranil.com/users/me/ - [PATCH]
- Updating user task (need to provide task id) : http://task-manager.shubhranil.com/tasks/id - [PATCH]
- Deleting user profile : http://task-manager.shubhranil.com/users/me/ - [DELETE]
- Deleting user avatar : http://task-manager.shubhranil.com/users/me/avatar - [DELETE]
- Deleting users task (need to provide task id) : http://task-manager.shubhranil.com/tasks/id - [DELETE]

## Built With

- [Nodejs](https://nodejs.org/en/docs/) - The Javascript runtime framework used
- [MongoDB](https://docs.mongodb.com/manual/) - The Database used

## Authors

- **Shubhranil Dutta** - [alpha037](https://github.com/alpha037)
