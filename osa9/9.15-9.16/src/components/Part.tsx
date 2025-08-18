import type { CoursePart } from '../App';

const Part = (course: CoursePart) => {
  const style = { marginBottom: '10px' };
  switch (course.kind) {
    case 'basic': {
      return (
        <div style={style}>
          <div>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
        </div>
      );
    }
    case 'group': {
      return (
        <div style={style}>
          <div>
            {course.name} {course.exerciseCount}
          </div>
          <div> Project exercises: {course.groupProjectCount}</div>
        </div>
      );
    }
    case 'background': {
      return (
        <div style={style}>
          <div>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
          <div>{course.backgroundMaterial}</div>
        </div>
      );
    }
    case 'special': {
      return (
        <div style={style}>
          <div>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
          Required skills:{' '}
          {course.requirements.map((requirement, i) => (
            <span key={i} style={{ marginRight: '8px' }}>
              {requirement},
            </span>
          ))}
        </div>
      );
    }
  }
};

export default Part;
