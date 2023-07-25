import express from "express";
import { Vector } from "./domain/entity/vector.js";
import { Embedding } from "./infra/embedding/index.js";
import { DocumentConttroller } from "./infra/document/index.js";

const app = express();
const port = 3000;

const embedder = new Embedding();
const documentController = new DocumentConttroller(embedder)

app.get("/embed", async (req, res) => {
  const text = req.query.text;
  if (!text) {
    return res.status(400).send("Text parameter is missing.");
  }

  try {
    const vector = new Vector("test", text as string, embedder);
    await vector.setValue();

    return res.send(vector);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/pdf", async (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).send("filename parameter is missing.");
  }

  const pathName = "./pdf/"+ filename

  const vector = await documentController.get(filename as string,pathName)

  try {
    await vector.setValue();

    return res.send(vector);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/compare", async (req, res) => {
  const text1 = req.query.text1;
  const text2 = req.query.text2;
  if (!text1 || !text2) {
    return res
      .status(400)
      .send("Both text1 and text2 parameters are required.");
  }

  try {
    const vector1 = new Vector("test", text1 as string, embedder);
    await vector1.setValue();
    const vector2 = new Vector("test", text2 as string, embedder);
    await vector2.setValue();
    const similarity = vector1.compareOne(vector2);
    return res.send({ similarity });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
