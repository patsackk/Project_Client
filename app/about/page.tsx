import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us | UTO Advance",
};

const values = [
  {
    title: "Innovation",
    description:
      "We continuously explore new technologies and methods to deliver smarter engineering solutions.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, honesty, and accountability in every project we undertake.",
  },
  {
    title: "Sustainability",
    description:
      "We design and implement systems that promote environmental responsibility and long-term efficiency.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        image="/images/ABOUT_UTO.jpg"
        title="About UTO Advance"
        subtitle="Engineering innovation with precision, integrity, and long-term vision."
      />

      {/* ===== MISSION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            Our <span className="accent">Mission</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At UTO Advance Engineering, our mission is to deliver intelligent
            and sustainable engineering solutions that elevate communities and
            improve everyday living. We combine technical excellence with
            innovative thinking to create lasting value for our clients.
          </p>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">
            Our Core <span className="accent">Values</span>
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
          <h2 className="text-2xl md:text-3xl font-bold">Let’s Build the Future Together</h2>
          <p className="mt-4 text-lg text-sky-100">
            Contact us today to discuss how we can support your next project
            with precision and excellence.
          </p>
          <Link href="/contact" className="btn-secondary mt-8 border-white">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
