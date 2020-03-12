import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class GetjokeCommand implements ISlashCommand {
    public command = 'getjoke';
    public i18nParamsExample = 'getjoke-command-example';
    public i18nDescription = 'getjoke-command-description';
    public providesPreview = false;

    constructor(private readonly app: App) {}

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const message = await modify.getCreator().startMessage();
        const sender = await read.getUserReader().getById('rocket.cat');
        const room = context.getRoom();
        if (!room) {
            throw new Error('No room is configured for the message');
        }
        const data = await http.get('http://api.icndb.com/jokes/random1http://api.icndb.com/jokes/random');
        const msg = data.data.value.joke;
        message
            .setSender(sender)
            .setGroupable(false)
            .setRoom(room)
            .setText(msg);

        modify.getNotifier().notifyRoom(room, message.getMessage());
    }
}
