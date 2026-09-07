export const email = 'johnmarienaidas@gmail.com';
export const github = 'https://github.com/jmnaidas';
export const linkedin = 'https://www.linkedin.com/in/john-marie-naidas-2b57621b4/';
// Replace this adapter with a server submission only when an email service is configured.
export function createContactDraft(data: FormData): string {
  const name = String(data.get('name') ?? '').trim();
  const company = String(data.get('company') ?? '').trim();
  const body = `Name: ${name}\nEmail: ${data.get('email')}\nCompany: ${company || 'Not provided'}\n\n${data.get('message')}`;
  return `mailto:${email}?subject=${encodeURIComponent(`Project conversation — ${name}`)}&body=${encodeURIComponent(body)}`;
}
