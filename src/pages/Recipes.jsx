import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";
export default function Recipes({ recipes, onAdd, t }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("low");
  const [vegetarian, setVegetarian] = useState(false);
  const filtered = useMemo(
    () =>
      recipes
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(search.toLowerCase()),
        )
        .filter((recipe) => category === "All" || recipe.category === category)
        .filter((recipe) => !vegetarian || recipe.vegetarian)
        .sort((a, b) =>
          sort === "low"
            ? a.baseCostAFN / a.baseServings - b.baseCostAFN / b.baseServings
            : b.baseCostAFN / b.baseServings - a.baseCostAFN / a.baseServings,
        ),
    [recipes, search, category, sort, vegetarian],
  );
  return (
    <section className="container section">
      <div className="pagehead">
        <h1>{t.recipes}</h1>
        <p className="muted">{t.intro}</p>
      </div>
      <div className="filters">
        <input
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">{t.all}</option>
          {["Breakfast", "Main", "Snack", "Soup", "Dessert"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="low">{t.low}</option>
          <option value="high">{t.high}</option>
        </select>
        <label className="check">
          <input
            type="checkbox"
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
          />
          {t.vegetarian}
        </label>
      </div>
      {filtered.length ? (
        <div className="cards">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onAdd={onAdd} t={t} />
          ))}
        </div>
      ) : (
        <p>{t.noRecipes}</p>
      )}
    </section>
  );
}
