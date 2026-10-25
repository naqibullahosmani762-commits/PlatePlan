import { Link, NavLink } from "react-router-dom";
import { Languages, Moon, Sun, UtensilsCrossed } from "lucide-react";

export default function Header({ t, lang, setLang, theme, setTheme }) {
  const links = [
    ["/", t.home],
    ["/recipes", t.recipes],
    ["/meal-plan", t.plan],
    ["/manage-recipes", t.admin],
    ["/about", t.about],
    ["/contact", t.contact],
  ];
  return (
    <header className="header">
      <Link className="brand" to="/">
        <span className="brandicon">
          <UtensilsCrossed size={20} />
        </span>
        PlatePlan<span className="dot">.</span>
      </Link>
      <nav>
        {links.map(([url, label]) => (
          <NavLink key={url} to={url} end={url === "/"}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="tools">
        <button onClick={() => setLang(lang === "en" ? "fa" : "en")}>
          <Languages size={16} />
          {lang === "en" ? "FA" : "EN"}
        </button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </header>
  );
}
