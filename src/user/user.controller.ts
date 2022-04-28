import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Res,
  HttpStatus,
  Put,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { CreateUserDto, GetUserQuery } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/login_auth/jwt-auth.guard';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ required: true, type: OmitType(CreateUserDto, ['id'] as const) })
  @ApiResponse({ status: 400, description: 'Bad request...' })
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiOkResponse({ status: 200, type: User, isArray: true })
  @ApiResponse({ status: 404, description: 'Not found...' })
  async findAll(@Res() response, @Query() query: GetUserQuery) {
    const users = await this.userService.findAll(query);
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Find User by Id hehe' })
  @ApiOkResponse({ status: 200, type: User })
  async findOne(@Res() response, @Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User by Id ' })
  @ApiBody({ required: true, type: OmitType(User, ['id'] as const) })
  @ApiOkResponse({ status: 200, type: User })
  async update(
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: User,
  ) {
    await this.userService.update(+id, updateUser);
    return response.status(HttpStatus.OK).json({
      id,
      updateUser,
    });
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ status: 204 })
  async remove(@Res() response, @Param('id', ParseIntPipe) id: number) {
    const deleteUser = await this.userService.remove(+id);
    return response.status(HttpStatus.NO_CONTENT).json({
      deleteUser,
    });
  }
}
