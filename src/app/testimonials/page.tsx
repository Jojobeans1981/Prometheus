export default function Testimonials() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold">What People Are Saying</h1>
      <div className="space-y-6">
        <blockquote className="border-l-4 border-orange-500 pl-4 italic text-lg text-gray-300">
          “My resume finally got interviews. This is 🔥🔥🔥. Worth every penny.”
          <footer className="text-sm text-gray-500 mt-1">— Jordan T., Marketing Manager</footer>
        </blockquote>

        <blockquote className="border-l-4 border-orange-500 pl-4 italic text-lg text-gray-300">
          “I submitted the Prometheus version and got a call back within 3 days.”
          <footer className="text-sm text-gray-500 mt-1">— Alex W., UX Designer</footer>
        </blockquote>

        <blockquote className="border-l-4 border-orange-500 pl-4 italic text-lg text-gray-300">
          “This isn’t just a resume service — it’s like career therapy.”
          <footer className="text-sm text-gray-500 mt-1">— Riley C., Data Analyst</footer>
        </blockquote>
      </div>
    </section>
  );
}
