type PageHeroProps = {
  image: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

// Full-width image banner used at the top of content pages.
export default function PageHero({ image, title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative flex h-80 items-center justify-center bg-cover bg-center px-6 text-center text-white md:h-96"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-200 md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
