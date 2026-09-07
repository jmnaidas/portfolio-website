'use client';
import { useState } from 'react';
import { createContactDraft, email } from '@/lib/contact';
export function ContactForm() {
  const [prepared, setPrepared] = useState(false);
  return <form className="contact-form" onSubmit={event => { event.preventDefault(); const draft = createContactDraft(new FormData(event.currentTarget)); window.location.href = draft; setPrepared(true); }}><div className="form-row"><label>Name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label><label>Email<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@company.com" /></label></div><label>Company <span>(optional)</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Your company or team" /></label><label>What are you looking to build?<textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="A little about your project, challenge, or idea…" /></label><button className="button primary" type="submit">Start a Conversation <span aria-hidden="true">↗</span></button><p className="form-note" role="status">{prepared ? `Your email draft is ready to open. Nothing has been sent. If your email app didn’t open, contact ${email} directly.` : 'Opens a draft in your email app. You review and send it.'}</p></form>;
}
