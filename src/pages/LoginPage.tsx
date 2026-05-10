import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '@/src/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore, if not create
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        const isAdminEmail = user.email === 'triet1509w@gmail.com';
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: isAdminEmail ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        });
      }
      
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the login popup.');
      } else {
        console.error('Login error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brown-dark px-6 py-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-stone-900 border border-gold/20 p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 border-2 border-gold flex items-center justify-center rotate-45 mx-auto mb-8">
            <span className="text-gold font-serif font-bold text-2xl -rotate-45">TT</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2 uppercase tracking-widest">Đăng Nhập</h1>
          <p className="text-stone-500 text-sm italic">Hệ thống quản lý khách hàng Thành Tâm</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-white hover:bg-stone-100 text-brown-dark font-bold py-4 px-6 rounded-sm transition-all group"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-brown-dark border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
              Tiếp tục với Google
            </>
          )}
        </button>

        <p className="mt-10 text-center text-[10px] text-stone-600 uppercase tracking-[0.2em] leading-relaxed">
          Bằng cách đăng nhập, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi.
        </p>
      </motion.div>
    </div>
  );
}
