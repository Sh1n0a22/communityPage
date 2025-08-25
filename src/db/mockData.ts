import type { Post } from "../types/StoreTypes";


export const mockPosts: Post[] = [
    {
        id: Date.now()+1,
        title: "Welcome to the Community!",
        content: "Feel free to share your thoughts here.",
        author: "Admin",
        createdAt: "2025-08-10T12:00:00Z",
        comments: [
            {
                id: Date.now(),
                author: "Jane Doe",
                text: "Thanks for creating this space!",
                createdAt: "2025-08-10T12:30:00Z",
                replies: [
                    {
                        id: Date.now()+45,
                        author: "John Smith",
                        text: "I agree, this is great.",
                        createdAt: "2025-08-10T13:00:00Z",
                        replies: [
                            {
                                id: Date.now()+33,
                                author: "week",
                                text: "I loeooeoeoeooeoeo.",
                                createdAt: "2025-08-10T13:00:00Z",
                            },
                        ]
                    },
                ],
            },
            {
                id: Date.now()+555,
                author: "Moderator",
                text: "Let's share our progress on the community project!",
                createdAt: "2025-08-11T09:00:00Z",
                replies: [],
            }

        ],
    },
    {
        id: Date.now()+2,
        title: "First Coding Challenge",
        content: "Let's share our progress on the community project!",
        author: "Moderator",
        createdAt: "2025-08-11T09:00:00Z",
        comments: [],
    },
];
