import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment';


const backupDir = '/Users/mattschwartz/GitHub/foundry-bak';

const createDirIfNotExists = (path: string): string => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    return path;
}

const transformJs = (backupDirPath: string, srcPath: string, fileNameAndExt: string) => {
    console.log('Reading file:', srcPath);

    const content: string = fs.readFileSync(srcPath, { encoding: 'utf-8' });
    const lines: string[] = content.split('\n');

    const items: {}[] = [];
    lines.filter(t => t).forEach(line => {
        items.push(JSON.parse(line));
    });

    const dstDir = createDirIfNotExists(path.join(backupDirPath, 'transforms'));
    const dst = path.join(dstDir, fileNameAndExt + '.json');

    console.log('Writing transform file:' + dst);

    const transformJsContent = JSON.stringify(items, null, 2);
    fs.writeFile(dst, transformJsContent, (err) => {
        if (err) {
            console.error('Write Error: ' + err);
        }
    });
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

        fs.copyFile(src, dst, (err) => err && console.error('Failed to copy ' + src + ' to ' + dst + ': ' + err));

        transformJs(backupDirPath, src, file);
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
