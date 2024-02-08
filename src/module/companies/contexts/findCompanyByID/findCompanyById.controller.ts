import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';
import { FindCompanyByIdResponseDTO } from './dtos/response.dto';
import { Problem } from '@shared/filters/Problem';
import { FindCompanyByIdService } from './findCompanyById.service';

@ApiTags(API_TAGS.COMPANY)
@Controller()
export class FindCompanyByIdController {
  constructor(private findCompanyByIdService: FindCompanyByIdService) {}

  @ApiOperation({ summary: 'Find Company by Id' })
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
