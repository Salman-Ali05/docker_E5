import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Eye, 
  BarChart3, 
  MousePointer, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-white p-4 rounded-full shadow-xl">
                  <Building2 className="w-12 h-12 text-blue-600" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Eduresa
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Révolutionnez la gestion de vos salles de cours avec une expérience 
              <span className="font-semibold text-blue-600"> immersive en 3D</span>. 
              Visualisez, gérez et optimisez l'occupation de vos espaces d'apprentissage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Découvrir l'application</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-2 text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Gratuit</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-slate-600">Salles de cours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3D</div>
                <div className="text-sm text-slate-600">Visualisation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">Temps réel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Fonctionnalités Innovantes
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une suite complète d'outils pour une gestion optimale de vos espaces éducatifs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visualisation 3D</h3>
              <p className="text-slate-600 leading-relaxed">
                Explorez vos salles de cours dans un environnement 3D interactif avec des détails réalistes : tables, chaises et aménagement complet.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Interaction Intuitive</h3>
              <p className="text-slate-600 leading-relaxed">
                Cliquez simplement sur une salle pour changer son statut. Interface intuitive avec feedback visuel immédiat.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Temps Réel</h3>
              <p className="text-slate-600 leading-relaxed">
                Mise à jour instantanée des statuts avec indicateurs visuels : vert pour libre, rouge pour occupé.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Dashboard Analytique</h3>
              <p className="text-slate-600 leading-relaxed">
                Statistiques détaillées avec taux d'occupation, nombre de salles disponibles et métriques de performance.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-pink-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Gestion Centralisée</h3>
              <p className="text-slate-600 leading-relaxed">
                Vue d'ensemble complète avec informations détaillées sur chaque salle : capacité, statut et identification.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Interface Moderne</h3>
              <p className="text-slate-600 leading-relaxed">
                Design responsive et moderne avec navigation fluide entre la vue 3D et le dashboard analytique.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comment ça fonctionne ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trois étapes simples pour une gestion efficace de vos salles de cours
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Visualisez</h3>
              <p className="text-slate-600 leading-relaxed">
                Explorez vos 6 salles de cours dans un environnement 3D immersif avec navigation intuitive.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Interagissez</h3>
              <p className="text-slate-600 leading-relaxed">
                Cliquez sur une salle pour changer son statut instantanément avec feedback visuel immédiat.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Analysez</h3>
              <p className="text-slate-600 leading-relaxed">
                Consultez les statistiques détaillées et optimisez l'utilisation de vos espaces éducatifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à révolutionner votre gestion ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Découvrez dès maintenant comment <strong>Eduresa</strong> peut transformer 
            la façon dont vous gérez vos espaces éducatifs.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="group bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
          >
            <Building2 className="w-6 h-6" />
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center justify-center space-x-6 mt-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Instantané</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Gratuit</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Building2 className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white font-bold text-lg">Eduresa</div>
                <div className="text-sm">Gestion intelligente des espaces éducatifs</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm">
                © 2025 Eduresa. Conçu avec passion pour l'éducation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};