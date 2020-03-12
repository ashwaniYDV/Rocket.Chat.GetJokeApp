import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { GetjokeCommand } from './slashcommands/getjoke';

export class GetjokeApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        configuration.settings.provideSetting({
            id: 'getjoke-alias',
            public: true,
            required: false,
            type: SettingType.STRING,
            packageValue: 'GetJoke',
            i18nLabel: 'getjoke-alias',
            i18nDescription: 'getjoke-alias-description',
        });

        configuration.slashCommands.provideSlashCommand(new GetjokeCommand(this));
    }
}
