import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment';


const backupDir = '/Users/mattschwartz/GitHub/foundry-bak';

const createDirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}

const backupBubblesNightmareWorld = () => {
    const worldRootDirPath = '/Users/mattschwartz/FoundryVTT/Data/worlds/bubbles-nightmare';

    const backupDirPath: string = backupDir + '/Data/worlds/bubbles-nightmare/data';
    createDirIfNotExists(backupDirPath);

    const srcWorldDataDirPath = worldRootDirPath + '/data';

    const files: string[] = fs.readdirSync(srcWorldDataDirPath);

    files.forEach((file) => {
        const src = path.join(srcWorldDataDirPath, file);
        const dst = path.join(backupDirPath, file);

        // console.log('Copying ' + src + ' to ' + dst);
        fs.copyFile(src, dst, (err) => err && console.error('Failed to copy ' + src + ' to ' + dst + ': ' + err));
    });
}


// main
(() => {
    console.log('Persisting Ms Bubbles Nightmare');
    backupBubblesNightmareWorld();
    console.log('Done');

    console.log('Committing changes.')
    const commitMessage = 'Backup ' + moment.utc().format('yyyy/MM/DD HH:mm:ss z');
    exec(`/Users/mattschwartz/GitHub/dm_tools/src/foundryvtt/commit.sh '${commitMessage}'`, (err) => err && console.error('Failed to exec: ' + err));
})();
