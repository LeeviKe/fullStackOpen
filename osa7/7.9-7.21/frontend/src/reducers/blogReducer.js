import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data);
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    default:
      return state;
  }
};

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: 'SET_BLOGS', data: blogs });
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    await blogService.create(blogObject);
    // Has to be ran through the SET instead of ADD, since otherwise the app will not get the user's name for the updated blog.
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch({ type: 'SET_BLOGS', data: blogs });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: 'REMOVE_BLOG', data: id });
  };
};

export const updateBlog = (blogToBeUpdated, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(blogToBeUpdated.id, updatedBlog);
    dispatch({ type: 'UPDATE_BLOG', data: blog });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.addComment(id, comment);
    dispatch({ type: 'UPDATE_BLOG', data: blog });
  };
};

export default blogReducer;
