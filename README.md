# Movie Review Service

Movie Review Service is a microservice that provides a REST API for movies.

### Dependencies

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Installation

```bash
git clone https://github.com/buraksaraloglu/movie-review-service.git
cd movie-service
npm install
```

### Development

```bash
npm dev
```

### Deployment

```bash
npm run build
```

### Usage

```bash
npm start
```

### Testing

```bash
npm test
```

## Example Requests

**Get All Reviews of User**

```bash
# GET /review?limit=20&skip=0

curl --location --request GET 'http://localhost:5000/review' \
  --header 'user: <userId>' \
```

**Get Review of a User by Movie Id**

```bash
# GET /movie/:movieId

curl --location --request GET 'http://localhost:5000/review/:movieId' \
  --header 'user: <userId>' \
```

**Create Review**

```bash
# POST /review/:movieId

curl --location --request POST '<service-uri>/review/:movieId' \
  --header 'Content-Type: application/json' \
  --header 'user: <userId>' \
  --data-raw '{
    "rating": 6.7,
  }'
```

**Update Movie**

```bash
# PUT /review/:movieId

curl --location --request PUT '<service-uri>/review/:movieId' \
  --header 'Content-Type: application/json' \
  --header 'user: <userId>' \
  --data-raw '{
    "rating": 8.3,
    "comment": "It was better on second watch"
  }'
```
