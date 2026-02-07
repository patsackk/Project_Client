//test push code
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | UTO Advance</title>
      </Head>
      <main className="min-h-screen bg-sky-50">

       

        {/* Hero Section with Box and Space Between Container */}
        <section className="relative bg-cover bg-center h-[400px] text-shadow rounded-xl overflow-hidden shadow-lg mx-4 md:mx-8 mt-5" style={{ backgroundImage: "url('/images/site.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">About Us</h1>
              <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto ">
                Learn more about our journey, mission, and values. Let's build a sustainable future together.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section with Box */}
        <section className="py-16 bg-gray-50 border border-sky-800 rounded-xl shadow-lg mt-8 mx-4 md:mx-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto">
              At UTO Advance engineering, our mission is to provide cutting-edge engineering solutions that improve lives and build
              sustainable communities. We strive for excellence in every project, fostering innovation and collaboration
              with our clients.
            </p>
          </div>
        </section>

        {/* Values Section with Box */}
        <section className="py-16 bg-white border border-gray-500 rounded-xl shadow-lg mt-8 mx-4 md:mx-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Innovation', description: 'We embrace innovation to deliver unique solutions.' },
                { title: 'Integrity', description: 'We uphold honesty and transparency in all we do.' },
                { title: 'Sustainability', description: 'We focus on creating a sustainable future.' },
              ].map((value, index) => (
                <div key={index} className="bg-sky-800 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-slate-300">{value.title}</h3>
                  <p className="mt-4 text-slate-100">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section with Box */}
        <section className="py-16 bg-sky-800 text-white border border-gray-300 rounded-xl shadow-lg mt-8 mx-4 md:mx-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Join Us in Building a Better Future</h2>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Reach out to us to learn more about our services and how we can collaborate on your next project.
            </p>
            <Link href="/contact">
              <button className="mt-8 px-8 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 UTO Advance Engineering. All rights reserved.
          </p>

          <div className="mt-4 flex justify-center space-x-6">
            {["Instagram"].map((platform) => (
              <a
                key={platform}
                href="https://www.instagram.com/uto_advance_engineering/"
                className="text-gray-400 hover:text-sky-400 transition"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
