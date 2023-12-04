# user api docs

## post requests

### Create New User

#### POST `/create-user`

Create a new user by providing user information. The user's password is securely hashed before being stored in the database.

- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```

### authenticate user with password

Authenticates the user when they put their password in.

#### POST `/authenticate-user`

Authenticate user with, a jwt will be sent back to the client.

- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```

### User Logout

Logs the user out of their account and clears the users auth cookie

#### POST `/user/user-log-out`

Authenticate user with, a jwt will be sent back to the client.

- request body:

```
{
  "message": "Cookie cleared - User logged out"
}
```

## get requests

### authenticate user with google

#### GET `/auth/google`

Authenticate user using google oAuth 2.0, once the user authenticates themself, they will be routed to `/auth/google/calback` and a callback function will be triggered, the client will receive a JWT inside a cookie, as well as information on the user, name, email, etc.

- environment variables:

```
process.env.GOOGLE_CLIENT_ID
process.env.GOOGLE_CLIENT_SECRET
```

- response body:

```
{
"userData": {
"id": "10324343870",
"displayName": "Dieter Bohlen",
"name": {
"familyName": "Bohlen",
"givenName": "Dieter"
},
"photos": [
{
"value": "https://lh3.googleusercontent.com/a/ACq6ZYz=s96-c"
}
],
"provider": "google",
"\_raw": "{\n \"sub\": \"105518870\",\n \"name\": \"Dieter\",\n \"given_name\": \"Dieter\",\n \"family_name\": \"Bohlen\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8oc8cX6ZYz\\u00336-c\",\n \"locale\": \"en-GB\"\n}",
"\_json": {
"sub": "10551873241342470",
"name": "Dieter Bohlen",
"given_name": "Dieter",
"family_name": "Bohlen",
"picture": "https://lh3.googleusercontent.com/a/ACg8oDIjIUIX6ZYz=s94-c",
"locale": "en-GB"
}
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.jgEwNTsdfiIHUhuidODAzMTMyNDI4ODg3MUidcUHuiuidscdjscnzLuEbU0Mjo2eX8jwihzE"
}

```

### Get User by Id

Retrieve a user's information by their id

#### GET `/user/get-user-by-id`

Authenticate user with, a jwt will be sent back to the client.

- request body:

```
{
  "_id": "asdfsd7687adsf3y4g43f4ds"
}
```

- response body:

```
{
  "_id": "653bec8ac89832077",
  "userName": "Kamren",
  "email": "Elinore.Ritchie61@gmail.com",
  "password": "$2b$10$dHc3tHDflU2OyLF6e",
  "shoppingCart": [
  ],
  "orders": [],
  "terms": true,
  "profileImage": "http://localhost:3000/uploads/1699374834371-duck_lady_walking.png",
  "createdAt": "2023-03-06T15:46:34.458Z",
  "updatedAt": "2023-03-06T15:47:14.420Z",
  "__v": 42,
  "address": {
    "firstName": "Maja",
    "lastName": "Maah",
    "streetName": "Mah Street",
    "houseNumber": 3,
    "postCode": 1234,
    "city": "Berlin",
    "country": "Germany"
  }
}

```

### Get User by Email

gets the users details by their email

#### POST `/user/get-user-by-email`

- request body:

```
{
  "email": "dieter123@gmail.com"
}
```

- response body:

```
{
  same response like above, just the users details
}
```

## put requests

#### PUT `/user/change-user-password`

Change Users Password.

- request body:

```

{\_id: "sdafiu23hu4i72183y872d", password: "password123", newPassword: "newpass123"}

```

### Update Users Address

Updates the users password if it exists or creates one if they haven't yet given one

#### PUT `/user/update-user-address`

- request body:

```

{\_id: "asdfsdfds8h43h3f4h84husid"}

```

- response body

```
{
  "firstName": "Dieter",
  "lastName": "Bohlen",
  "streetName": "fake street",
  "houseNumber": 8,
  "postCode": 13357,
  "city": "Berlin",
  "country": "Germany"
}

```
