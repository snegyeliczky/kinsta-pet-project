import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {useHistory} from "react-router-dom";


interface applicationContextProps {
    username: string,
    setUserName: Dispatch<SetStateAction<string>>,
    getUserId: () => string;
    getUserIdAsNumber: () => number;
    isUserIsOwner: (ownerId: number) => boolean;

}


export const ApplicationContext = createContext({username: ""} as applicationContextProps);


export const ApplicationProvider = (props: any) => {

    const history = useHistory();
    const [username, setUserName] = useState<string>("");

    const getUserId = (): string => {
        let userId = localStorage.getItem("userId");
        if (userId) return userId;
        history.push("/auth");
        return "";
    };

    const getUserIdAsNumber = (): number => {
        return parseInt(getUserId());
    };

    const isUserIsOwner = (ownerId: number): boolean => {
        return getUserIdAsNumber() === ownerId
    };

    const sampleAppContext: applicationContextProps = {
        username: username,
        setUserName: setUserName,
        getUserId: getUserId,
        getUserIdAsNumber: getUserIdAsNumber,
        isUserIsOwner: isUserIsOwner,
    };


    return (
        <ApplicationContext.Provider value={sampleAppContext}>
            {props.children}
        </ApplicationContext.Provider>
    );
};


