import React, {useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import TaskService from "../services/TaskService";
import TaskComponent from "./TaskComponent";
import {TaskHeaderTitleStyledComponent, TaskStyledComponent} from "../assets/styledComponents/styledComponents";
import NewTaskModal from "./Modals/NewTaskModal";

type props = {
    userStory: UserStoryModel
}

const TaskTable: React.FC<props> = ({userStory}) => {

    const [tasks, setTasks] = useState(TaskService.getTasksByUserStory(userStory.id));

    const removeTask = (taskId: string) => {
        let refreshedTasks = TaskService.removeTask(taskId);
        setTasks(refreshedTasks);
    };

    return (
        <div>
            <NewTaskModal UserStoryId={userStory.id} setTasks={setTasks}/>
            <TaskHeaderTitleStyledComponent className={"TaskComponent task-header"}>
                    <div className={"task-id"}>Task Id</div>
                    <div className={"task-title"}>Title</div>
                    <div className={"task-description"}>Description</div>
                    <div>Owner</div>
            </TaskHeaderTitleStyledComponent>
            {
                tasks.map(task => {
                    return <TaskComponent Task={task} removeTask={removeTask}/>
                })
            }
        </div>
    );
};

export default TaskTable;