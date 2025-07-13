export default function Pricing() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold">Pricing</h1>
      <p className="text-gray-400">Choose the plan that fits your career goals.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-xl bg-neutral-900 p-6 border border-orange-600 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-2">🔥 Basic Package – $29</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>1 optimized resume</li>
            <li>Formatted for ATS readability</li>
            <li>Manual review by expert</li>
            <li>Delivered within 48 hours</li>
          </ul>
        </div>

        <div className="rounded-2xl shadow-xl bg-neutral-900 p-6 border border-red-700 hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-2">🔥🔥 Pro Package – $49</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Everything in Basic</li>
            <li>+ 2 additional role-tailored versions</li>
            <li>+ Cover Letter</li>
            <li>+ Priority turnaround (24 hours)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
