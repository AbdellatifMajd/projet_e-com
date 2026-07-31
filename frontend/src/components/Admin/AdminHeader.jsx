import React from 'react';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/store/AuthSlice';

function AdminHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate('/auth/login');
  };

  return (
    <header className="flex items-center justify-end px-6 py-3.5 bg-white border-b border-slate-300 shadow-sm">
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100/80 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
