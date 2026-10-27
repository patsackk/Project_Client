import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getT } from "@/lib/i18n-server";

export async function generateMetadata() {
  const t = await getT();
  return { title: t("About Us | UTO Advance", "เกี่ยวกับเรา | UTO Advance") };
}

export default async function About() {
  const t = await getT();

  const values = [
    {
      title: t("Innovation", "นวัตกรรม"),
      description: t(
        "We continuously explore new technologies and methods to deliver smarter engineering solutions.",
        "เราไม่หยุดค้นหาเทคโนโลยีและวิธีการใหม่ ๆ เพื่อส่งมอบโซลูชันทางวิศวกรรมที่ชาญฉลาดยิ่งขึ้น"
      ),
    },
    {
      title: t("Integrity", "ความซื่อสัตย์"),
      description: t(
        "We operate with transparency, honesty, and accountability in every project we undertake.",
        "เราทำงานด้วยความโปร่งใส ซื่อสัตย์ และรับผิดชอบในทุกโครงการที่เราดูแล"
      ),
    },
    {
      title: t("Sustainability", "ความยั่งยืน"),
      description: t(
        "We design and implement systems that promote environmental responsibility and long-term efficiency.",
        "เราออกแบบและติดตั้งระบบที่ใส่ใจต่อสิ่งแวดล้อมและมีประสิทธิภาพในระยะยาว"
      ),
    },
  ];

  return (
    <>
      <PageHero
        image="/images/ABOUT_UTO.jpg"
        title={t("About UTO Advance", "เกี่ยวกับ UTO Advance")}
        subtitle={t(
          "Engineering innovation with precision, integrity, and long-term vision.",
          "สร้างสรรค์นวัตกรรมทางวิศวกรรมด้วยความแม่นยำ ซื่อสัตย์ และวิสัยทัศน์ระยะยาว"
        )}
      />

      {/* ===== MISSION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            {t(
              <>Our <span className="accent">Mission</span></>,
              <><span className="accent">พันธกิจ</span>ของเรา</>
            )}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t(
              "At UTO Advance Engineering, our mission is to deliver intelligent and sustainable engineering solutions that elevate communities and improve everyday living. We combine technical excellence with innovative thinking to create lasting value for our clients.",
              "UTO Advance Engineering มีพันธกิจในการส่งมอบโซลูชันทางวิศวกรรมที่ชาญฉลาดและยั่งยืน เพื่อยกระดับชุมชนและคุณภาพชีวิตประจำวัน เราผสานความเชี่ยวชาญทางเทคนิคเข้ากับแนวคิดเชิงนวัตกรรม เพื่อสร้างคุณค่าที่ยั่งยืนให้แก่ลูกค้าของเรา"
            )}
          </p>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">
            {t(
              <>Our Core <span className="accent">Values</span></>,
              <><span className="accent">ค่านิยม</span>หลักของเรา</>
            )}
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="card p-8 transition hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 bg-sky-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("Let’s Build the Future Together", "มาร่วมสร้างอนาคตไปด้วยกัน")}
          </h2>
          <p className="mt-4 text-lg text-sky-100">
            {t(
              "Contact us today to discuss how we can support your next project with precision and excellence.",
              "ติดต่อเราวันนี้ เพื่อพูดคุยว่าเราจะช่วยสนับสนุนโครงการต่อไปของคุณได้อย่างแม่นยำและเป็นเลิศได้อย่างไร"
            )}
          </p>
          <Link href="/contact" className="btn-secondary mt-8 border-white">
            {t("Contact Us", "ติดต่อเรา")}
          </Link>
        </div>
      </section>
    </>
  );
}
