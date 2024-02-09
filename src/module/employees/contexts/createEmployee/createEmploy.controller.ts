import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_TAGS } from '@shared/constants/apiTags';
import { CreateEmployeeRequestDTO } from './dtos/request.dto';
import { CreateEmployeeResponseDTO } from './dtos/response.dto';
import { Problem } from '@shared/filters/Problem';
import { CreateEmployeeService } from './createEmployee.service';

@ApiTags(API_TAGS.EMPLOYEE)
@Controller()
export class CreateEmployeeController {
  constructor(private createEmployeeService: CreateEmployeeService) {}

  @ApiOperation({ summary: 'Create employee' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateEmployeeResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: Problem })
  @ApiResponse({ status: HttpStatus.CONFLICT, type: Problem })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: Problem })
  @Post()
  async handle(
    @Body() body: CreateEmployeeRequestDTO,
  ): Promise<CreateEmployeeResponseDTO> {
    const createdEmployee = await this.createEmployeeService.execute(body);
    return createdEmployee;
  }
}
