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
    //console.log(req.user, "req.user in create entry controller")
    //console.log(createEntryDto, "entryDto in create entry controller")
    const display_url = await this.entryService.saveImage(createEntryDto.photo);
    createEntryDto.photo = display_url; //just save the url to the image in our database.
    return this.entryService.create(createEntryDto, loggedInUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log(req.user, "req.user in find all entry controller")
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
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id);
  }
}
