import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import initialRecipes from './initialRecipes.json' with { type: 'json' };

const app = express();
const PORT = 5000;
const folder = path.dirname(fileURLToPath(import.meta.url));
const dataFolder = path.join(folder, 'data');
const recipesFile = path.join(dataFolder, 'recipes.json');
const planFile = path.join(dataFolder, 'plan.json');
app.use(express.json());

async function readData(file, fallback) {
  await fs.mkdir(dataFolder, { recursive: true });
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { await fs.writeFile(file, JSON.stringify(fallback, null, 2)); return fallback; }
}
async function writeData(file, data) {
  await fs.mkdir(dataFolder, { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

app.get('/api/recipes', async (req, res) => {
  res.json(await readData(recipesFile, initialRecipes));
});
app.post('/api/recipes', async (req, res) => {
  const recipes = await readData(recipesFile, initialRecipes);
  const recipe = { ...req.body, id: String(Date.now()) };
  recipes.unshift(recipe);
  await writeData(recipesFile, recipes);
  res.status(201).json(recipe);
});
app.put('/api/recipes/:id', async (req, res) => {
  const recipes = await readData(recipesFile, initialRecipes);
  const index = recipes.findIndex(item => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Recipe not found' });
  recipes[index] = { ...req.body, id: req.params.id };
  await writeData(recipesFile, recipes);
  res.json(recipes[index]);
});
app.delete('/api/recipes/:id', async (req, res) => {
  const recipes = await readData(recipesFile, initialRecipes);
  const updated = recipes.filter(item => item.id !== req.params.id);
  await writeData(recipesFile, updated);
  const plan = await readData(planFile, []);
  await writeData(planFile, plan.filter(item => item.id !== req.params.id));
  res.json({ success: true });
});
app.get('/api/plan', async (req, res) => res.json(await readData(planFile, [])));
app.put('/api/plan', async (req, res) => {
  const plan = Array.isArray(req.body) ? req.body : [];
  await writeData(planFile, plan);
  res.json(plan);
});
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.listen(PORT, () => console.log(`PlatePlan backend running at http://localhost:${PORT}`));
