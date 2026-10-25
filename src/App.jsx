import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import MealPlan from "./pages/MealPlan";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { text } from "./text";
import {
  createRecipe,
  deleteRecipe,
  getPlan,
  getRecipes,
  savePlan,
  updateRecipe,
} from "./services/api";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [plan, setPlan] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem("pp-lang") || "en");
  const [theme, setTheme] = useState(
    localStorage.getItem("pp-theme") || "light",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const t = text[lang];

  useEffect(() => {
    async function loadData() {
      try {
        const [recipeData, planData] = await Promise.all([
          getRecipes(),
          getPlan(),
        ]);
        setRecipes(recipeData);
        setPlan(planData);
      } catch {
        setError("Backend is not running. Please run npm run dev.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("pp-lang", lang);
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("pp-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!loading && !error)
      savePlan(plan).catch(() => setError("Could not save the meal plan."));
  }, [plan, loading]);

  function addToPlan(recipe) {
    setPlan((current) =>
      current.some((item) => item.id === recipe.id)
        ? current
        : [...current, { id: recipe.id, servings: recipe.baseServings }],
    );
  }

  async function saveRecipe(recipe) {
    const saved = recipe.id
      ? await updateRecipe(recipe)
      : await createRecipe(recipe);
    setRecipes((current) =>
      recipe.id
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...current],
    );
    setError("");
  }

  async function removeRecipe(id) {
    await deleteRecipe(id);
    setRecipes((current) => current.filter((item) => item.id !== id));
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  if (loading)
    return (
      <div className="container section">
        <h2>Loading PlatePlan...</h2>
      </div>
    );
  return (
    <div className="app">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />
      {error && <div className="container notice">{error}</div>}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} onAdd={addToPlan} t={t} />}
          />
          <Route
            path="/recipes"
            element={<Recipes recipes={recipes} onAdd={addToPlan} t={t} />}
          />
          <Route
            path="/recipes/:id"
            element={
              <RecipeDetails recipes={recipes} onAdd={addToPlan} t={t} />
            }
          />
          <Route
            path="/meal-plan"
            element={
              <MealPlan recipes={recipes} plan={plan} setPlan={setPlan} t={t} />
            }
          />
          <Route
            path="/manage-recipes"
            element={
              <Admin
                recipes={recipes}
                onSave={saveRecipe}
                onDelete={removeRecipe}
                t={t}
              />
            }
          />
          <Route path="/about" element={<About t={t} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route
            path="*"
            element={
              <section className="container section">
                <h1>Page not found</h1>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer t={t} />
    </div>
  );
}
