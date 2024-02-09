import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';
import { FindCompanyByIdResponseDTO } from './dtos/response.dto';
import { Problem } from '@shared/filters/Problem';
import { FindCompanyByIdService } from './findCompanyById.service';
import { AuthGuard } from '@shared/guard/auth.guard';

@ApiTags(API_TAGS.COMPANY)
@Controller()
@UseGuards(AuthGuard)
export class FindCompanyByIdController {
  constructor(private findCompanyByIdService: FindCompanyByIdService) {}

  @ApiOperation({ summary: 'Find Company by Id' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, type: FindCompanyByIdResponseDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: Problem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: Problem })
  @Get('/:companyId')
  async handle(
    @Param('companyId') companyId: string,
  ): Promise<FindCompanyByIdResponseDTO> {
    const company = await this.findCompanyByIdService.execute(companyId);
    return company;
  }
}
