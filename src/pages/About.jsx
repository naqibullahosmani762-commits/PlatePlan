export default function About({ t }) {
  return (
    <section className="container section">
      <div className="aboutbox panel">
        <span className="eyebrow">PlatePlan</span>
        <h1>{t.aboutTitle}</h1>
        <p className="lead">{t.aboutText}</p>
      </div>
      <div className="twocol">
        <article className="panel">
          <h2>Project features</h2>
          <p>
            React components, pages, an Express backend, and JSON data files.
          </p>
        </article>
        <article className="panel">
          <h2>How data is saved</h2>
          <p>
            Recipes and meal plans are saved on the computer running the
            backend.
          </p>
        </article>
      </div>
    </section>
  );
}
