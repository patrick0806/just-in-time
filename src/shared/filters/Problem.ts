import { ApiProperty } from '@nestjs/swagger';

class Field {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userMessage: string;
}

export class Problem {
  @ApiProperty()
  status?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  fields?: Field[];
}
