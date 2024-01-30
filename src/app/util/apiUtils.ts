import { CommentParams } from "../../models/comment/comment";

// Function to get Axios parameters
export function getAxiosParams(commentParams: CommentParams, productId: number) {
    const params = new URLSearchParams();
    
    // Append pageNumber parameter
    params.append('pageNumber', commentParams.pageNumber.toString());
    
    // Append pageSize parameter
    params.append('pageSize', commentParams.pageSize.toString());
    
    // Append ProductId parameter
    params.append('ProductId', productId.toString());
    
    return params;
}
