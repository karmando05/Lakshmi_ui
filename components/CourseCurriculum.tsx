import type { CourseLessonModule } from "../lib/types/course";

type CourseCurriculumProps = {
  modules: CourseLessonModule[];
};

export function CourseCurriculum({ modules }: CourseCurriculumProps) {
  return (
    <section aria-labelledby="course-curriculum">
      <h2 id="course-curriculum" className="text-2xl font-semibold text-slate-900">
        Course Curriculum
      </h2>

      <div className="mt-6 space-y-4">
        {modules.map((module, index) => (
          <details
            key={module.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            open={index === 0}
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
              {module.title}
            </summary>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {module.lessons.map((lesson) => (
                <li key={lesson} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
