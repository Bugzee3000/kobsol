import { useState } from "react";

function makeCSS(theme) {
  const dark = theme !== 'light';
  return `
    body { background: ${dark ? '#080D1A' : '#F4F6FB'}; color: ${dark ? '#E8EDF5' : '#0F1729'}; font-family: sans-serif; margin:0; }
    .nav { padding: 16px 24px; background: ${dark ? '#0F1729' : '#fff'}; border-bottom: 1px solid ${dark ? '#1A2840' : '#DDE3F0'}; display:flex; align-items:center; justify-content:space-between; }
    .btn { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-size:14px; }
    .btn-p { background: #00E5A0; color: #000; font-weight:700; }
    .btn-danger { background: #FF4D4D; color: #fff; font-weight:700; padding: 6px 12px; font-size:12px; border-radius:6px; border:none; cursor:pointer; }
    .card { background: ${dark ? '#0F1729' : '#fff'}; border: 1px solid ${dark ? '#1A2840' : '#DDE3F0'}; border-radius: 12px; padding: 28px; max-width: 560px; margin: 40px auto; }
    .card h2 { margin-top:0; font-size:20px; }
    .input-row { display:flex; gap:10px; margin-bottom:16px; }
    .input { flex:1; padding: 10px 14px; border-radius: 8px; border: 1px solid ${dark ? '#1A2840' : '#DDE3F0'}; background: ${dark ? '#080D1A' : '#F4F6FB'}; color: ${dark ? '#E8EDF5' : '#0F1729'}; font-size:14px; outline:none; }
    .input:focus { border-color: #00E5A0; }
    .select { padding: 10px 14px; border-radius: 8px; border: 1px solid ${dark ? '#1A2840' : '#DDE3F0'}; background: ${dark ? '#080D1A' : '#F4F6FB'}; color: ${dark ? '#E8EDF5' : '#0F1729'}; font-size:14px; cursor:pointer; outline:none; }
    .member-list { margin-top:20px; display:flex; flex-direction:column; gap:10px; }
    .member-row { display:flex; align-items:center; justify-content:space-between; padding: 10px 14px; border-radius: 8px; background: ${dark ? '#080D1A' : '#F4F6FB'}; border: 1px solid ${dark ? '#1A2840' : '#DDE3F0'}; }
    .badge { font-size:11px; font-weight:700; padding: 3px 8px; border-radius: 20px; background: ${dark ? '#1A2840' : '#DDE3F0'}; color: ${dark ? '#00E5A0' : '#0F1729'}; }
    .badge-pending { background: #FFA50022; color: #FFA500; }
    .tag-admin { background: #00E5A022; color: #00E5A0; }
    .toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background: #00E5A0; color:#000; font-weight:700; padding: 12px 24px; border-radius:10px; font-size:14px; box-shadow:0 4px 20px #0005; animation: fadeIn .2s ease; }
    .error { color: #FF4D4D; font-size:13px; margin-top:-8px; margin-bottom:8px; }
    @keyframes fadeIn { from { opacity:0; transform:translate(-50%, 10px); } to { opacity:1; transform:translate(-50%, 0); } }
  `;
}

const ROLES = ["Membre", "Admin", "Lecteur"];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Membre');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [members, setMembers] = useState([
    { email: 'alice@kobsol.io', role: 'Admin', status: 'actif' },
    { email: 'bob@kobsol.io', role: 'Membre', status: 'actif' },
  ]);

  const CSS = makeCSS(theme);

  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function handleInvite() {
    if (!email.trim()) { setError('Veuillez entrer une adresse courriel.'); return; }
    if (!validateEmail(email.trim())) { setError('Adresse courriel invalide.'); return; }
    if (members.find(m => m.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('Ce membre est déjà dans la liste.'); return;
    }
    setMembers(prev => [...prev, { email: email.trim(), role, status: 'en attente' }]);
    showToast('Invitation envoyée à ' + email.trim() + ' !');
    setEmail('');
    setRole('Membre');
    setError('');
  }

  function handleRemove(targetEmail) {
    setMembers(prev => prev.filter(m => m.email !== targetEmail));
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="nav">
        <strong>KOB.SOL</strong>
        <button className="btn btn-p" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Clair' : 'Sombre'}
        </button>
      </div>

      <div className="card">
        <h2>Inviter des membres</h2>

        <div className="input-row">
          <input
            className="input"
            type="email"
            placeholder="courriel@exemple.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleInvite()}
          />
          <select className="select" value={role} onChange={e => setRole(e.target.value)}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <button className="btn btn-p" onClick={handleInvite}>Inviter</button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="member-list">
          {members.map(m => (
            <div className="member-row" key={m.email}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.email}</div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{m.role}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={"badge " + (m.status === 'en attente' ? 'badge-pending' : m.role === 'Admin' ? 'tag-admin' : '')}>
                  {m.status}
                </span>
                <button className="btn-danger" onClick={() => handleRemove(m.email)}>Retirer</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
