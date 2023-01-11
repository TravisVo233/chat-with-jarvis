//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
//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
//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
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-81P1ZbPvuqL09pv5067DiMGq",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

// app.get("/", (req, res) => {
//     console.log()
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    })
  //   .then((res) => {
  //     console.log("oke");
  //   })
  //   .catch((err) => console.log(err.message));
  res.json({
    message: response.data.choices[0].text,
  });
});
