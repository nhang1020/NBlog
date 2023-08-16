import { createSelector } from "@reduxjs/toolkit";
import { toAlias } from "../utils/constants";

export const allCodesSelector = (state) => state.admin.allCodes;
export const userSelector = (state) => state.admin.users;

export const isLogIn = (state) => state.app.isLogIn;

export const postSelector = (state) => state.post.posts;
export const userPostsSelector = (state) => state.post.userPosts;
export const postImagesSelector = (state) => state.post.images;
export const likePostsSlector = (state) => state.post.likes;
export const tabSlector = (state) => state.post.tab;

export const relationshipsSlector = (state) => state.user.relationships;
export const userInfo = (state) => state.app.user;
export const usersSelector = (state) => state.user.users;
export const searchUserSelector = (state) => state.user.search;
export const statusFilterSelector = (state) => state.user.status;
export const userDetail = (state) => state.user.userDetail;

export const allCodeRemainingSelector = createSelector(
    allCodesSelector,
    (allCodes) => {
        return allCodes
    })

export const usersRemainingSelector = createSelector(
    userSelector,
    (users) => {
        return users
    })

export const isLogInSelector = createSelector(
    isLogIn,
    (isLogIn) => {
        return isLogIn
    })

export const userInfoSelector = createSelector(
    userInfo,
    (userInfo) => {
        return userInfo
    })

export const postsRemainingSelector = createSelector(
    postSelector,
    (posts) => {
        return posts
    })
export const postImagesRemainingSelector = createSelector(
    postImagesSelector,
    (images) => {
        return images
    })

export const userDetailRemainingSelector = createSelector(
    userDetail,
    (user) => {
        return user
    })

export const likePostsRemainingSelector = createSelector(
    likePostsSlector,
    (likes) => {
        return likes
    })

export const userPostsRemainingSelector = createSelector(
    userPostsSelector,
    (posts) => {
        return posts
    })

export const getUsersSelector = createSelector(
    usersSelector,
    (usersSelector) => {
        return usersSelector
    })
export const getUsersRemainingSelector = createSelector(
    usersSelector,
    searchUserSelector,
    statusFilterSelector,
    userInfo,
    relationshipsSlector,
    (users, searchText, status, userInfo, relationships) => {
        return searchText.length ? users.filter(user => {
            let name = user.firstName + user.lastName + user.firstName

            if (status === 'all') {
                return toAlias(name).includes(searchText)
            }
            else if (status === 'followed') {
                if (relationships.some(item => item.receiverId === user.id && item.performerId === userInfo.id)) {
                    return toAlias(name).includes(searchText)
                }
            } else {
                if (!relationships.some(item => item.receiverId === user.id && item.performerId === userInfo.id)) {
                    return toAlias(name).includes(searchText)
                }
            }
        }) : users.filter(user => {
            if (status === 'all') {
                return user
            }
            else if (status === 'followed') {
                if (relationships.some(item => item.receiverId == user.id && item.performerId == userInfo.id)) {
                    return user
                }
            } else {
                if (!relationships.some(item => item.receiverId == user.id && item.performerId == userInfo.id)) {
                    return user
                }
            }
        })
    })

export const relationshipsRemainingSelector = createSelector(
    relationshipsSlector,
    (relationships) => {
        return relationships
    })


export const postDetailSelector = (state) => state.post.postDetail;
export const imagesPostSelector = (state) => state.post.imagesPost;

export const postDetailRemainingSelector = createSelector(
    postDetailSelector,
    (postDetailSelector) => {
        return postDetailSelector
    })
export const imagesPostRemainingSelector = createSelector(
    imagesPostSelector,
    (imagesPostSelector) => {
        return imagesPostSelector
    })
