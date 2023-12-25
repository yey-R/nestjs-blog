import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateBlogDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    shortContent: string;

    @ApiProperty({ required: false })
    @IsOptional()
    image?: string;
}
