# PlatePlan — Beginner Full-Stack Recipe Planner

This project has a React frontend and a small Node.js + Express backend. It uses JSON files as a simple local database so you can learn the basics without setting up MongoDB.

## Requirements
- Install Node.js (LTS version).
- Extract this ZIP and open the `plateplan-professional` folder in VS Code.

## Start the project
Open the VS Code terminal in the project folder and run:

```bash
npm install
npm run dev
```

The React website opens at the local URL printed by Vite (usually `http://localhost:5173`). The backend runs at `http://localhost:5000`.

**Important:** Run `npm run dev` from the main project folder, where `package.json` is located. Keep the terminal open while using the website.

## Where the backend stores information
- `server/data/recipes.json` — recipes added, edited, and deleted in the admin page.
- `server/data/plan.json` — the meal plan and serving counts.

The server creates these files the first time it runs. The initial recipes are loaded from `server/initialRecipes.json`.

## Main folders
- `src/components/` — reusable Header, Footer, RecipeCard, and RecipeForm.
- `src/pages/` — Home, Recipes, RecipeDetails, MealPlan, Admin, About, Contact.
- `src/services/api.js` — frontend functions that call the backend.
- `server/index.js` — backend routes and JSON file storage.

## Backend routes
- `GET /api/recipes` — get all recipes.
- `POST /api/recipes` — create a recipe.
- `PUT /api/recipes/:id` — edit a recipe.
- `DELETE /api/recipes/:id` — delete a recipe.
- `GET /api/plan` — get the saved meal plan.
- `PUT /api/plan` — save the meal plan.

## Learning note
This is a local learning project. The JSON files are a simple database for one computer, not a production database. The admin page does not have a login yet, so do not publish this version publicly as a secure service.
