const express = require("express");
const axios = require("axios");
const pkceChallenge = require("pkce-challenge").default;

const app = express();
const appPort = 5000;

const authEndpoint = "http://keycloak-development-service:8080/realms/myapprealm/protocol/openid-connect/auth";
const tokenEndpoint = "http://keycloak-development-service:8080/realms/myapprealm/protocol/openid-connect/token";

const apiProtectedEndpoint = "http://mybackend-clusterip:4000/webapp/games";
const apiUnprotectedEndpoint = "http://mybackend-clusterip:4000/webapp/favourites";

const clientId = "myappclient";
const clientSecret = "CCOCxOSEFtc9IERUicsriQgD8FjYWKwx";

const {code_verifier,code_challenge} =  pkceChallenge();

const codeVerifier = code_verifier 
const codeChallenge = code_challenge

const redirectUrl = "http://localhost:80/web/myredirect";

const authRequest = `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUrl}&
code_challenge=${codeChallenge}&
code_challenge_method=S256`;

app.get("/", (req, res) => {
    return axios.get(apiUnprotectedEndpoint)
  .then((result) => {
    res.set("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>      
       <body>
       <nav>
       <h2>Games Database</h2>
        <div>
        <a href="${authRequest}">Login</a>
        </div>
        </nav>
        <h3>Our Favourite Games:</h3>
        <p>${result.data.favourites ? result.data.favourites.map((favourite)=>favourite.title) : "No favourites added yet..."} </p>
        <h3> Add Your Favourites: </h3>
        <form id="form" action=${apiUnprotectedEndpoint} method="post" enctype='application/x-www-form-urlencoded'>
        <label for="cover">Cover Url: </label>
        <input type="text" id="cover" name="cover" />
        <label for="title">Title: </label>
        <input type="text" id="title" name="title" />
        <button type="submit">Send </button>
        </form>
        </body>
        </html>
       `);
  })
  .catch((error) => {
    console.log(error);
    res.set("Content-Type", "text/html");
    res.send(`
    <!DOCTYPE html>
     <body>
     <h2>Error</h2>
     </body>
    </html>
    `);
  });
})

app.get("/myredirect", (req, res) => {
    const params = new URLSearchParams();
  
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", redirectUrl);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("code_verifier", codeVerifier);
    params.append("code", req.query.code);
  
    return axios
      .post(tokenEndpoint, params)
      .then((result) => {
        accessToken = result.data.access_token || "";
        return axios.get(apiProtectedEndpoint, { headers: {Authorization: "Bearer " + accessToken }});
      })
      .then((result) => {
        res.set("Content-Type", "text/html");
        res.send(`
          <!DOCTYPE html>
            <body>
            <h2>All Our Games</h2>
            <p>${result.data.games ? result.data.games.map((game)=>game.title) : "No games added yet..."} </p>
            <form id="form" action=${apiProtectedEndpoint} method="post">
            <label for="cover">Cover Url: </label>
            <input type="text" id="cover" name="cover" />
            <label for="title">Title: </label>
            <input type="text" id="title" name="title" />
            <button type="submit">Send </button>
            </form>
            </body>
            </html>
           `);
      })
      .catch((error) => {
        console.log(error);
        res.set("Content-Type", "text/html");
        res.send(`
          <!DOCTYPE html>
           <body>
           <h2>Error</h2>
           </body>
          </html>
          `);
      });
  });

app.listen(appPort, (err) => {
  console.log(`App listening on port ${appPort}`);
});