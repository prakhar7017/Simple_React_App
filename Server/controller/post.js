import Post from '../model/post.js';
import { getPaginationParams,sendPaginationResults} from '../util/pagination.js';

export const getPosts=async (req,res)=>{
    const {page,limit,offset}=getPaginationParams(req.query);
    try {
        const posts=await Post.find().skip(offset).limit(limit);
        const response=sendPaginationResults(page,limit,offset,posts.length,posts);
        res.status(200).json({
            success:true,
            response
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server Error"
        })
    }
}


