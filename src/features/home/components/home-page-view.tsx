import type { HomePageData } from "../types/home-page-data";

interface HomePageViewProps {
  data: HomePageData;
}

export function HomePageView({ data }: HomePageViewProps) {
  const { featuredCourses, testimonials } = data;

  return (
    <main style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <section>
        <h1>Featured Courses</h1>
        <ul>
          {featuredCourses.map((course) => (
            <li key={course.id} style={{ marginBottom: "1rem" }}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <small>
                {course.level} • {course.duration} • ⭐ {course.rating}
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h1>Student Testimonials</h1>
        <ul>
          {testimonials.map((item) => (
            <li key={item.id} style={{ marginBottom: "1rem" }}>
              <blockquote>“{item.quote}”</blockquote>
              <p>
                <strong>{item.studentName}</strong> — {item.studentTitle}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
