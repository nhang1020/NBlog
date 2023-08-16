import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postServices from "../../services/postServices";
import { toast } from 'react-toastify';

export const createPost = createAsyncThunk("post/createPost", async (data) => {
    return postServices.createPostService(data).then((res) =>
        res
    );
});

export const getPosts = createAsyncThunk("post/getPosts", async (data) => {
    return postServices.getPostsService(data).then((res) =>
        res
    );
});
export const getUserPosts = createAsyncThunk("post/getUserPosts", async (data) => {
    return postServices.getPostsService(data).then((res) =>
        res
    );
});
export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
    return postServices.deletePostService(id).then((res) =>
        res
    );
});

export const commentPost = createAsyncThunk("post/commentPost", async (data) => {
    return postServices.commentPostService(data).then((res) =>
        res
    );
});
export const getComments = createAsyncThunk("post/getComments", async (data) => {
    return postServices.getCommentsService(data).then((res) =>
        res
    );
});
export const likePost = createAsyncThunk("post/likePost", async (data) => {
    return postServices.likePostService(data).then((res) =>
        res
    );
});
export const getPostDetail = createAsyncThunk("post/getPostDetail", async (id) => {
    return postServices.getPostDetailService(id).then((res) =>
        res
    );
});

export const editPost = createAsyncThunk("post/editPost", async (data) => {
    return postServices.editPostService(data).then((res) =>
        res
    );
});
const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        userPosts: [],
        loading: false,
        postLoading: false,
        error: null,
        images: [],
        userPostImages: [],
        comments: [],
        likes: [],
        likeLoading: false,
        postDetail: {},
        imagesPost: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            //get posts
            .addCase(getPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.error = null;
                if (action.payload) {
                    const newData = action.payload.data;
                    const updatedPosts = [...state.posts];
                    if (newData) {
                        newData.forEach(item => {
                            if (!updatedPosts.some(post => post.id === item.id)) {
                                updatedPosts.push(item);
                            }
                        });
                        state.posts = updatedPosts
                    }

                    const updatedImages = [...state.images];
                    if (action.payload.images) {
                        action.payload.images.forEach(item => {
                            if (!updatedImages.some(image => image.id === item.id)) {
                                updatedImages.push(item);
                            }
                        });
                        state.images = updatedImages
                    }

                    state.likes = action.payload.likes;
                }

            })
            .addCase(getPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            //
            .addCase(getUserPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.error = null;
                if (action.payload.data) {
                    const newData = action.payload.data;
                    const updatedUserPosts = [...state.userPosts];

                    // Loại bỏ những phần tử trùng lặp từ newData
                    newData.forEach(item => {
                        if (!updatedUserPosts.some(post => post.id === item.id)) {
                            updatedUserPosts.push(item);
                        }
                    });

                    // Cập nhật state với mảng đã ghép có phần tử không trùng lặp
                    state.userPosts = updatedUserPosts;
                }

                // state.userPosts = state.userPosts.concat(action.payload.data);
                const updatedImages = [...state.images];
                if (action.payload.images) {
                    action.payload.images.forEach(item => {
                        if (!updatedImages.some(image => image.id === item.id)) {
                            updatedImages.push(item);
                        }
                    });
                    state.images = updatedImages
                }
                state.likes = action.payload.likes;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            //create
            .addCase(createPost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                let res = action.payload;
                state.postLoading = false;
                state.error = null;

                if (res && res.errCode !== 0) {
                    toast.error(res.message);
                    return;
                } else {
                    state.posts.unshift(action.payload.post);
                    state.userPosts.unshift(action.payload.post);
                    const updatedImages = [...state.images];
                    if (action.payload.images) {
                        action.payload.images.forEach(item => {
                            if (!updatedImages.some(image => image.id === item.id)) {
                                updatedImages.push(item);
                            }
                        });
                        state.images = updatedImages
                    }
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            //delete post
            .addCase(deletePost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                let res = action.payload;
                state.postLoading = false;
                state.error = null;
                if (res && res.errCode === 1) {
                    toast.error(res.message);
                    return;
                } else {
                    state.posts = state.posts.filter(post => post.id !== res.id);
                    state.userPosts = state.userPosts.filter(post => post.id !== res.id)
                    state.images = state.images.filter(image => image.postId !== res.id);
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
            //create comment
            .addCase(commentPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(commentPost.fulfilled, (state, action) => {
                let res = action.payload;
                state.loading = false;
                state.error = null;
                if (res && res.errCode !== 0) {
                    return;
                } else {
                    state.comments.unshift(action.payload.comment);
                }
            })
            .addCase(commentPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get comments
            .addCase(getComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.comments = action.payload.comments;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //like post
            .addCase(likePost.pending, (state) => {
                state.likeLoading = true;
                state.error = null;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                let res = action.payload;
                state.likeLoading = false;
                state.error = null;
                if (res && res.errCode !== 0) {
                    return;
                } else {
                    if (res.check === true) {
                        state.likes = state.likes.filter(like => like.id !== res.like)
                    } else {
                        state.likes.unshift(res.like);
                    }
                }
            })
            .addCase(likePost.rejected, (state, action) => {
                state.likeLoading = false;
                state.error = action.error.message;
            })
            //get post detail
            .addCase(getPostDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                if (action.payload.errCode === 0) {
                    state.likes = action.payload.likes;
                    state.imagesPost = action.payload.images;
                    state.postDetail = action.payload.data;
                }
            })
            .addCase(getPostDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //edit post
            .addCase(editPost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.error = null;
                let res = action.payload;
                if (res && res.errCode === 0) {
                    for (let i = 0; i < state.posts.length; i++) {
                        if (state.posts[i].id === res.post.id) {
                            state.posts[i].contents = res.post.contents;
                            state.posts[i].privacy = res.post.privacy;
                            break;
                        }
                    }
                }
                if (state.userPosts && state.userPosts.length && res && res.errCode === 0) {
                    for (let i = 0; i < state.userPosts.length; i++) {
                        if (state.userPosts[i].id === res.post.id) {
                            state.userPosts[i].contents = res.post.contents;
                            state.userPosts[i].privacy = res.post.privacy;
                            break;
                        }
                    }
                }

            })
            .addCase(editPost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message;
            })
    }
})

export default postSlice;