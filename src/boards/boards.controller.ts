import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board.model';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

  //@Get('/')
  //getAllBoards(): Board[] {
  //  return this.boardsService.getAllBoards();
  //}

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  //@Post('/')
  //@UsePipes(ValidationPipe)
  //createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //  return this.boardsService.createBoard(createBoardDto);
  //}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  //@Get('/:id')
  //getBoardById(@Param('id') id: string): Board {
  //  return this.boardsService.getBoardById(id);
  //}

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.deleteBoard(id);
  }

  //@Delete('/:id')
  //deleteBoard(@Param('id') id: string) {
  //  this.boardsService.deleteBoard(id);
  //}

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  //@Patch('/:id/status')
  //updateBoardStatus(
  //  @Param('id') id: string,
  //  @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //) {
  //  return this.boardsService.updateBoardStatus(id, status);
  //}
}
