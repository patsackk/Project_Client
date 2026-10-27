// /app/services/[id]/page.js

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getService } from "@/lib/content";
import { getLang } from "@/lib/i18n-server";
import { makeT } from "@/lib/i18n";

export default async function ServiceDetail({ params }) {
  const { id } = await params;
  const lang = await getLang();
  const t = makeT(lang);
  const service = await getService(lang, Number(id));

  if (!service) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="page-title">{t("Service not found", "ไม่พบบริการนี้")}</h1>
        <p className="text-gray-500 mt-4">
          {t("The requested service does not exist.", "ไม่มีบริการที่คุณต้องการ")}
        </p>
        <Link href="/" className="btn-primary mt-6">
          {t("Back to Home", "กลับหน้าแรก")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/#services" className="back-link mb-6">
        <ArrowLeft size={16} />
        {t("Back to Services", "กลับไปหน้าบริการ")}
      </Link>

      <div className="card overflow-hidden">
        {/* Hero Image */}
        <div className="relative w-full h-80 md:h-96">
          <img
            src={service.coverImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {service.name}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          <p className="text-gray-600 text-lg leading-relaxed mb-10 whitespace-pre-line">
            {service.description}
          </p>

          {service.gallery.length > 0 && (
            <>
              <h2 className="section-title mb-6">{t("Gallery", "แกลเลอรี")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {service.gallery.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${service.name} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-2xl shadow-sm"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
