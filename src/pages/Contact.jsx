import { useState } from "react";
export default function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [preview, setPreview] = useState(false);
  function change(field, value) {
    setForm({ ...form, [field]: value });
  }
  function submit(event) {
    event.preventDefault();
    setPreview(true);
  }
  return (
    <section className="container section">
      <div className="pagehead">
        <h1>{t.contactTitle}</h1>
      </div>
      <form className="panel form contactform" onSubmit={submit}>
        <label>
          {t.name}
          <input
            value={form.name}
            onChange={(e) => change("name", e.target.value)}
            required
          />
        </label>
        <label>
          {t.email}
          <input
            type="email"
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            required
          />
        </label>
        <label>
          {t.message}
          <textarea
            rows="5"
            value={form.message}
            onChange={(e) => change("message", e.target.value)}
            required
          />
        </label>
        <button className="btn primary">{t.send}</button>
        {preview && (
          <div className="preview">
            <h3>{t.preview}</h3>
            <p>
              <b>{t.name}:</b> {form.name}
            </p>
            <p>
              <b>{t.email}:</b> {form.email}
            </p>
            <p>{form.message}</p>
          </div>
        )}
      </form>
    </section>
  );
}
