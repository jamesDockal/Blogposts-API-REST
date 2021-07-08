# Blogposts-API-REST

An REST API to create blog posts <br>
Using `express`, `typescript` and `typeorm` with a `sqlite` `database`

## Getting Started

### Installing The Dependencies

    npm install

### Run The Localhost Server

    npm start

> The default port is `3000`. <br>
> To change it go to `.env` and create the variable `SERVER_PORT` and add the port that you want.

## Routes

> > ### User
> >
> > #### GET `user/` <br>
> >
> > Get all the users
>
> > #### POST `user/register` <br>
> >
> > Register user passing JSON on body with the following information
> > | Object Field | Type | Required |
> > |--------------------|--------|-------- |
> > | `username` | string |true |
> > | `password` | string |true |
> >
> > ##### Example:
> >
> > ```json
> > {
> >   "username": "James",
> >   "password": "hard_password.com"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> > "user": {
> >   "id":"350119c2-31dc-4a53-a166-a96ad55a38ac",
> >   "username": "James",
> >   },
> > "token": {
> >   "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> >  }
> > }
> > ```
> >
> > #### POST `user/login` <br>
> >
> > login user passing JSON on body with the following information
> > | Object Field | Type | Required |
> > |--------------------|--------|-------- |
> > | `username` | string |true |
> > | `password` | string |true |
> >
> > ##### Example:
> >
> > ```json
> > {
> >   "username": "James",
> >   "password": "hard_password.com"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> > "token": {
> >   "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> >  },
> >  "id":"350119c2-31dc-4a53-a166-a96ad55a38ac",
> > }
> > ```

> > ### Blogpost
> >
> > GET `blogpost/` <br>
> > Show all posts
> >
> > POST `blogpost/create` <br>
> > Create a new post <br>
> > But the user must be logged in
> > | Object Field | Type | Required |Description |
> > |--------------------|--------|-------- |-------- |
> > | `title` | string |true | The title of the post
> > | `content` | string |true |The conent of the post
> > | `slug` | string |true |The slug of the post
> >
> > ##### Example:
> >
> > ```json
> > {
> >   "username": "James",
> >   "password": "hard_password.com"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "token": {
> >     "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> >   }
> > }
> > ```

## Run The Tests

`npm test`
