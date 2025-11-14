# Songs API 🎵

A simple REST API for managing a music collection, deployed on Render.

**Base URL:** [https://nodejs-simple-api-108h.onrender.com/](https://nodejs-simple-api-108h.onrender.com/)

---

## Endpoints

### Public Endpoints (No API Key Required)

| Method | Endpoint  | Description                |
| ------ | --------- | -------------------------- |
| GET    | `/`       | Welcome message & API info |
| GET    | `/health` | Health check               |

---

### Protected Endpoints (API Key Required)

> Include your API key in the header as `X-API-Key: <YOUR_API_KEY>`

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/songs`     | Get all songs       |
| GET    | `/songs/:id` | Get song by ID      |
| POST   | `/songs`     | Create a new song   |
| PUT    | `/songs/:id` | Update a song by ID |
| DELETE | `/songs/:id` | Delete a song by ID |

---

## API Key

* Your API is protected with an API key.
* Requests without a valid key will return:

```
{
  "error": "Unauthorized",
  "message": "API key is required. Provide it in X-API-Key header or Authorization header."
}
```

* Requests with an invalid key will return:

```
{
  "error": "Forbidden",
  "message": "Invalid API key"
}
```

---

## Example curl Requests

### Get all songs

```
curl -H "X-API-Key:my-super-secret-api-key-change-this-in-production" \
     https://nodejs-simple-api-108h.onrender.com/songs
```

### Get a song by ID

```
curl -H "X-API-Key:my-super-secret-api-key-change-this-in-production" \
     https://nodejs-simple-api-108h.onrender.com/songs/1
```

### Create a new song

```
curl -X POST -H "Content-Type: application/json" \
     -H "X-API-Key:my-super-secret-api-key-change-this-in-production" \
     -d '{"title":"New Song","artist":"New Artist","album":"New Album","year":2025,"duration":"3:00"}' \
     https://nodejs-simple-api-108h.onrender.com/songs
```

### Update a song

```
curl -X PUT -H "Content-Type: application/json" \
     -H "X-API-Key:my-super-secret-api-key-change-this-in-production" \
     -d '{"title":"Updated Song"}' \
     https://nodejs-simple-api-108h.onrender.com/songs/1
```

### Delete a song

```
curl -X DELETE -H "X-API-Key:my-super-secret-api-key-change-this-in-production" \
     https://nodejs-simple-api-108h.onrender.com/songs/1
```

---

## Notes

* API key is required for all `/songs` endpoints.
* The database comes pre-seeded with sample Kanye West songs.
* Directly visiting the URL in a browser without the API key will return an Unauthorized
