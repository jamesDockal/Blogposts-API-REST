# Blogposts-API-REST

An REST API to create blog posts. <br>
Using `express`, `typescript` and `typeorm` with a `sqlite` `database`.

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
> > GET `user/` <br>
> > Get all the users.
> >
> > POST `user/register` <br>
> > Register user passing JSON on body with the following information.
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
> > GET `blogpost/` <br>
> > Show all posts.
> >
> > POST `blogpost/create` <br>
> > Create a new post. <br>
> > But the user `must be logged in`. <br>
> > The user must use an `authorization` header with value: `"Bearer {token}"`.<br>
> > The token you get in the route `user/login`.
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
> >   "title": "React, getting started!",
> >   "content": "A introduce to the front-end framework React.js",
> >   "slug": "React.js"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "post": {
> >     "title": "React, getting started!",
> >     "content": "A introduce to the front-end framework > > React.js",
> >     "slug": "React.js",
> >     "created_by": "c1fee994-4969-4d31-9649-705748850364",
> >     "id": "88270e66-a244-433d-9605-a5639c3b57ec"
> >   }
> > }
> > ```

## Run The Tests

`npm test`
