import * as fs from 'fs';
import * as path from 'path';

const backupDir = '../../foundry-bak';

const createDirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}

const backupBubblesNightmareWorld = () => {
    const worldLocation = '/Users/mattschwartz/FoundryVTT/Data/worlds/bubbles-nightmare';

    const backupDirPath: string = backupDir + '/Data/worlds/bubbles-nightmare/data';
    createDirIfNotExists(backupDirPath);

    const srcWorldDataDir = worldLocation + '/data';

    const files: string[] = fs.readdirSync(srcWorldDataDir);

    files.forEach((file) => {
        const src = path.join(srcWorldDataDir, file);
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
})();
