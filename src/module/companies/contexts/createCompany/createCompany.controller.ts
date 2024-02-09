import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';
import { CreateCompanyRequestDTO } from './dtos/request.dto';
import { CreateCompanyResponseDTO } from './dtos/response.dto';
import { Problem } from '@shared/filters/Problem';
import { CreateCompanyService } from './createCompany.service';
import { AuthGuard } from '@shared/guard/auth.guard';

@ApiTags(API_TAGS.COMPANY)
@Controller()
@UseGuards(AuthGuard)
export class CreateCompanyController {
  constructor(private createCompanyService: CreateCompanyService) {}

  @ApiOperation({ summary: 'Create a new company' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCompanyRequestDTO })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateCompanyResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: Problem })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: Problem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: Problem })
  @Post()
  async handle(@Body() companyDTO: CreateCompanyRequestDTO) {
    const createdCompany = await this.createCompanyService.execute(companyDTO);
    return createdCompany;
  }
}
