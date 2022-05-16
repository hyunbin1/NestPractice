import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialsDTO } from "./DTO/auth-credential.DTO";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = this.create({username, password});

        // 유저 동일 이름 입력 시 에러날 경우 에러 네임 변경
        try {
            await this.save(user);
        }
        catch (error) {
            if(error.code === "23505") {
                throw new ConflictException('존재하는 유저명입니다.')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
