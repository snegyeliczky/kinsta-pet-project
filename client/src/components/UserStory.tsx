import React, {useContext, useState} from 'react';
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {SettingOutlined} from '@ant-design/icons';
import EditUserStory from "./EditUserStory";
import {ApplicationContext} from "../context/ApplicationContext";
import {UserModel} from "../interfaces/UserModel";


interface Props {
    UserStory: UserStoryModel,
    removeUserStory:Function,
    getUser:Function,
    participants:UserModel[]
}

const UserStory: React.FC<Props> = ({UserStory, removeUserStory,getUser,participants}) => {

    const appContext = useContext(ApplicationContext);
    const [edit, setEdit] = useState(false);
    const [userStory,setUserStory] =useState(UserStory);


    function handleChangeToEdit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        setEdit(!edit);

    }

    function checkEstimation():boolean {
        return userStory.estimatedUsers[appContext.getUserId()] !== undefined;

    }

    function getUserName():string {
        let user = getUser(userStory.ownerId);
        return user? user.firstName : " no owner ";
    }

    function getEstimatedAverage() {
        let estimatedUsers = userStory.estimatedUsers;
        let reduce = Object.values(estimatedUsers).reduce((re, e)=> {
            re.sum+=e;
            re.length+=1;
            return re
        },{sum:0,length:0} );
        return (reduce.sum/reduce.length).toFixed(1)
    }


    return (
        <>
        {
            edit? <EditUserStory userStory={userStory} edit={edit} setEdit={setEdit}
                                 setUserStory={setUserStory} removeUserStory={removeUserStory}
                                 participants={participants} getUserName={getUserName}/>
                : <UserStoryStyleComponent key={userStory.id} className={"userStory-component"}>
                    <div className={"userStory-id UserStory-part"}>{userStory.id}</div>
                    <div className={"userStory-userStory UserStory-part"}>{userStory.userStory}</div>
                    <div className={"userStory-businessValue UserStory-part"}>{userStory.businessValue}</div>
                    <div className={"userStory-ownerId UserStory-part"}>{getUserName()}</div>
                    <div className={"userStory-estimation UserStory-part"}>
                        {checkEstimation()?getEstimatedAverage()+"-SP":"Please Estimate"}</div>
                    <div className={"UserStory-part"} onClick={e => handleChangeToEdit(e)}><SettingOutlined
                        spin={edit}/></div>
                </UserStoryStyleComponent>
        }
        </>
    );
};

export default UserStory;