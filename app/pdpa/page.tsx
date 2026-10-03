import Link from 'next/link';

export default function PdpaPage() {
  return (
    <div className="px-4 py-16">
      <div className="card mx-auto max-w-3xl p-8 md:p-10 space-y-6">
        <div>
          <h1 className="page-title">
            Terms of Service &amp; PDPA Privacy Notice
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            <span className="font-semibold">UTO Advance</span> — Personal Data
            Protection Act (PDPA) Compliance
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            1. Terms of Service
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            By creating an account, you agree to use UTO Advance's services
            responsibly and to provide accurate information during
            registration. You are responsible for maintaining the
            confidentiality of your account credentials and for all
            activities that occur under your account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            2. Personal Data We Collect
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            When you register, we collect your name, email address, phone
            number, and address. This information is used solely to create
            and manage your account, provide our services, and communicate
            with you about your account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            3. Your Rights Under the PDPA
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            In accordance with Thailand's Personal Data Protection Act (PDPA
            B.E. 2562), you have the right to access, correct, or request
            deletion of your personal data, and to withdraw your consent to
            our processing of it at any time. Your data will not be shared
            with third parties except as required to provide our services or
            as required by law.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">
            4. Data Retention
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We retain your personal data only for as long as your account
            remains active or as needed to comply with our legal
            obligations, resolve disputes, and enforce our agreements.
          </p>
        </section>

        <div className="pt-4">
          <Link
            href="/register"
            className="btn-secondary"
          >
            Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
