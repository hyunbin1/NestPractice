import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.status.enum";
import { CreateBoardDTO } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const {title, description} = createBoardDTO;
    
        const board = this.create({
          title,
          description,
          status: BoardStatus.PUBLIC,
        })
    
        await this.save(board);
        return board;
      }
}