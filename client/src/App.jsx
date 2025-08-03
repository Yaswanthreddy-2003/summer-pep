import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import { AuthProvider } from './contexts/AuthContext';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import MatchesPage from './pages/MatchesPage';
import NeighborhoodDetailPage from './pages/NeighborhoodDetailPage';
import NeighborhoodsPage from './pages/NeighborhoodsPage';
import NotFoundPage from './pages/NotFoundPage';
import PreferencesPage from './pages/PreferencesPage';
import SavedNeighborhoodsPage from './pages/SavedNeighborhoodsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/neighborhoods" element={<NeighborhoodsPage />} />
              <Route path="/neighborhoods/:id" element={<NeighborhoodDetailPage />} />
              
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/saved" element={<SavedNeighborhoodsPage />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App