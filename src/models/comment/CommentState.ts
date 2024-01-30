import { MetaData } from "../pagination";
import { CommentDto, CommentParams } from "./comment";

export interface CommentState {
  commentsLoaded: boolean;
  status: string;
  commentParams: CommentParams;
  metaData: MetaData | null;
  commentsByProductId: Record<number, CommentDto[]>;
}
