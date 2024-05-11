import "dotenv/config";
import express from "express";
const app = express();
const jokes = [
  {
    id: 1,
    joke: "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t.",
  },
  {
    id: 2,
    joke: "If doctors were like software engineers, they would say things like “Have you tried killing yourself and being reborn?",
  },
  {
    id: 3,
    joke: "I would love to change the world, but they won’t give me the source code.",
  },
  {
    id: 4,
    joke: "There are 10 types of people in the world: those who understand binary, and those who don’t.",
  },
  { id: 5, joke: "C++ : Where friends have access to your private members." },
  {
    id: 6,
    joke: "Perl – The only language that looks the same before and after RSA encryption.",
  },
];

//Cors is the bascially the cross origion resource sharing whic h bwoul be provide the sfety to th application that no other url would access the api until it would be same origin as the server so it can be enable by the allowing the cross origin in the backend side

app.get("/", (req, res) => {
  res.send("This is Server");
});

app.get("/api/jokes", (req, res) => {
  res.json(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
