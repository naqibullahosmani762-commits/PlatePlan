import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import RecipeForm from "../components/RecipeForm";
import { money } from "../components/RecipeCard";
export default function Admin({ recipes, onSave, onDelete, t }) {
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  async function save(recipe) {
    await onSave(recipe);
    setShowForm(false);
    setEditing(null);
  }
  function startEdit(recipe) {
    setEditing(recipe);
    setShowForm(true);
  }
  function startNew() {
    setEditing(null);
    setShowForm(true);
  }
  return (
    <section className="container section">
      <div className="pagehead adminhead">
        <div>
          <span className="eyebrow">CMS</span>
          <h1>{t.admin}</h1>
          <p className="muted">Changes are saved to the backend data file.</p>
        </div>
        <button className="btn primary" onClick={startNew}>
          <Plus size={16} />
          {t.newRecipe}
        </button>
      </div>
      {showForm && (
        <RecipeForm
          key={editing?.id || "new"}
          recipe={editing}
          onSave={save}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          t={t}
        />
      )}
      <div className="panel adminlist">
        <h2>
          {t.recipes} · {recipes.length}
        </h2>
        {recipes.map((recipe) => (
          <div className="adminrow" key={recipe.id}>
            <img src={recipe.image} alt="" />
            <div className="admininfo">
              <b>{recipe.title}</b>
              <span className="muted">
                {recipe.category} · {money(recipe.baseCostAFN)}
              </span>
            </div>
            <button className="btn tiny" onClick={() => startEdit(recipe)}>
              <Pencil size={14} />
              {t.edit}
            </button>
            <button
              className="btn tiny danger"
              onClick={() =>
                window.confirm(`${t.delete}: ${recipe.title}?`) &&
                onDelete(recipe.id)
              }
            >
              <Trash2 size={14} />
              {t.delete}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
