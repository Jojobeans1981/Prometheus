
export default function Home() {
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Optimize Your Resume with Prometheus</h1>
      <p className="text-gray-400">Upload your resume and job description. We'll do the rest.</p>
      <form
        action="https://formspree.io/f/xyzpgpyn"
        method="POST"
        encType="multipart/form-data"
        className="grid gap-4"
      >
        <input name="name" type="text" required placeholder="Your Name" className="p-2 rounded bg-neutral-800" />
        <input name="email" type="email" required placeholder="Email" className="p-2 rounded bg-neutral-800" />
        <input name="target_role" type="text" placeholder="Target Role" className="p-2 rounded bg-neutral-800" />
        <input name="experience_level" type="text" placeholder="Experience Level" className="p-2 rounded bg-neutral-800" />
        <input name="industry" type="text" placeholder="Industry" className="p-2 rounded bg-neutral-800" />
        <textarea name="job_description" placeholder="Paste Job Description" className="p-2 rounded bg-neutral-800" rows={4} />
        <input name="resume" type="file" accept=".pdf,.doc,.docx" className="p-2 rounded bg-neutral-800" required />
        <button type="submit" className="bg-orange-600 hover:bg-red-600 p-2 rounded text-white transition">
          Submit
        </button>
      </form>
    </div>
  );
}
