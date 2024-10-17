import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { getTodos } from '@/lib/todoAPI';
import { useEffect, useState } from 'react';
import { CircleCheck } from 'lucide-react'; // Example icon
import { getProjectById } from '@/lib/projectAPI';
export default function ProjectTimeline(props) {
  const id = props.id;
  const [project, setProject] = useState<any>();
  const [todo, setTodo] = useState<any>([]);
  const username = localStorage.getItem('username') || '';
  const role = localStorage.getItem('role') || '';
  useEffect(() => {
    const fetchTodo = async () => {
      const project = await getProjectById(id);
      setProject(project);
      const todo = await getTodos(
        0,
        100,
        project?.Project_Name,
        username,
        role,
        project?.id
      );
      console.log(todo?.todos);

      setTodo(todo?.todos);
      //   const deadlineDate = new Date(todo?.Deadline);
      //   const isOverdue = Date.now() > deadlineDate.getTime();
      //   setOverDue(isOverdue);
      // Assuming this API call fetches todo data by ID
    };
    fetchTodo();
  }, [id]);

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
        date={project?.createdAt.slice(0, 10)}
        iconStyle={{
          background: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))'
        }}
        icon={<CircleCheck />}
      >
        <h3 className="text-lg font-bold">Project Created</h3>
        <div className="project-details">
          {/* <h2>Project Details</h2> */}
          <ul className="p-4 text-lg">
            <li>
              <strong>Job No : </strong> {project?.Project_Job_Number}
            </li>
            <li>
              <strong>Project Name : </strong> {project?.Project_Name}
            </li>

            <li>
              <strong>Inhouse Engineer : </strong> {project?.Inhouse_Engineer}
            </li>
            <li>
              <strong>Status : </strong> {project?.Project_Status}
            </li>
          </ul>
        </div>
      </VerticalTimelineElement>

      {todo?.length > 0 &&
        todo.map((todos) => (
          <VerticalTimelineElement
            key={todos.id}
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
            date={todos?.createdAt?.slice(0, 10)}
            iconStyle={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))'
            }}
            icon={<CircleCheck />}
          >
            <h3 className="text-lg font-bold">Todo ({todos?.Title})</h3>
            <div className="project-details">
              <ul className="p-4 text-lg font-medium">
                {/* <li>
                  <strong>Title : </strong> {todos?.Project_Name}
                </li> */}
                <li>
                  {todos?.Description && (
                    <div>
                      <strong>Description : </strong> {todos?.Project_Name}
                    </div>
                  )}
                </li>

                <li>
                  <strong>Inhouse Engineer : </strong> {todos?.Inhouse_Engineer}
                </li>
                <li>
                  <strong>Senior : </strong> {todos?.Senior}
                </li>
                <li>
                  <strong>Status : </strong> {todos?.Status}
                </li>
                <li>
                  <strong>Deadline : </strong> {todos?.Deadline}
                </li>

                <li>
                  <div>
                    <strong>Activities : </strong>
                    {todos?.Activity.map((item, index) => (
                      <li className={index % 2 == 0 ? 'bg-muted' : 'm-1'}>
                        {item}
                      </li>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </VerticalTimelineElement>
        ))}
    </VerticalTimeline>
  );
}
