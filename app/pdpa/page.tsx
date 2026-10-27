import Link from 'next/link';
import { getT } from '@/lib/i18n-server';

export default async function PdpaPage() {
  const t = await getT();

  const sections = [
    {
      title: t('1. Terms of Service', '1. ข้อกำหนดการใช้บริการ'),
      body: t(
        "By creating an account, you agree to use UTO Advance's services responsibly and to provide accurate information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        'เมื่อสร้างบัญชี ท่านตกลงที่จะใช้บริการของ UTO Advance อย่างรับผิดชอบ และให้ข้อมูลที่ถูกต้องในการลงทะเบียน ท่านมีหน้าที่รักษาความลับของข้อมูลเข้าสู่ระบบ และรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของท่าน'
      ),
    },
    {
      title: t('2. Personal Data We Collect', '2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม'),
      body: t(
        'When you register, we collect your name, email address, phone number, and address. This information is used solely to create and manage your account, provide our services, and communicate with you about your account.',
        'เมื่อท่านลงทะเบียน เราจะเก็บรวบรวมชื่อ อีเมล หมายเลขโทรศัพท์ และที่อยู่ของท่าน ข้อมูลเหล่านี้ใช้เพื่อสร้างและจัดการบัญชี ให้บริการ และติดต่อสื่อสารกับท่านเกี่ยวกับบัญชีเท่านั้น'
      ),
    },
    {
      title: t('3. Your Rights Under the PDPA', '3. สิทธิของท่านตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล'),
      body: t(
        "In accordance with Thailand's Personal Data Protection Act (PDPA B.E. 2562), you have the right to access, correct, or request deletion of your personal data, and to withdraw your consent to our processing of it at any time. Your data will not be shared with third parties except as required to provide our services or as required by law.",
        'ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิเข้าถึง แก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของท่าน และถอนความยินยอมในการประมวลผลข้อมูลได้ทุกเมื่อ เราจะไม่เปิดเผยข้อมูลของท่านแก่บุคคลภายนอก เว้นแต่จำเป็นต่อการให้บริการหรือตามที่กฎหมายกำหนด'
      ),
    },
    {
      title: t('4. Data Retention', '4. ระยะเวลาการเก็บรักษาข้อมูล'),
      body: t(
        'We retain your personal data only for as long as your account remains active or as needed to comply with our legal obligations, resolve disputes, and enforce our agreements.',
        'เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านเฉพาะในช่วงที่บัญชียังใช้งานอยู่ หรือเท่าที่จำเป็นเพื่อปฏิบัติตามกฎหมาย ระงับข้อพิพาท และบังคับใช้ข้อตกลงของเรา'
      ),
    },
  ];

  return (
    <div className="px-4 py-16">
      <div className="card mx-auto max-w-3xl p-8 md:p-10 space-y-6">
        <div>
          <h1 className="page-title">
            {t(
              'Terms of Service & PDPA Privacy Notice',
              'ข้อกำหนดการใช้บริการและประกาศความเป็นส่วนตัว (PDPA)'
            )}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            <span className="font-semibold">UTO Advance</span> —{' '}
            {t(
              'Personal Data Protection Act (PDPA) Compliance',
              'การปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)'
            )}
          </p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
          </section>
        ))}

        <div className="pt-4">
          <Link
            href="/register"
            className="btn-secondary"
          >
            {t('Back to Registration', 'กลับไปหน้าลงทะเบียน')}
          </Link>
        </div>
      </div>
    </div>
  );
}
