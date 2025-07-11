import { useState } from "react";

export const InvitePage: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold mb-2">
            Invitation
          </h1>
          <p className="text-slate-600">Inviter un utilisateur à utiliser Eduresa</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form>
            <input
              type="email"
              placeholder="Votre e-mail"
              className="w-full p-3 border border-slate-300 rounded mb-4"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <select
              required
              className="w-full p-3 border border-slate-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="role"
            >
              <option value="" disabled selected>Role de l'utilisateur</option>
              <option value="Structure">Structure</option>
              <option value="Professeurs">Professeurs</option>
              <option value="Etudiants">Etudiants</option>
            </select>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${!email || !role ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!email || !role}
            >
              Envoyer l'invitation
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}