import { Controller, Put } from "@nestjs/common";
import { IdService } from "./id.service";


@Controller()
export class IdController {
    constructor(private idService: IdService) {}

    @Put('id')
    async createNewId(): Promise<string> {
        const selected = await this.idService.createUserId();
        return JSON.stringify(selected);
    }

}