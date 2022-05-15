import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
      @InjectRepository(BoardRepository)
      private boardRepository: BoardRepository,
  ) {}
    async getAllBoards(): Promise<Board[]> {
      return this.boardRepository.find();
    }
  
    async getBoardById(id: number): Promise <Board> {
      const found = await this.boardRepository.findOne(id);

       if (!found) {
          throw new NotFoundException(`Can't find Board with id ${id}`);
      }
      return found;
  }

    createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
      return this.boardRepository.createBoard(createBoardDTO);
    }

    async deleteBoard(id: number): Promise<void> {
      const result = await this.boardRepository.delete(id);

      if(result.affected === 0) {
        throw new NotFoundException(`Can't find Board with id ${id}`);
      }
      else{
        console.log("성공적으로 삭제되었습니다. result = ", result);
      }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
      const board = await this.getBoardById(id);
      
      board.status = status;
      await this.boardRepository.save(board);
      
      return board;
    }


}
