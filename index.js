import express from "express";
import router from "./route.js";

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({
//     extended: true
// }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.use('/api/products', router);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});