import mongoose,{Schema} from "mongoose";


const userSchema = mongoose.Schema({
    personal_info: {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true,
        unique: true, 
      },
      bio: {
        type: String,
        maxlength: [200, 'Bio should not be more than 200'],
        default: "",
    },
    },
    social_links: {
        youtube: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        }
    },
    account_info:{
        total_posts: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
    },
    blogs: {
        type: [ Schema.Types.ObjectId ],
        ref: 'blogs',
        default: [],
    }

}, 
{ 
    timestamps: {
        createdAt: 'joinedAt'
    } 

})

const UserInfo =  mongoose.model("usersinfo", userSchema);
export default UserInfo