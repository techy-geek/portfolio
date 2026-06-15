import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false); setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const socials = [
    { label: 'GitHub',     value: 'github.com/techy-geek',              href: 'https://github.com/techy-geek' },
    { label: 'LinkedIn',   value: 'linkedin.com/in/anurag-sharma-nits', href: 'https://linkedin.com/in/anurag-sharma-nits' },
    { label: 'LeetCode',   value: 'leetcode.com/anurag-nits',           href: 'https://leetcode.com/anurag-nits' },
    { label: 'Codeforces', value: 'codeforces.com/profile/anurag-nits', href: 'https://codeforces.com/profile/anurag-nits' },
    { label: 'CodeChef',   value: 'codechef.com/users/anurag_nits',     href: 'https://www.codechef.com/users/anurag_nits' },
    { label: 'Email',      value: 'anuragsharma.nits@gmail.com',        href: 'mailto:anuragsharma.nits@gmail.com' },
  ];

  return (
    <div className="h-full win-scrollbar overflow-y-auto win-app-body" style={{ background: 'var(--app-bg)' }}>
      <div style={{ height: '40px', background: 'var(--app-toolbar)', borderBottom: '1px solid var(--app-toolbar-border)', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0 }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--app-text)' }}>Contact</span>
      </div>
      <div className="win-app-content">
        <div className="win-grid-contact">
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '18px', boxShadow: 'var(--app-card-shadow)' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: 'var(--app-text)' }}>Let's Connect</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--app-text-sec)', lineHeight: '1.6' }}>
                I'm currently open to new opportunities. Whether you have a question or just want to say hi — drop a message!
              </p>
            </div>
            <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--app-card-shadow)' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--app-sep)', fontSize: '11px', fontWeight: 700, color: 'var(--app-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Find me online
              </div>
              {socials.map(s => (
                <a key={s.label} href={s.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderBottom: '1px solid var(--app-sep)', textDecoration: 'none', transition: 'background 0.1s', color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--app-hover-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--app-text)' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: '#0078d4' }}>{s.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-card-border)', borderRadius: '8px', padding: '20px', boxShadow: 'var(--app-card-shadow)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: 'var(--app-text)' }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--app-text)', marginBottom: '5px' }}>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="win-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--app-text)', marginBottom: '5px' }}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="win-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--app-text)', marginBottom: '5px' }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Hello Anurag..." className="win-input" style={{ resize: 'none' }} />
              </div>
              <button type="submit" disabled={submitting || submitted} className="win-btn win-btn-accent"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '36px', fontSize: '13px' }}>
                {submitting ? <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  : submitted ? 'Sent Successfully' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
