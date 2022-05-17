import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthCredentialsDTO } from './DTO/auth-credential.DTO';
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) // 레퍼지토리 값 가져오기
        private userRepository: UserRepository
    ) { }
    
    async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto); // 레퍼지토리로 다시 보내주기
    }

    async login(authCredentialsDto: AuthCredentialsDTO): Promise<string> {
        const {username, password} = authCredentialsDto; // 컨트롤러를 통해 입력된 아이디와 비밀번호
        const user = await this.userRepository.findOne({username}); // 레퍼지토리에 입력된 유저명이 있는지 확인 및 가져오기
        const passwordCheck = await bcrypt.compare(password, user.password); //
        if(user && passwordCheck) {
            return "로그인에 성공하였습니다."
        }
        else {
            throw new UnauthorizedException("로그인에 실패하였습니다.")
        }
    }
}
