import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}
  //getAllBoards(): Board[] {
  //  return this.boards;
  //}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  //createBoard(createBoardDto: CreateBoardDto) {
  //  const { title, description } = createBoardDto;
  //  const board: Board = {
  //    id: uuid(),
  //    title,
  //    description,
  //    status: BoardStatus.PUBLIC,
  //  };
  //  this.boards.push(board);
  //  return board;
  //}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  //getBoardById(id: string): Board {
  //  const found = this.boards.find((board) => board.id === id);
  //  if (!found) {
  //    throw new NotFoundException();
  //  }
  //  return found;
  //}

  async deleteBoard(id: number) {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  //deleteBoard(id: string) {
  //  const found = this.getBoardById(id);
  //  this.boards = this.boards.filter((board) => board.id !== found.id);
  //}
  //updateBoardStatus(id: string, status: BoardStatus): Board {
  //  const board = this.getBoardById(id);
  //  board.status = status;
  //  return board;
  //}
}
