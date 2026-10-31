# VidChat: Backend

The REST API for **VidChat**, a language-exchange app with real-time chat and video calls. It handles authentication, user profiles and onboarding, friend requests and notifications, and it issues [Stream](https://getstream.io/) tokens so the frontend can connect to Stream Chat and Stream Video.

**Frontend repo:** [VideoChat-frontend](https://github.com/mayurgarg08/VideoChat-frontend) · **Live app:** [mayurvideochat.netlify.app](https://mayurvideochat.netlify.app/)

## Features

- JWT authentication stored in an HTTP-only cookie (7-day expiry), with passwords hashed by bcrypt
- Every new user is registered (upserted) in Stream, and a random avatar is assigned at sign-up
- Onboarding: bio, native language, learning language and location
- Recommended users (onboarded users who are not you and not already your friends)
- Friend requests: send, accept, list incoming and outgoing
- Notifications for messages and friend activity, with read/unread status
- Stream token endpoint for chat and video

## Tech stack

Node.js · Express 5 · MongoDB / Mongoose · JSON Web Token · bcryptjs · cookie-parser · CORS · Stream Chat server SDK

## API

Base URL: `/api`

### Auth (`/api/auth`)
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Create an account |
| POST | `/login` | Log in |
| POST | `/logout` | Log out |
| POST | `/onboarding` | Complete your profile (protected) |
| GET | `/me` | Current user (protected) |

### Users (`/api/users`): all protected
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Recommended users |
| GET | `/friends` | Your friends |
| POST | `/friend-request/:id` | Send a friend request |
| PUT | `/friend-request/:id/accept` | Accept a request |
| GET | `/friend-requests` | Incoming requests and accepted notifications |
| GET | `/outgoing-friend-requests` | Requests you have sent |
| POST | `/message-notification` | Create a message notification |
| GET | `/notifications` | Your notifications |
| PATCH | `/notifications/mark-all-read` | Mark all notifications as read |
| PATCH | `/notifications/:id/read` | Mark one notification as read |

### Chat (`/api/chat`)
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/token` | Get a Stream user token (protected) |

## Project structure

```
src/
  controllers/   auth, user, chat
  middleware/    auth.middleware.js (JWT cookie check)
  models/        User, FriendRequest, Notification
  routes/        auth.route.js, user.route.js, chat.route.js
  lib/           db.js (MongoDB), stream.js (Stream client)
  server.js
```

## Getting started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- A [Stream](https://getstream.io/) app (API key and secret)

### Setup

```bash
git clone https://github.com/mayurgarg08/VideoChat-backend.git
cd VideoChat-backend
npm install
```

Create a `.env` file:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

```bash
npm run dev      # nodemon
# or
npm start
```

> CORS allows `http://localhost:5173` and the production Netlify URL. Edit `src/server.js` if you deploy the frontend somewhere else.

## Author

**Mayur Garg** · [GitHub](https://github.com/mayurgarg08) · [LinkedIn](https://www.linkedin.com/in/mayur-garg-428a291b4/)
