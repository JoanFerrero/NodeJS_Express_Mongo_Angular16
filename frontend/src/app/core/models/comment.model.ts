import { Profile } from "./profile.model"

export interface Comment {
    id: String
    body: String
    author: Profile
}