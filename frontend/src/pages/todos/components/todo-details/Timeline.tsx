import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getTodoById } from '@/lib/todoAPI';
import { useEffect, useState } from 'react';
import { CircleCheck } from 'lucide-react'; // Example icon

export default function Timeline(props) {
  const id = props.id;
  const [todo, setTodo] = useState<any>();
  const [overDue, setOverDue] = useState(false);
  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodoById(id);
      setTodo(todo);
      const deadlineDate = new Date(todo?.Deadline);
      const updatedAt = new Date(todo?.updatedAt);
      const isOverdue = updatedAt.getTime() > deadlineDate.getTime();
      setOverDue(isOverdue);
      // Assuming this API call fetches todo data by ID
    };
    fetchTodo();
  }, [id]);
  console.log(todo);

  return (
    <VerticalTimeline lineColor="hsl(var(--border))">
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          background: 'hsl(var(--card))',
          color: 'hsl(var(--card-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: 'var(--radius)',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
        contentArrowStyle={{ borderRight: '7px solid hsl(var(--card))' }}
        date={todo?.createdAt.slice(0, 10)}
        iconStyle={{
          background: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))'
        }}
        icon={<CircleCheck />}
      >
        <h3 className="text-lg font-bold">Todo Created</h3>
        <div className="project-details">
          {/* <h2>Project Details</h2> */}
          <ul className="p-4 text-lg">
            <li>
              <strong>ID: </strong> {todo?.id}
            </li>
            <li>
              <strong>Title: </strong> {todo?.Title}
            </li>
            <li>
              <strong>Description: </strong> {todo?.Description}
            </li>
            <li>
              <strong>Project Name: </strong> {todo?.Project_Name}
            </li>
            <li>
              <strong>Inhouse Engineer: </strong> {todo?.Inhouse_Engineer}
            </li>
            <li>
              <strong>Status: </strong> {todo?.Status}
            </li>

            <li>
              <div className={overDue ? 'text-red-500' : 'text-green-500'}>
                <strong>Deadline: </strong> {todo?.Deadline}
              </div>
            </li>
          </ul>
        </div>
      </VerticalTimelineElement>
      {todo?.Activity &&
        todo?.Activity.map((todos) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            contentArrowStyle={{ borderRight: '7px solid hsl(var(--card))' }}
            date={todo?.createdAt.slice(0, 10)}
            iconStyle={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))'
            }}
            icon={<CircleCheck />}
          >
            <h3 className="text-lg font-bold">Activity</h3>
            <div className="project-details">{todos}</div>
          </VerticalTimelineElement>
        ))}
    </VerticalTimeline>
  );
}
