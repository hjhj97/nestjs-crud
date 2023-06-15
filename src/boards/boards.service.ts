import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = ['a', 'b', 'c'];

  getAllBoards() {
    return this.boards;
  }
}
