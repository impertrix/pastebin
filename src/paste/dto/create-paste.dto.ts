import { ApiProperty } from '@nestjs/swagger';

export class CreatePasteDto {
  @ApiProperty({
    description: 'the content of the paste',
    default: '',
    type: 'string',
  })
  public readonly content: string;
  @ApiProperty({
    description: 'the description of the best',
    type: 'string',
  })
  public readonly description: string;
}
