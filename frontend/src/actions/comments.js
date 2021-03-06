import * as api from '../utils/api'
import {getQtyComments} from './posts'

import {ADD_COMMENT, GET_COMMENT_VOTES, GET_COMMENTS, REMOVE_COMMENT, UPDATE_COMMENT} from './ActionTypes'

const addComment = ({ id, timestamp, body, author, parentId }) => {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  }
}

export const getComments = comments => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

export const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export const getVotes = (vote, id) => {
  return {
    type: GET_COMMENT_VOTES,
    vote,
    id
  }
}

export const fetchCommentsByPost = postId => {
  return dispatch => {
    return api
      .getCommentsByPost(postId)
      .then(comments => dispatch(getComments(comments)))
  }
}

export const fetchAddComment = (body, author, parentId) => {
  return dispatch => {
    return api
      .addCommentPost(body, author, parentId)
      .then(data => dispatch(addComment(data)))
      .then(() => dispatch(getQtyComments(parentId, true)))
  }
}

export const fetchDeleteComment = (commentId, parentId) => {
  return dispatch => {
    return api
      .deleteComment(commentId)
      .then(() => dispatch(getQtyComments(parentId, false)))
  }
}

export const fetchUpdateComment = (body, id) => {
  return dispatch => {
    return api
      .updateComment(body, id)
      .then(data => dispatch(updateComment(data)))
  }
}

export const fetchVote = (vote, id) => {
  return dispatch => {
    return api.voteComment(vote, id).then(() => dispatch(getVotes(vote, id)))
  }
}
