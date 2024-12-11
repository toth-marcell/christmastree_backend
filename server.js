import express from "express";
import { Decoration } from "./models.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.locals.siteName = "Dekorációk";

// api
app.get("/api/decorations", async (req, res) =>
  res.json(await Decoration.findAll()),
);
app.post("/api/decorations", async (req, res) => {
  const existingDecor = await Decoration.findByPk(req.body.id);
  if (existingDecor) {
    await existingDecor.update({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
  } else
    await Decoration.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    });
});
app.delete(
  "/api/decorations",
  async (req, res) => await Decoration.destroy({ where: { id: req.body.id } }),
);
app.put("/api/decorations", async (req, res) => {
  const decor = await Decoration.findByPk(req.body.id);
  if (decor.stock >= req.body.pcs) {
    await decor.update({ stock: decor.stock - req.body.pcs });
  } else apiError(res, res, `Sajnos ennyi ${decor.name} nincs raktáron.`);
  res.end();
});
async function apiError(req, res, msg) {
  res.statusCode = 400;
  res.json({ msg: msg });
  res.end();
}
// web
app.get("/", (req, res) => res.redirect("/decorations"));
app.get("/decorations", async (req, res) =>
  res.render("decorations", { decorations: await Decoration.findAll() }),
);

const port = 8000;
app.listen(port, () => console.log(`Listening on :${port}`));

// for (let i = 0; i < 5; i++) {
//   await Decoration.create({
//     name: "dísz" + i,
//     price: i * 100,
//     stock: i * 200,
//   });
// }
