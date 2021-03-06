import {withFilter} from 'graphql-subscriptions';

export const subscriptions = {

    tasksForUserStory: {
        subscribe: withFilter(
            (parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("TASK_UPDATE")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.tasksForUserStory.some((Task: { user_story_id: number }) => {
                    return Task.user_story_id === variables.userStoryId
                })
            })
    },

    newTask: {
        subscribe: withFilter(
            (parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("NEW_TASK")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                console.log("in filter", payload.newTask)
                return payload.newTask.user_story_id === variables.userStoryId
            })
    },

    newParticipantInvite: {
        subscribe: withFilter(
            (parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("NEW_PARTICIPANT_INVITE")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.newParticipantInvite.receiverId === variables.receiverId
            })
    },

    joinParticipation: {
        subscribe: withFilter((parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("JOIN_PARTICIPANT")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.projectId === variables.projectId
            })
    },

    newUserStory: {
        subscribe: withFilter((parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("NEW_USER_STORY")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.projectId === variables.projectId
            })
    },

    removeUserStory: {
        subscribe: withFilter((parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("REMOVE_USER_STORY")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.projectId === variables.projectId
            })
    },

    removeTask: {
        subscribe: withFilter(
            (parent: any, args: any, Context: { pubSub: any }): AsyncIterator<any> => {
                return Context.pubSub.asyncIterator("REMOVE_TASK")
            },
            (payload: any, variables: any): boolean | Promise<boolean> => {
                return payload.userStoryId === variables.userStoryId
            })
    }

};