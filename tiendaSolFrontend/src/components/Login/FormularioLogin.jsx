import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import LoadingIndicator from "../LoadingIndicator";


export default function FormularioLogin({ onSubmit, error, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-neutral-800 p-8 rounded-2xl  border border-neutral-200 dark:border-neutral-700 transition-all duration-300 w-full max-w-md">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-600 p-5 rounded-2xl border-4 border-white dark:border-neutral-800">
          <User className="w-8 h-8 text-white" />
        </div>

        <div className="text-center mb-8 pt-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Accedé a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="block w-full pl-10 pr-3 py-3 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg placeholder-neutral-400 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-3 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg placeholder-neutral-400 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="/login"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg p-3 flex items-center">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 flex items-center justify-center"
          >
            {loading ? (
              <LoadingIndicator message="Iniciando sesión..." color="#ffff" /> 
            ) : (
              "Iniciar sesión"
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              ¿No tenés una cuenta?{" "}
              <a
                href="/register"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Registrate
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
