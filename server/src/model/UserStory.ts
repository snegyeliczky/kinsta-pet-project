import {Model} from "objection";
import Project from "./Project";
import User from "./User";

export default class UserStory extends Model{

    static tableName = 'user_stories';

    id!:number;
    project!:Project;
    userStory!:string;
    status!:boolean;
    businessValue?:number;
    owner?:User;
    estimatedUsers?:User[];

    static get relationMappings(){
        return{
            project:{
                relation:Model.BelongsToOneRelation,
                modelClass:Project,
                join:{
                    from:'user_stories.projectId',
                    to:'projects.id'
                }
            },
            owner:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:'user_stories.userId',
                    to:'users.id'
                }
            },
            estimatedUsers:{
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'user_stories.id',
                    through:{
                        from:'user_estimations.user_storyId',
                        to:'user_estimations.userId',
                        extra:['estimation']
                    },
                    to:'users.id'
                }
            }
        }
    }



}