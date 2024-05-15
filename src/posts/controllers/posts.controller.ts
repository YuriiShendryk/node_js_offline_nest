import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
} from '@nestjs/common';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetJwtPayload } from 'src/utils/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { PostsService } from '../services/posts.service';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(
    // req.body
    @Body() createPostDto: CreatePostDto,
    @GetJwtPayload() { id: userId }: JwtPayload,
  ) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetJwtPayload() { id: userId }: JwtPayload,
  ) {
    return this.postsService.update(id, updatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @GetJwtPayload() { id: userId }: JwtPayload,
  ) {
    await this.postsService.remove(id, userId);
    return { status: 'success' };
  }
}
