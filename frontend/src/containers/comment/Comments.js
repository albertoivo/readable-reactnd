import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Authorship from '../../components/Authorship'
import {
  fetchCommentsByPost,
  fetchDeleteComment,
  removeComment,
  fetchVote,
  fetchUpdateComment
} from '../../actions/comments'
import { FaThumbsUp, FaEdit, FaTrash, FaClose } from 'react-icons/lib/fa'

class Comments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      updateCommentModalOpen: false,
      comment: {},
      bodyComment: ''
    }

    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  vote(vote, id, postId) {
    const { dispatch } = this.props
    dispatch(fetchVote(vote, id))
    dispatch(fetchCommentsByPost(postId))
  }

  delete(id) {
    const { dispatch } = this.props
    dispatch(fetchDeleteComment(id))
    dispatch(removeComment(id))
  }

  update(body, id, postId) {
    const { dispatch } = this.props
    dispatch(fetchUpdateComment(body, id))
    dispatch(fetchCommentsByPost(postId))
  }

  openUpdateCommentModal = ({ comment }) => {
    this.setState(() => ({
      updateCommentModalOpen: true,
      comment,
      bodyComment: comment.body
    }))
  }

  closeUpdateCommentModal = () => {
    this.setState(() => ({
      updateCommentModalOpen: false,
      comment: {},
      bodyComment: ''
    }))
  }

  handleBodyChange(e) {
    this.setState({ bodyComment: e.target.value })
  }

  render() {
    const { comments } = this.props
    const { comment, bodyComment } = this.state

    return (
      <div className="col l12">
        {comments.map(comment => (
          <div key={comment.id}>
            <div className="col l8 m8 s6">
              <Authorship
                author={comment.author}
                timestamp={comment.timestamp}
              />
            </div>
            <div className="col l4 m4 s6">
              <div className="small right">
                <span className="badge">{comment.voteScore}</span>
                <button
                  className="icon"
                  onClick={e => {
                    e.preventDefault()
                    this.vote('upVote', comment.id, comment.parentId)
                  }}
                >
                  <FaThumbsUp size={18} />
                </button>

                <button
                  className="icon"
                  onClick={() => {
                    this.openUpdateCommentModal({ comment })
                  }}
                >
                  <FaEdit size={18} />
                </button>

                <button
                  className="icon"
                  onClick={e => {
                    e.preventDefault()
                    this.delete(comment.id, comment.parentId)
                  }}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            <div className="col l12">
              <div className="margin">{comment.body}</div>
            </div>
          </div>
        ))}

        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={this.state.updateCommentModalOpen}
          contentLabel="Modal"
          onRequestClose={this.closeUpdateCommentModal}
        >
          <div>
            <button
              className="icon right"
              onClick={this.closeUpdateCommentModal}
            >
              Close
              <FaClose size={30} />
            </button>
            <Authorship author={comment.author} timestamp={comment.timestamp} />
            <h1>{comment.title}</h1>
            <textarea
              className="margin-top"
              rows="2"
              value={bodyComment}
              onChange={this.handleBodyChange}
            />
            <button
              className="button border right margin-top"
              onClick={e => {
                e.preventDefault()
                this.update(bodyComment, comment.id, comment.parentId)
                this.closeUpdateCommentModal()
              }}
            >
              Update Comment
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

Comment.propTypes = {
  dispatch: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  comments: state.comments.items || []
})

export default connect(mapStateToProps)(Comments)