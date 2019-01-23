import express from "express";
// import cors from "cors";
// import "source-map-support/register";
import reactroutes from "./routes/reactRoutes";

const app = express();

// app.use(cors());
app.use(express.static("public"));

app.get("/api/news", (req, res) => {
  res.json([
    {
      id: 1,
      upvotes: 130,
      title: "Fianto Duri, the complete tutorial",
      author: "RubeusH",
      date: new Date("2017-04-14T15:30:00.000Z")
    },
    {
      id: 2,
      upvotes: 126,
      title: "Ordinary Wizarding Levels study guide",
      author: "BathBabb",
      date: new Date("2017-04-14T15:30:00.000Z")
    }
  ]);
});

app.get("*", reactroutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
