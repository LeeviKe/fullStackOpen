import Part from './Part';
import type { CoursePart } from '../App';

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => {
  return (
    <div>
      {courses.map((course, i) => (
        <Part key={i} {...course} />
      ))}
    </div>
  );
};

export default Content;
