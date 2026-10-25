import { useState } from "react";

const emptyRecipe = {
  title: "",
  category: "Main",
  image: "",
  description: "",
  baseServings: 2,
  baseCostAFN: 0,
  vegetarian: false,
  ingredientsText: "1, cup, Ingredient",
  instructions: "",
};
export default function RecipeForm({ recipe, onSave, onCancel, t }) {
  const [form, setForm] = useState(
    recipe
      ? {
          ...recipe,
          ingredientsText: recipe.ingredients
            .map((item) => `${item.quantity}, ${item.unit}, ${item.name}`)
            .join("\n"),
        }
      : emptyRecipe,
  );
  const [error, setError] = useState("");
  function change(field, value) {
    setForm({ ...form, [field]: value });
  }
  async function submit(event) {
    event.preventDefault();
    const ingredients = form.ingredientsText
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [quantity, unit, ...name] = line
          .split(",")
          .map((part) => part.trim());
        return { quantity: Number(quantity), unit, name: name.join(", ") };
      });
    if (
      !form.title.trim() ||
      Number(form.baseServings) < 1 ||
      Number(form.baseCostAFN) < 0 ||
      ingredients.some((item) => !item.name || !item.unit || item.quantity <= 0)
    ) {
      setError(t.error);
      return;
    }
    const { ingredientsText, ...recipeData } = form;
    try {
      await onSave({
        ...recipeData,
        baseServings: Number(form.baseServings),
        baseCostAFN: Number(form.baseCostAFN),
        ingredients,
      });
    } catch {
      setError(t.error);
    }
  }
  return (
    <form className="panel form" onSubmit={submit}>
      <h2>{recipe ? t.edit : t.newRecipe}</h2>
      {error && <p className="error">{error}</p>}
      <div className="formgrid">
        <label>
          {t.title}
          <input
            value={form.title}
            onChange={(e) => change("title", e.target.value)}
            required
          />
        </label>
        <label>
          {t.category}
          <select
            value={form.category}
            onChange={(e) => change("category", e.target.value)}
          >
            {["Breakfast", "Main", "Snack", "Soup", "Dessert"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          {t.image}
          <input
            value={form.image}
            onChange={(e) => change("image", e.target.value)}
          />
        </label>
        <label>
          {t.baseServings}
          <input
            type="number"
            min="1"
            value={form.baseServings}
            onChange={(e) => change("baseServings", e.target.value)}
            required
          />
        </label>
        <label>
          {t.baseCost}
          <input
            type="number"
            min="0"
            value={form.baseCostAFN}
            onChange={(e) => change("baseCostAFN", e.target.value)}
            required
          />
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={form.vegetarian}
            onChange={(e) => change("vegetarian", e.target.checked)}
          />
          {t.vegetarianLabel}
        </label>
      </div>
      <label>
        {t.description}
        <textarea
          value={form.description}
          onChange={(e) => change("description", e.target.value)}
          required
        />
      </label>
      <label>
        {t.ingredientHelp}
        <textarea
          rows="5"
          value={form.ingredientsText}
          onChange={(e) => change("ingredientsText", e.target.value)}
          required
        />
      </label>
      <label>
        {t.instructions}
        <textarea
          value={form.instructions}
          onChange={(e) => change("instructions", e.target.value)}
          required
        />
      </label>
      <div className="actions">
        <button className="btn primary">{t.save}</button>
        <button type="button" className="btn" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </form>
  );
}
