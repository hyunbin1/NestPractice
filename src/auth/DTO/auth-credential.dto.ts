import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class AuthCredentialsDTO {

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: "비밀번호는 영어와 문자만 입력 가능합니다."
    })
    password: string;
    description: string;
}