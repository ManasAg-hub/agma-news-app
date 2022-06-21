const express = require("express");
const request = require("request");
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});

const apiKey = "1ade308bf93d44e7858bbe00ca838e5f";
const fetchNews = (category, country) =>{
    return axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`).then(response=>{
        // console.log(response.data);
        return response.data;
    }).catch(err=>err);
}

const fetchNewsBySearch = (q) =>{
    return axios.get(`https://newsapi.org/v2/top-headlines?q=${q}&apiKey=${apiKey}`).then(response=>{
        // console.log(response.data);
        return response.data;
    }).catch(err=>err);
}

app.get("/news", async(req, res) => {
    const {category, country} = req.query;
    // console.log(req.query);
    const data = await fetchNews(category, country);
    res.json(data);
});

app.get("/news/search", async(req, res) =>{
    const {q} = req.query;
    const data = await fetchNewsBySearch(q);
    res.json(data);
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
