import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

const parseHashtags = (raw) => {
  if (!raw) return [];
  // admite "a,b, c  #d"
  return raw
    .split(/[,\s]+/)
    .map(h => h.trim().replace(/^#/, ""))
    .filter(Boolean);
};

class PostService {
  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const payload = {
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      hashtags: parseHashtags(postData.hashtags),
      user: user._id
    };

    return await postRepository.create(payload);
  }

  async getPosts() {
    return await postRepository.findAll();
  }

  async getPost(id) {
    return await postRepository.findById(id);
  }

  async getPostsByUser(userId) {
    return await postRepository.findByUser(userId);
  }

  async updatePost(id, postData) {
    const payload = {
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      hashtags: parseHashtags(postData.hashtags)
    };
    return await postRepository.update(id, payload);
  }

  async deletePost(id) {
    return await postRepository.delete(id);
  }
}

export default new PostService();
