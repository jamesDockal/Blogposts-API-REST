# Blogposts-API-REST

An REST API to create blog posts
Using `express`, `typescript` and `typeorm` with a `sqlite` `database`

## Getting Started

### Installing The Dependencies

    npm install

### Run The Localhost Server

    npm start

> The default port is `3000`. <br>
> To change it go to `.env` and create the variable `SERVER_PORT` and add the port that you want.

## Routes

> ### User
>
> > GET `user/` <br>
> > Get all the users
>
> > POST `user/register` <br>
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

> > ### Blogpost
> >
> > POST `user/login` <br>
> > Login user
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
> >   "token": {
> >     "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY"
> >   }
> > }
> > ```

## Run The Tests

`npm test`
