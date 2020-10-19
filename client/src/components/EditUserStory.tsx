import React, {Dispatch, SetStateAction, useContext} from 'react';
import { UserStoryStyleComponent} from "../assets/styledComponents/styledComponents";
import {UserStoryModel} from "../interfaces/UserStoryModel";
import {SettingOutlined, DeleteOutlined} from '@ant-design/icons';
import {Input} from "antd";
import UserStoryService from "../services/UserStoryService";
import AlertModal from "./Modals/AlertModal";
import EstimationModal from "./Modals/EstimationModal";
import {ApplicationContext} from "../context/ApplicationContext";
import {UserModel} from "../interfaces/UserModel";
import UserDropdown from "./UserDropdown";

type Props = {
    userStory: UserStoryModel,
    edit: boolean,
    setEdit: Dispatch<SetStateAction<boolean>>,
    setUserStory: Dispatch<SetStateAction<UserStoryModel>>,
    removeUserStory: Function,
    participants:UserModel[],
    getUserName:Function
}

const EditUserStory: React.FC<Props> = ({userStory, edit, setEdit, setUserStory, removeUserStory,participants, getUserName}) => {


    const appContext = useContext(ApplicationContext);

    const EditUserStory = (story: string) => {
        userStory.userStory = story;
        setUserStory(userStory);
    };

    const EditUserStoryValue = (value: number) => {
        userStory.businessValue = value;
        setUserStory(userStory);
    };

    const EditUserStoryOwner = (owner: string) => {
        userStory.ownerId = owner;
        setUserStory(userStory);
    };



    const EditUserStoryEstimation = (point: number) => {
        let userId = appContext.getUserId();
        userStory.estimatedUsers[userId]=point;
        setUserStory(userStory);
    };

    function handleEnter(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            UserStoryService.updateUserStory(userStory);
            setEdit(false);
        }
    }

    function handleStopEditing() {
        UserStoryService.updateUserStory(userStory);
        setEdit(false)
    }


    return (
        <UserStoryStyleComponent onClick={event => event.stopPropagation()} onKeyDown={event => handleEnter(event)}>
            <div className={"userStory-id UserStory-part"}>
                {userStory.id}
            </div>
            <div className={"userStory-userStory UserStory-part"}>
                <Input.TextArea defaultValue={userStory.userStory} onChange={e => {
                    EditUserStory(e.target.value)
                }}/>
            </div>
            <div className={"userStory-businessValue UserStory-part"}>
                <Input type={"number"} defaultValue={userStory.businessValue}
                       onChange={e => {
                           EditUserStoryValue(e.target.valueAsNumber)
                       }}/>
            </div>
            <div className={"userStory-ownerId UserStory-part"}>
               <UserDropdown userData={participants} onChange={EditUserStoryOwner} base={getUserName(userStory.ownerId)}/>
            </div>
            <div className={"userStory-estimation UserStory-part"}>
                <EstimationModal editUserStoryEstimation={EditUserStoryEstimation}
                                 estimatedUsers={userStory.estimatedUsers} getUserName={getUserName}/>
            </div>
            <div className={"UserStory-part"}>

                <SettingOutlined spin={edit} onClick={handleStopEditing} className={"userStory-edit"}/>
                <AlertModal text={"Are you sure you want to remove this User Story ?"}
                            buttonText={<DeleteOutlined/>} OkFunction={() => removeUserStory(userStory.id)}/>
            </div>

        </UserStoryStyleComponent>
    );
};

export default EditUserStory;

/*
<Input type={"number"} defaultValue={userStory.estimatedUsers[getUserId()]}
                       onChange={e => EditUserStoryPoint(e.target.valueAsNumber)}/>SP
 */