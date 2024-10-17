import { updateProject } from './projectAPI';
import { createTodos } from './todoAPI';

// Helper function to determine the next project stages
const ProjectConfig = (currentStage, data) => {
  const {
    // Building_Status,
    Underground_Tank,
    Septic_Tank,
    Tie_Level,
    No_of_Floors,
    Completed_Floors,
    Terrace_Floor,
    Staircase_Cap,
    Overhead_Tank
  } = data;
  const floor_number = currentStage.split(' ')[1];
  console.log(currentStage, floor_number);

  switch (currentStage) {
    case 'Not Started':
      return ['Concept Framing'];

    case 'Concept Framing':
      return ['Foundation Level'];

    case 'Foundation Level':
      if (Underground_Tank) {
        return ['Underground Water Tank'];
      }
      if (Septic_Tank) {
        return ['Septic Tank'];
      }
      if (No_of_Floors >= 1) {
        return ['Ground Floor'];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Underground Water Tank':
      if (Septic_Tank) {
        return ['Septic Tank'];
      }
      if (No_of_Floors >= 1) {
        return ['Ground Floor'];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Septic Tank':
      if (No_of_Floors >= 1) {
        return ['Ground Floor'];
      }
      return ['Completed'];

    case 'Ground Floor':
      if (Tie_Level) {
        return ['Tie Level'];
      }
      if (No_of_Floors > 1) {
        return ['First Floor'];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Tie Level':
      if (No_of_Floors > 1) {
        return ['First Floor'];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'First Floor':
      if (No_of_Floors > 2) {
        return ['Floor 2'];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];
    case `Floor ${floor_number}`:
      if (No_of_Floors > parseInt(floor_number) + 1) {
        return [`Floor ${parseInt(floor_number) + 1}`];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Multiple Floors':
      if (No_of_Floors > Completed_Floors) {
        return [`Floor ${parseInt(Completed_Floors)}`];
      }
      if (Terrace_Floor) {
        return ['Terrace Floor'];
      }
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Terrace Floor':
      if (Staircase_Cap) {
        return ['Staircase Cap'];
      }
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];
    case 'Staircase Cap':
      if (Overhead_Tank) {
        return ['Overhead Water Tank'];
      }
      return ['Completed'];

    case 'Overhead Water Tank':
      return ['Completed'];

    default:
      return ['Error'];
  }
};

export const buildingDrawing = async (data) => {
  const activities = data?.Activity || [];
  const currentStage = activities.length
    ? activities[activities.length - 1]
    : null;
  const Project_Name = data?.Project_Name;
  const Project_Id = data?.id;
  const Inhouse_Engineer = data?.Inhouse_Engineer;
  const date = new Date(data?.Assigned_Date);

  console.log(
    Project_Id,
    activities,
    currentStage,
    Project_Name,
    Inhouse_Engineer,
    date
  );
  console.log(data);

  const nextStages = ProjectConfig(currentStage, data);
  const floor = nextStages[0];
  const floor_number = floor.split(' ')[1];
  if (floor === 'Completed') {
    data.Project_Status = floor;
  }
  const createTodo = async (title, description, deadline, status) => {
    const values = {
      Project_Id,
      Project_Name,
      Inhouse_Engineer,
      Title: title,
      Description: description,
      Deadline: deadline,
      Status: status
    };
    console.log(values);
    const todo = await createTodos(values);
    console.log(todo?.data);
  };

  for (const stage of nextStages) {
    switch (stage) {
      case 'Concept Framing':
        await createTodo(
          'Concept Framing',
          '',
          date.getTime() + 25 * 24 * 60 * 60 * 1000, // 25 days deadline
          'Not Started'
        );
        break;

      case 'Foundation Level':
        await createTodo(
          'Foundation Level',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 30 days deadline
          'Not Started'
        );
        break;

      case 'Underground Water Tank':
        await createTodo(
          'Underground Water Tank',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 20 days deadline
          'Not Started'
        );
        break;

      case 'Septic Tank':
        await createTodo(
          'Septic Tank',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 20 days deadline
          'Not Started'
        );
        break;

      case 'Ground Floor':
        await createTodo(
          'Ground Floor',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 40 days deadline
          'Not Started'
        );
        break;

      case 'First Floor':
        await createTodo(
          'First Floor',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 35 days deadline
          'Not Started'
        );
        break;

      case 'Tie Level':
        await createTodo(
          'Tie Level',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 30 days deadline
          'Not Started'
        );
        break;

      case 'Floor 2':
        await createTodo(
          'Floor 2',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 40 days deadline
          'Not Started'
        );
        break;
      case `Floor ${floor_number}`:
        await createTodo(
          `Floor ${floor_number}`,
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 40 days deadline
          'Not Started'
        );
        break;

      case 'Terrace Floor':
        await createTodo(
          'Terrace Floor',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 20 days deadline
          'Not Started'
        );
        break;

      case 'Staircase Cap':
        await createTodo(
          'Staircase Cap',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 10 days deadline
          'Not Started'
        );
        break;

      case 'Overhead Water Tank':
        await createTodo(
          'Overhead Water Tank',
          '',
          Date.now() + 25 * 24 * 60 * 60 * 1000, // 15 days deadline
          'Not Started'
        );
        break;

      case 'Completed':
        updateProject(data.id, data);

        console.log('Project is marked complete');
        break;

      default:
        console.log('Unknown stage:', stage);
    }
  }
};

// export const updateTodoStatus = async (todoId, status, senior = null) => {
//   const values = { Status: status };
//   if (senior) {
//     values.Senior = senior;
//     values.Review = true; // Mark as under review by senior
//   }

//   console.log(
//     `Updating todo ${todoId} with status: ${status}, senior: ${senior}`
//   );
//   await updateTodo(todoId, values);
// };
