import { users } from "./users"

const createChat = (userId, ourId) => {
    return {
        user: userId,
        messages: [
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, libero. Voluptatem, labore! Mollitia earum, odio esse dolore repudiandae libero enim a modi iste voluptatibus molestiae fuga molestias inventore quae natus.',
                time: '13:00',
                owner: ourId
            },
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, libero. Voluptatem, labore! Mollitia earum, odio esse dolore repudiandae libero enim a modi iste voluptatibus molestiae fuga molestias inventore quae natus.',
                time: '13:00',
                owner: userId
            },
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, libero. Voluptatem, labore! Mollitia earum, odio esse dolore repudiandae libero enim a modi iste voluptatibus molestiae fuga molestias inventore quae natus.',
                time: '13:00',
                owner: ourId
            },
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, libero. Voluptatem, labore! Mollitia earum, odio esse dolore repudiandae libero enim a modi iste voluptatibus molestiae fuga molestias inventore quae natus.',
                time: '13:00',
                owner: userId
            },
            {
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, libero. Voluptatem, labore! Mollitia earum, odio esse dolore repudiandae libero enim a modi iste voluptatibus molestiae fuga molestias inventore quae natus.',
                time: '13:00',
                owner: userId
            }
        ]
    }
}


export const createChats = () => users.map((el) => createChat(el.id, el.id + 1))


