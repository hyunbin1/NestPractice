import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";
import { AuthCredentialsDTO } from "./DTO/auth-credential.DTO";
import * as bcrypt from "bcryptjs";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        const {username, password, description} = authCredentialsDto;
        
        const saltValue = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, saltValue);
        const user = this.create({username, password: hashedPassword, description});
        
        

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
