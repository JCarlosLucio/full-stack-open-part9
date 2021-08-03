import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseDetails = () => {
    switch (part.type) {
      case 'normal':
        return (
          <div>
            <em>{part.description}</em>
          </div>
        );
      case 'groupProject':
        return <div>project exercise {part.groupProjectCount}</div>;
      case 'submission':
        return (
          <div>
            <em>{part.description}</em>
            <div>submit to {part.exerciseSubmissionLink}</div>
          </div>
        );
      case 'special':
        return (
          <div>
            <em>{part.description}</em>
            <div>required skills: {part.requirements.join(', ')}</div>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {courseDetails()}
    </div>
  );
};

export default Part;
