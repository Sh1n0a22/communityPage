export interface Comment {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    replies?: Comment[];
}

export interface Post {
    id: number;
    img?:string,
    title: string;
    content: string;
    author: string;
    createdAt: string;
    comments: Comment[];
}