import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
  // listar
  async getAll(req, res) {
    try {
      const posts = await postService.getPosts();
      res.render("posts", { posts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // nuevo
  async newForm(req, res) {
    const users = await userRepository.findAll();
    res.render("new-post", { users });
  }

  // crear
  async createFromForm(req, res) {
    try {
      const { userId, title, content, imageUrl, hashtags } = req.body;
      await postService.createPost(userId, { title, content, imageUrl, hashtags });
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // editar
  async editForm(req, res) {
    try {
      const post = await postService.getPost(req.params.id);
      const users = await userRepository.findAll();
      if (!post) return res.status(404).send("Post no encontrado");
      res.render("edit-post", { post, users });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // actualizar desde formulario
  async updateFromForm(req, res) {
    try {
      const { title, content, imageUrl, hashtags, userId } = req.body;
      await postService.updatePost(req.params.id, { title, content, imageUrl, hashtags, user: userId });
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  // eliminar
  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default new PostController();
