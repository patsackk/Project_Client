'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
});

  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState<boolean>(false);

  const router = useRouter();
  const { t } = useLanguage();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToPolicy) {
      setIsSuccess(false);
      setMessage(t(
        'You must agree to the Terms of Service and PDPA Privacy Notice to continue.',
        'กรุณายอมรับข้อกำหนดการใช้บริการและประกาศความเป็นส่วนตัว (PDPA) เพื่อดำเนินการต่อ'
      ));
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setIsSuccess(response.ok);
      if (response.ok) {
        setMessage(t('Registration successful!', 'สมัครสมาชิกสำเร็จ!'));
        setFormData({
              name: '',
              email: '',
              phone: '',
              address: '',
              password: '',
            });
        setAgreedToPolicy(false);
      } else {
        setMessage(data.message || t('Registration failed.', 'สมัครสมาชิกไม่สำเร็จ'));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setIsSuccess(false);
      setMessage(t('An unexpected error occurred.', 'เกิดข้อผิดพลาดที่ไม่คาดคิด'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
  <div className="flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-lg card p-8 md:p-10">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="page-title">
          {t('Create Account', 'สร้างบัญชี')}
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          {t(
            <>Join <span className="font-semibold">UTO Advance</span> today</>,
            <>เข้าร่วมกับ <span className="font-semibold">UTO Advance</span> วันนี้</>
          )}
        </p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-5 ${isSuccess ? 'alert-success' : 'alert-error'}`}
        >
          {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="label">
            {t('Full Name', 'ชื่อ-นามสกุล')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('Your name', 'ชื่อของคุณ')}
            required
            className="input"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            {t('Email', 'อีเมล')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="input"
          />

        </div>
        {/* Phone */}
          <div>
            <label className="label">
              {t('Phone', 'เบอร์โทรศัพท์')}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('Your phone number', 'เบอร์โทรศัพท์ของคุณ')}
              className="input"
            />
          </div>

          {/* Address */}
          <div>
            <label className="label">
              {t('Address', 'ที่อยู่')}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t('Your address', 'ที่อยู่ของคุณ')}
              className="input"
            />
          </div>

        {/* Password */}
        <div>
          <label className="label">
            {t('Password', 'รหัสผ่าน')}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="input"
          />
        </div>

        {/* PDPA / Terms consent */}
        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="agreedToPolicy"
            name="agreedToPolicy"
            checked={agreedToPolicy}
            onChange={(e) => setAgreedToPolicy(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
          />
          <label htmlFor="agreedToPolicy" className="text-xs text-gray-600 leading-relaxed">
            {t('I have read and agree to the ', 'ข้าพเจ้าได้อ่านและยอมรับ')}
            <Link href="/pdpa" target="_blank" className="text-sky-700 underline hover:text-sky-800">
              {t('Terms of Service and PDPA Privacy Notice', 'ข้อกำหนดการใช้บริการและประกาศความเป็นส่วนตัว (PDPA)')}
            </Link>
            {t('.', '')}
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !agreedToPolicy}
            className="btn-primary w-full py-3"
          >
            {isLoading ? t('Signing up...', 'กำลังสมัครสมาชิก...') : t('Sign Up', 'สมัครสมาชิก')}
          </button>

          <button
            type="button"
            onClick={handleBackToHome}
            className="btn-secondary w-full py-3"
          >
            {t('Back to Home', 'กลับหน้าแรก')}
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
