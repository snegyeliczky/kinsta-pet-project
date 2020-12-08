import React, {useContext} from 'react';
import {CenterDiv, InviteComponent} from "../assets/styledComponents/styledComponents";
import {useQuery} from "@apollo/client";
import {getUserInvites} from "../queries/userQueries";
import {ApplicationContext} from "../context/ApplicationContext";
import {Invite} from "../Types/Invite";
import {newParticipationInviteSubscription} from "../queries/subscriptions";

const ProfilePage = () => {

    const appContext = useContext(ApplicationContext);
    const {error, loading, data, subscribeToMore} = useQuery(getUserInvites, {
        variables: {
            id: appContext.getUserIdAsNumber()
        }
    });

    subscribeToMore(
        {
            document:newParticipationInviteSubscription,
            variables:{receiverId:appContext.getUserIdAsNumber()},
            updateQuery: (previousQueryResult, {subscriptionData}) => {
                if (!subscriptionData.data) return previousQueryResult;
                console.log(subscriptionData.data.newParticipantInvite)
            }
        }
    );


    const loadInvites = () => {
        if (error) return (<div>Error... ${error}</div>);
        if (loading) return (<div>Loading...</div>);
        return (
            <div className={"invites"}>
                {data.user.invites.map((inv: Invite) => {
                    return (
                        <InviteComponent>
                            <div>{inv.id}</div>
                            <div>{inv.project.name}</div>
                            <div>{inv.project.company.name}</div>
                        </InviteComponent>
                    )
                })}
            </div>
        )
    };

    return (
        <div>
            <CenterDiv>
                <h2 style={{color: "white"}}>Profile</h2>
            </CenterDiv>
            <InviteComponent>
                <div>Invite Id</div>
                <div>Project name</div>
                <div>Company</div>
                <div>Options</div>
            </InviteComponent>
            {loadInvites()}

        </div>

    );
};

export default ProfilePage;