import { AppContentPage } from './page/AppContentPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClassroomProvider } from './hooks/ClassroomContext';
import { LandingPage } from './page/LandingPage';
import { AuthPage } from './page/AuthPage';
import { AuthProvider } from './hooks/AuthContext';
import { InvitePage } from './page/InvitePage';

function App() {
  return (
    <AuthProvider>
      <ClassroomProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<AppContentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path='invite' element={<InvitePage />} />
          </Routes>
        </Router>
      </ClassroomProvider>
    </AuthProvider>
  );
}

export default App;