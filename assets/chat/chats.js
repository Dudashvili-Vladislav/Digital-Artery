import { users } from "./users"

const createChat = (userId, ourId) => {
    return {
        user: userId,
        messages: [
            {
                text: 'message text',
                time: '13:00',
                owner: ourId
            },
            {
                text: 'message text',
                time: '13:00',
                owner: userId
            },
            {
                text: 'message text',
                time: '13:00',
                owner: ourId
            },
            {
                text: 'message text',
                time: '13:00',
                owner: userId
            },
            {
                text: 'message text',
                time: '13:00',
                owner: userId
            }
        ]
    }
}


export const createChats = () => users.map((el) => createChat(el.id, el.id + 1))


