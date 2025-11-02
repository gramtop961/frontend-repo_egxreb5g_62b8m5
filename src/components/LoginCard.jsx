import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

const fieldVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: (i) => ({ y: 0, opacity: 1, transition: { delay: 0.1 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] } }),
};

const LoginCard = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate auth flow and role detection
    setTimeout(() => {
      const role = username === 'admin' ? 'Admin' : username === 'super' ? 'Super Admin' : 'User';
      setLoading(false);
      onSuccess(role);
    }, 900);
  };

  return (
    <div className="relative flex w-full items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl"
        style={{ boxShadow: '0 20px 80px rgba(6,182,212,0.25)' }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Welcome to Venyo</h3>
            <p className="text-sm text-white/60">Login to continue</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <AnimatePresence initial={true}>
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm text-white/70">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-cyan-300/50 focus:bg-white/10"
                placeholder="e.g. jdoe or admin"
                required
              />
            </motion.div>

            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <label className="text-sm text-white/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-cyan-300/50 focus:bg-white/10"
                placeholder="••••••••"
                required
              />
            </motion.div>

            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between"
            >
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyan-400/90 px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_8px_30px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-300 active:scale-[0.98] disabled:opacity-60"
              >
                <span className="relative z-[1]">{loading ? 'Signing in…' : 'Login'}</span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.6), transparent 40%)' }}
                />
              </button>

              <button
                type="button"
                className="text-sm text-cyan-200/80 hover:text-cyan-100 hover:underline"
                onClick={() => setError('Password reset link sent to your email (demo).')}
              >
                Forgot Password
              </button>
            </motion.div>
          </AnimatePresence>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-xs text-cyan-200"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default LoginCard;
