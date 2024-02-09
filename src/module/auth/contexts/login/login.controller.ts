import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';
import { LoginService } from './login.service';
import { LoginResponseDTO } from './dots/response.dto';
import { Problem } from '@shared/filters/Problem';
import { LoginRequestDTO } from './dots/request.dto';
import { Public } from '@shared/decorators/public.decorator';

@ApiTags(API_TAGS.AUTH)
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponseDTO })
  @ApiResponse({ status: 400, type: Problem })
  @ApiResponse({ status: 401, type: Problem })
  @ApiResponse({ status: 500, type: Problem })
  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: LoginRequestDTO): Promise<LoginResponseDTO> {
    const accessToken = await this.loginService.execute(body);
    return accessToken;
  }
}
