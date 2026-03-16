import type { CourseModule } from "../lib/types/course";

type CourseCurriculumProps = {
  modules: CourseModule[];
};

export function CourseCurriculum({ modules }: CourseCurriculumProps) {
  return (
    <section className="py-16">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Curriculum</h2>
      <div className="mt-6 space-y-3">
        {modules.map((module) => (
          <details key={module.title} className="rounded-xl border border-slate-200 shadow-sm">
            <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-slate-900 marker:content-none">
              <div className="flex items-center justify-between gap-4">
                <span>{module.title}</span>
                <span className="text-sm font-medium text-slate-500">{module.lessons.length} lessons</span>
              </div>
            </summary>
            <ul className="space-y-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-600">
              {module.lessons.map((lesson) => (
                <li key={lesson}>• {lesson}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
