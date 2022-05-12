import { Controller, Put } from "@nestjs/common";
import { IdService } from "./id.service";


@Controller()
export class IdController {
    constructor(private idService: IdService) {}

    /**
     * Creates a new user id and associated real word.
     * 
     * @returns the user id. 
     */
    @Put('id')
    async createNewId(): Promise<string> {
        const selected = await this.idService.createUserId();
        return JSON.stringify(selected);
    }

}