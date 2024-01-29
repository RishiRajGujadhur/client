// CommentDto.ts
export interface CommentDto {
    id: number;
    commentId: number;
    userId: number;
    productId: number;
    text: string;
    username: string;
    createdAt: Date;
    // Add other properties as needed
}

// CommentParams.ts
export interface CommentParams {
    productId: number;
    pageNumber: number;
    pageSize: number;
    // Add other parameters as needed
}

