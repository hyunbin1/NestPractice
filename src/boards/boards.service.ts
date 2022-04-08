import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  // 아이디로 검색
  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if(!found) {
      throw new NotFoundException(`Can't find Board with entred Id ${id}`);
    }
    return found;
  }

  // 회원 생성
  createBoard(createBoardDTO: CreateBoardDTO) {
    // DTO 에서 가져오고
    const { title, description } = createBoardDTO;
    // 가져온 내용을 보드에 주입
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
