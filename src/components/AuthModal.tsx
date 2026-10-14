import React, { useState } from 'react';
import { AppUser, UserRole } from '../types';
import { getSavedUsers, saveUsers, setCurrentUser, NIGERIAN_STATES } from '../data/mockData';
import { X, Mail, Phone, User, ShieldCheck, CheckCircle2, Lock, ArrowRight, Building2, MapPin } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAuthenticated: (user: AppUser) => void;
  initialMode?: 'register' | 'signin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onUserAuthenticated,
  initialMode = 'register',
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'register' | 'signin'>(initialMode);
  const [identifierType, setIdentifierType] = useState<'phone' | 'email'>('phone');
  
  // Registration form fields
  const [fullName, setFullName] = useState<string>('');
  const [identifierValue, setIdentifierValue] = useState<string>('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [state, setState] = useState<string>('Benue');
  const [lgaOrMarket, setLgaOrMarket] = useState<string>('');
  const [farmOrBusinessName, setFarmOrBusinessName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // Verification step simulation
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpCode, setOtpCode] = useState<string>('234890');
  const [pendingUser, setPendingUser] = useState<AppUser | null>(null);

  // Sign in fields
  const [signinIdentifier, setSigninIdentifier] = useState<string>('');
  const [signinPassword, setSigninPassword] = useState<string>('');
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name or registered contact person.');
      return;
    }
    if (!identifierValue.trim()) {
      setErrorMessage(`Please enter your ${identifierType === 'phone' ? 'phone number' : 'email address'}.`);
      return;
    }

    if (identifierType === 'phone' && identifierValue.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 11-digit Nigerian phone number (e.g. 08031234567).');
      return;
    }

    if (identifierType === 'email' && !identifierValue.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Check if identifier is already registered
    const existingUsers = getSavedUsers();
    const alreadyExists = existingUsers.some(
      (u) => u.identifier.toLowerCase() === identifierValue.trim().toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage(`An account with this ${identifierType} already exists. Please switch to Sign In.`);
      return;
    }

    const newUser: AppUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      identifier: identifierValue.trim(),
      identifierType,
      phone: identifierType === 'phone' ? identifierValue.trim() : '08000000000',
      email: identifierType === 'email' ? identifierValue.trim() : undefined,
      role,
      state,
      lgaOrMarket: lgaOrMarket.trim() || `${state} Central Market`,
      farmOrBusinessName: farmOrBusinessName.trim() || undefined,
      isVerified: false,
      createdAt: 'Just registered',
    };

    setPendingUser(newUser);
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUser) return;

    if (otpCode.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit confirmation code.');
      return;
    }

    const verifiedUser: AppUser = {
      ...pendingUser,
      isVerified: true,
    };

    const existingUsers = getSavedUsers();
    const updatedUsers = [verifiedUser, ...existingUsers];
    saveUsers(updatedUsers);
    setCurrentUser(verifiedUser);
    onUserAuthenticated(verifiedUser);

    setSuccessMessage(`Welcome, ${verifiedUser.fullName}! Your FarmLink NG account is verified.`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signinIdentifier.trim()) {
      setErrorMessage('Please enter your registered email or phone number.');
      return;
    }

    const users = getSavedUsers();
    const cleanInput = signinIdentifier.trim().toLowerCase();
    const matched = users.find(
      (u) => u.identifier.toLowerCase() === cleanInput || (u.email && u.email.toLowerCase() === cleanInput) || u.phone === cleanInput
    );

    if (!matched) {
      setErrorMessage('No account found with this identifier. Please verify or register.');
      return;
    }

    setCurrentUser(matched);
    onUserAuthenticated(matched);
    setSuccessMessage(`Welcome back, ${matched.fullName}!`);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleQuickDemoLogin = (targetId: string) => {
    const users = getSavedUsers();
    const demo = users.find((u) => u.id === targetId);
    if (demo) {
      setCurrentUser(demo);
      onUserAuthenticated(demo);
      setSuccessMessage(`Signed in as ${demo.fullName} (${demo.role})`);
      setTimeout(() => {
        onClose();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              FL
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {mode === 'register' ? 'Register FarmLink Account' : 'Sign In to FarmLink NG'}
              </h3>
              <p className="text-[11px] text-stone-500">
                Register with Email or Phone Number
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {step === 'form' && (
          <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'register' 
                  ? 'bg-white text-emerald-900 shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Register Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg transition-colors cursor-pointer ${
                mode === 'signin' 
                  ? 'bg-white text-emerald-900 shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && pendingUser && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-stone-900">
                  Verify Your {pendingUser.identifierType === 'phone' ? 'Phone Number' : 'Email'}
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  We sent a 6-digit verification code to <strong>{pendingUser.identifier}</strong>.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-1">
                <label className="text-xs font-semibold text-stone-700 block text-left">
                  Enter 6-digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-bold font-mono py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
                <span className="text-[11px] text-stone-500 block text-left">
                  (Demo code <span className="font-mono text-emerald-800 font-semibold">234890</span> is ready)
                </span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Verify & Complete Registration
                </button>
              </div>
            </form>
          )}

          {/* Mode 1: Registration Form */}
          {step === 'form' && mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Identifier Type Selector: Phone or Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Register With
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifierType('phone');
                      setIdentifierValue('');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      identifierType === 'phone'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Phone Number</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIdentifierType('email');
                      setIdentifierValue('');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      identifierType === 'email'
                        ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Email Address</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Full Name / Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Torkwase Agber"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              {/* Phone or Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  {identifierType === 'phone' ? 'Nigerian Phone Number *' : 'Email Address *'}
                </label>
                <div className="relative">
                  {identifierType === 'phone' ? (
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  ) : (
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  )}
                  <input
                    type={identifierType === 'phone' ? 'tel' : 'email'}
                    required
                    placeholder={identifierType === 'phone' ? '0803 123 4567' : 'name@example.com'}
                    value={identifierValue}
                    onChange={(e) => setIdentifierValue(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                  />
                </div>
              </div>

              {/* Account Role Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  I am a:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'farmer', title: 'Farmer', subtitle: 'Post harvest' },
                    { id: 'wholesaler', title: 'Wholesaler', subtitle: 'Bulk trader' },
                    { id: 'buyer', title: 'Consumer', subtitle: 'Household buyer' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id as UserRole)}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                        role === item.id
                          ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 font-bold'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{item.title}</div>
                      <div className="text-[10px] text-stone-500 font-normal mt-0.5">{item.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* State & Market Depot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    State of Operation *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Market Depot / Farm Hub
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zaki Biam or Mile 12"
                    value={lgaOrMarket}
                    onChange={(e) => setLgaOrMarket(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              {/* Farm / Business Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Farm, Union, or Trading Name (Optional)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Mbakor Agro Cooperative or Adeleke Ventures"
                    value={farmOrBusinessName}
                    onChange={(e) => setFarmOrBusinessName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              {/* Security PIN / Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Account Password / PIN *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="Create a password or 4-6 digit PIN"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Mode 2: Sign In Form */}
          {step === 'form' && mode === 'signin' && (
            <div className="space-y-5">
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Email or Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08034918234 or adebayo@lagosgrain.com"
                    value={signinIdentifier}
                    onChange={(e) => setSigninIdentifier(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Password / PIN
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={signinPassword}
                    onChange={(e) => setSigninPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              {/* Quick Sample Profile Selector for Fast Testing */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
                  Quick Demo Accounts (1-Tap Test)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('usr-farmer-01')}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-emerald-700 bg-stone-50 hover:bg-white text-xs text-left cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-stone-900">Torkwase Agber</div>
                    <div className="text-[10px] text-stone-500">Farmer · Benue (08034918234)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('usr-buyer-02')}
                    className="p-2.5 rounded-lg border border-stone-200 hover:border-emerald-700 bg-stone-50 hover:bg-white text-xs text-left cursor-pointer transition-colors"
                  >
                    <div className="font-bold text-stone-900">Alhaji Adebayo</div>
                    <div className="text-[10px] text-stone-500">Wholesaler · Lagos (Email)</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
