const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRECT = "PANTSUMARUMIE";

const users = [
  {
    id: 1,
    username: "debviluke",
    password: "123",
    roles: ["admin"],
    scopes: ["delete:users", "delete:posts"],
  },
  {
    id: 2,
    username: "lemillion",
    password: "123",
    roles: ["viewer"],
    scopes: [],
  },
];

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("Root"));

/**
 * Sign token
 */
app.post("/auth/login", (req, res) => {
  // Check credentials
  const credentials = req.body;

  let user = users.find((user) => user.username === credentials.username);
  if (!user || user.password !== credentials.password) {
    return res.status(400).send("Bad request");
  }

  // Sign token
  const payload = { sub: user.id };
  const accessToken = jwt.sign(payload, JWT_SECRECT, { expiresIn: "1 day" });

  // Respond with token and user information
  const { id, password, ..._user } = user;
  const response = {
    accessToken,
    me: _user,
  };

  return res.json(response);
});

/**
 * Verify and refresh token
 */
app.get("/auth/verify", (req, res) => {
  // Check token exists
  const header = req.header("Authorization");

  if (!header) {
    return res.status(400).send("Authorization is required");
  }

  const [_, accessToken] = header.split(" ");

  // Check token integrity
  let payload;
  try {
    payload = jwt.verify(accessToken, JWT_SECRECT);
  } catch (error) {
    return res.status(400).send("Invalid token");
  }

  // Retrieve user information and refresh token
  const user = users.find((user) => user.id === payload.sub);
  const refreshPayload = {
    sub: user.id,
  };
  const refreshToken = jwt.sign(refreshPayload, JWT_SECRECT, {
    expiresIn: "1 day",
  });

  // Respond with refresh token and user information
  const { id, password, ..._user } = user;
  const response = {
    accessToken: refreshToken,
    me: _user,
  };

  return res.json(response);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
