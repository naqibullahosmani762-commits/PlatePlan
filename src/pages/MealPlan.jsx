import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { money } from "../components/RecipeCard";
export default function MealPlan({ recipes, plan, setPlan, t }) {
  const [budget, setBudget] = useState(1000);
  const rows = plan
    .map((item) => ({
      ...item,
      recipe: recipes.find((recipe) => recipe.id === item.id),
    }))
    .filter((item) => item.recipe);
  const total = rows.reduce(
    (sum, item) =>
      sum +
      (item.recipe.baseCostAFN * item.servings) / item.recipe.baseServings,
    0,
  );
  function updateServings(id, value) {
    setPlan(
      plan.map((item) =>
        item.id === id
          ? { ...item, servings: Math.max(1, Number(value) || 1) }
          : item,
      ),
    );
  }
  function remove(id) {
    setPlan(plan.filter((item) => item.id !== id));
  }
  return (
    <section className="container section">
      <div className="pagehead">
        <h1>{t.plan}</h1>
        <p className="muted">{t.intro}</p>
      </div>
      <div className="planlayout">
        <div className="planitems">
          {rows.map(({ recipe, servings }) => (
            <article className="planrow" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <div className="plancontent">
                <h3>{recipe.title}</h3>
                <p>
                  {money((recipe.baseCostAFN * servings) / recipe.baseServings)}
                </p>
                <label>
                  {t.target}
                  <input
                    type="number"
                    min="1"
                    value={servings}
                    onChange={(e) => updateServings(recipe.id, e.target.value)}
                  />
                </label>
                <details>
                  <summary>{t.ingredients}</summary>
                  {recipe.ingredients.map((item, index) => (
                    <p key={index}>
                      {item.name}:{" "}
                      {(
                        (item.quantity * servings) /
                        recipe.baseServings
                      ).toFixed(2)}{" "}
                      {item.unit}
                    </p>
                  ))}
                </details>
              </div>
              <button className="iconbutton" onClick={() => remove(recipe.id)}>
                <Trash2 size={17} />
              </button>
            </article>
          ))}
          {!rows.length && (
            <div className="panel">
              <p>{t.empty}</p>
              <Link className="btn primary" to="/recipes">
                {t.explore}
              </Link>
            </div>
          )}
        </div>
        <aside className="panel budget">
          <h2>{t.total}</h2>
          <strong className="bigmoney">{money(total)}</strong>
          <label>
            {t.budget}
            <input
              type="number"
              min="0"
              value={budget}
              onChange={(e) =>
                setBudget(Math.max(0, Number(e.target.value) || 0))
              }
            />
          </label>
          <div className="listrow">
            <span>
              {total > budget ? "Over budget by" : "Budget remaining"}
            </span>
            <b>{money(Math.abs(budget - total))}</b>
          </div>
          <div className="progress">
            <span
              style={{
                width: `${budget ? Math.min(100, (total / budget) * 100) : total ? 100 : 0}%`,
              }}
            />
          </div>
          <button className="btn full" onClick={() => setPlan([])}>
            {t.reset}
          </button>
        </aside>
      </div>
    </section>
  );
}
