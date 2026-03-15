import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 border border-white/20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Chào mừng trở lại
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Truy cập hệ thống quản trị nội bộ
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email / Tài khoản
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out bg-white/90"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-150 ease-in-out bg-white/90"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LogIn className="h-5 w-5" />
            Đăng nhập
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 Hệ thống quản trị thuộc bản quyền ăn vặt cô Châu.
        </p>
      </div>
    </div>
  );
}

export default Login;
