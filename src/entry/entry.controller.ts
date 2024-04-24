import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createEntryDto: CreateEntryDto) {
    const loggedInUser = req.user;
    console.log(loggedInUser, "logged in user")
    return this.entryService.create(createEntryDto, loggedInUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.entryService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id);
  }
}
