import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPortfolioProject } from "@/lib/content";
import { getLang } from "@/lib/i18n-server";
import { makeT } from "@/lib/i18n";

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lang = await getLang();
  const t = makeT(lang);
  const project = await getPortfolioProject(lang, Number(id));

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="page-title">{t("Project not found", "ไม่พบผลงานนี้")}</h1>
        <Link href="/projects" className="btn-primary mt-6">
          {t("Back to Projects", "กลับไปหน้าผลงาน")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link href="/projects" className="back-link">
        <ArrowLeft size={16} />
        {t("Back to Projects", "กลับไปหน้าผลงาน")}
      </Link>

      <h1 className="page-title mt-6">{project.name}</h1>
      <p className="text-gray-500 mt-1 mb-6">{project.location}</p>

      <p className="mb-10 text-lg text-gray-600 leading-relaxed whitespace-pre-line">{project.description}</p>

      {project.gallery.length > 0 && (
        <>
          <h2 className="section-title mb-6">{t("Gallery", "แกลเลอรี")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {project.gallery.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={`${project.name} ${index + 1}`}
                className="rounded-2xl shadow-sm object-cover w-full h-64"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
