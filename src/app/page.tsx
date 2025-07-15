import ResumeForm from './components/ResumeForm';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Optimize Your Resume with AI
      </h1>
      <ResumeForm />
    </div>
  );
}