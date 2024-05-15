import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const author = await this.userService.getUser({
      column: 'id',
      value: userId,
    });
    if (!author) {
      throw new ForbiddenException('Forbidden');
    }
    const newPost = new Post();
    Object.assign<Post, Partial<Post>>(newPost, {
      ...createPostDto,
      user: author,
    });
    const { user, ...createdPost } = await this.postRepository.save(newPost);
    return createdPost;
  }

  async findAll() {
    const posts = await this.postRepository.find();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`post with id ${id} not found`);
    }
    return post;
  }

  async findUserPost(postId: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const postToUpdate = await this.findUserPost(id, userId);
    Object.assign<Post, Partial<Post>>(postToUpdate, updatePostDto);
    return this.postRepository.save(postToUpdate);
  }

  async remove(id: number, userId: number) {
    const postToDelete = await this.findUserPost(id, userId);
    await this.postRepository.delete({ id: postToDelete.id });
  }
}
