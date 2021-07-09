# Blogposts-API-REST

An REST API to create blog posts. <br>
Using `express`, `typescript` and `typeorm` with a `sqlite` `database`.

> ## Getting Started
>
> > ### Installing The Dependencies
> >
> >     npm install
>
> > ### Run The Migrations
> >
> >     npm run typeorm migration:run
> >
> > ### Run The Localhost Server
> >
> >     npm start
> >
> > The default port is `3000`. <br>
> > To change it go to `.env` and create the variable `SERVER_PORT` and > add the port that you want.

> ## Routes
>
> > ### User
> >
> > ##### GET `user/` <br>
> >
> > Get all the users.
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "user": [
> > {
> >     "id":"350119c2-31dc-4a53-a166-a96ad55a38ac",
> >     "username": "James",
> > },
> > {
> >     "id":"faf90566-148f-46fc-973c-bd7581d7af9a",
> >     "username": "Maycon",
> > }
> > ```
> >
> > ##### POST `user/register` <br>
> >
> > Register user passing JSON on body with the following information.
> > | Body | Type | Required |
> > |--------------------|--------|-------- |
> > | `username` | string |True |
> > | `password` | string |True |
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
> >
> > ```
> >
> > ##### POST `user/login` <br>
> > To get logged to use other `routes`, <br>
> > you need to use the `header` with the name `authorization`, <br>
> > And use the value as `Bearer {token}`. <br>
> > To get the token you need to pass a JSON on body with the following information.
> > | Body | Type | Required |
> > |--------------------|--------|-------- |
> > | `username` | string |True |
> > | `password` | string |True |
> > 
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
> >   "token": "eyJhbGciOiJIUzI1NiJ9.MzUwMTE5YzItMzFkYy00YTUzLWExNjYtYTk2YWQ1NWEzOGFj.W_TBtC5gRY6hssrK6JGHRKr3ETzFXQDctXVZVPOuPjY",
> >   "id": "50acaafd-129d-4df7-8579-a10784eebf12"
> > }
> > ```
>
> > ### Blogpost
> >
> > ##### GET `blogpost/` <br>
> >
> > Show all posts.
> >
> > GET `blogpost/:slug-of-some-post` <br>
> > Show a single post by a given slug.
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "post": {
> >     "id": "9177f54e-ecd1-4444-a761-2f0cfc91b0b4",
> >     "title": "React, getting started",
> >     "content": "introduce to the front-end framework React.js",
> >     "slug": "react-getting-started",
> >     "created_by": "50acaafd-129d-4df7-8579-a10784eebf12"
> >   }
> > }
> > ```
> >
> > ##### POST `blogpost/create` <br>
> >
> > Create a new post. <br>
> > The user must be `logged in`. <br>
> > The user must use an `authorization` header with value: <br> > > `"Bearer {token}"`.<br>
> > The token you get in the route `user/login`.
> > | Body | Type | Required |Description |
> > |--------------------|--------|-------- |-------- |
> > | `title` | string |True | The title of the post
> > | `content` | string |True |The content of the post
> >
> > ##### Example:
> >
> > ```json
> > {
> >   "title": "React, getting started!",
> >   "content": "A introduce to the front-end framework React.js"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "post": {
> >     "title": "React, getting started!",
> >     "content": "A introduce to the front-end framework React.js",
> >     "slug": "react-getting-started",
> >     "created_by": "c1fee994-4969-4d31-9649-705748850364",
> >     "id": "88270e66-a244-433d-9605-a5639c3b57ec"
> >   }
> > }
> > ```
> >
> > ##### PUT `blogpost/:id-of-the-post` <br>
> >
> > Update a post. <br>
> > For udate a post you must use the method PUT and pass the post `slug` in the URL.<br>
> > You can provide a new title or a new content on the body.<br>
> > The user must be `logged in`. <br>
> > The user must use an `authorization` header with value: <br>`"Bearer {token}"`.<br>
> > The token you get in the route `user/login`.
> > | Body | Type | Required |Description |
> > |--------------------|--------|-------- |-------- |
> > | `title` | string | False | The new title of the post
> > | `content` | string |False |The new content of the post
> >
> > ##### Example:
> >
> > ```json
> > {
> >   "title": "A Brand New Title!",
> >   "content": "A new point of view to the front-end framework React.js"
> > }
> > ```
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "post": {
> >     "title": "A Brand New Title!",
> >     "content": "A new point of view to the front-end framework React.js",
> >     "slug": "a-brand-new-title",
> >     "created_by": "c1fee994-4969-4d31-9649-705748850364",
> >     "id": "88270e66-a244-433d-9605-a5639c3b57ec"
> >   }
> > }
> > ```
> >
> > ##### DELETE `blogpost/:id-of-the-post` <br>
> >
> > Delete a post. <br>
> > For delete a post you must use the method DELETE and pass the post `id` in the URL.<br>
> > The user must be `logged in`. <br>
> > The user must use an `authorization` header with value: <br> > > `"Bearer {token}"`.<br>
> > The token you get in the route `user/login`.
> >
> > ##### Example:
> >
> > ##### Response:
> >
> > ```json
> > {
> >   "success": "Post deleted"
> > }
> > ```

> ## Run The Tests
>
>     npm test
