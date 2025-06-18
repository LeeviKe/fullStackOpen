const Course = ({ course }) => {
  const Header = ({ course }) => <h1>{course.name}</h1>;

  const Part = ({ part, exercises }) => {
    return (
      <>
        <p>
          {part} {exercises}
        </p>
      </>
    );
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };

  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0);
    return <p>Total of {total} exercises</p>;
  };

  return (
    <div>
      {course.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
