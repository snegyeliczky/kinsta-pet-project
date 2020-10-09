import {UserStoryModel} from "../interfaces/UserStoryModel";

let UserStoryList:UserStoryModel[] = [];

let task1:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to creat new Account",
    businessValue:100,
    estimation:2,
    ownerId:1,
    status:false
};
UserStoryList.push(task1);

let task2:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to see my balance on the page",
    businessValue:200,
    estimation:12,
    ownerId:null,
    status:false
};
UserStoryList.push(task2);

let task3:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:2,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false
};
UserStoryList.push(task3);

let task4:UserStoryModel ={
    id:UserStoryList.length+1,
    projectId:1,
    userStory:"As a user I want to transfer money to my friends",
    businessValue:500,
    estimation:8,
    ownerId:1,
    status:false
};
UserStoryList.push(task4);

export default {


    getUserStoresByProjectId:(projectID:number):UserStoryModel[]=>{
       return UserStoryList.filter(task =>{
            return task.projectId===projectID;
        })
    },

    saveNewUserStory:(newTask:UserStoryModel):UserStoryModel[] =>{
        newTask.id=UserStoryList.length+1;
        UserStoryList.push(newTask);
        return UserStoryList.filter(task =>{
            return task.projectId===newTask.projectId;
        })
    }
}