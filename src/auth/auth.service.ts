import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthCredentialsDTO } from './DTO/auth-credential.DTO';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) // 레퍼지토리 값 가져오기
        private userRepository: UserRepository
    ) { }
    
    async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto); // 레퍼지토리로 다시 보내주기
    }
}
